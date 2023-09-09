import User from "@/models/User";
import connect from "@/utils/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

connect();

const handler = NextAuth (
  {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),

      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "email@gmail.com" , required: true },
          password: { label: "Password", type: "password" , required: true  }
        },
        async authorize(credentials, req) {
          const {email , password} = credentials;

          const user = await signInWithCredentials({email , password})
          
          return user;
        }
      })
    
    ],
    pages: {
      signIn: "/login",
      error: '/login',
    },
    callbacks: {
      async signIn({user, account, profile , email , credentials }) {
        
        if(account.type === 'oauth'){
          return await signInWithOAuth({account , profile})
        }
        return true 
      },
      async jwt({token, trigger , session}) {
        const user = await getUserByEmail({email : token.email})
        token.user = user;
        return token
      },
      async session({session, token}){
        console.log(session);
        session.user = token.user;
        return session
      }
    }
  
  }  
)
export { handler as GET, handler as POST };

/*----------------------------------*/
async function signInWithOAuth({account , profile}){
  try{
    const user = await User.findOne({
      providerAccountId: account.providerAccountId
    })
    if(user){
      return true
    }else{
      const email = await User.findOne({
        email: profile.email
      })
      if(email){
        throw new Error('Email has already been used.') 
      }else{
        const newUser = new User({
          name : profile.name,
          email: profile.email,
          providerAccountId: account.providerAccountId,
          provider: account.provider,
          image: profile.picture
        });
        console.log(newUser);
        await newUser.save();
        console.log("User has been create success!.");
        return true;
      }
    }
    //if !user => sign up => sign in
  }catch(err){
    console.log(err);
  }
 
}

async function getUserByEmail({email}){
  const user = await User.findOne({email}).select('-password')
  if(!user)
    throw new Error('Email does no exist!')
  return {...user._doc,_id: user._id.toString()}
}

async function signInWithCredentials({email , password}){

  const user = await User.findOne({email})
  if(!user) throw new Error('Email does not exist!')

  const compare = await bcrypt.compare(password , user.password)
  if(!compare) throw new Error('Password does not match!')

  return {...user._doc,_id: user._id.toString()}
}