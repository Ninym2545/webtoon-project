import { generateToken, verifyToken } from "@/utils/token";
import User from "../../../../models/User";
import connect from "../../../../utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import sendEmail from "@/utils/sentEmail";

const BASE_URL = process.env.NEXTAUTH_URL;

export const POST = async (request) => {
  try {

    const { name, email, password  } = await request.json();

    const user = await User.findOne({
      email: email 
    });

    if(user) {
      return new NextResponse(error.message, {
        status: 500,
      });
    }
    
    
    const pass = await bcrypt.hash(password , 12)

    // const token = generateToken({ name, email, pass  })

    // console.log("token ---> " , token);
    // verifyToken(token)
   
    // console.log(  { name, email, pass  });

    const userExist = await User.findOne({
      email: email
    })

     if(userExist) return {message: 'Verify Success!'}

     const newUser = new User({name: name, email: email, password: pass})


     await newUser.save();

    return new NextResponse("User has been created", {
      status: 201,
    });

  } catch (error) {
    console.log(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};

// export async function verifyWithCredentials(token){
//   try {

//     const { name, email, pass } = verifyToken(token)
   
//     const userExist = await User.findOne({
//       email: email
//     })
//     if(userExist) return {message: 'Verify Success!'}

//     const newUser = new User({name: name, email: email, password: pass})
    
//     await newUser.save();

//     return new NextResponse("Verify Success!", {
//       status: 201,
//     });
//   } catch (err) {
//     console.log("errs: ",err);
//     return new NextResponse(err.message, {
//       status: 500,
//     });
//   }
// }