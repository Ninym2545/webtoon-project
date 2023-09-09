"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useContext } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";


const page = () => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  useEffect(() => {
      setError(params.get("error"));
    if(params.get('error') === "AccessDenied"){
      setError("Email has already been used.")
    }
    setSuccess(params.get("success"));
  }, [params]);


  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/");
  }


  console.log("session : ",session);


  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
   
      signIn("credentials", { email, password , callbackUrl: "/" });
   
  };


  return (
    <div className={styles.container}>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
        <div className="bg-gray-100 rounded-2xl rounded-tr-3xl rounded-br-3xl shadow-2xl flex  w-[850px]">
          <div className="text-black  w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-red-500">NFT </span>Webtoon{" "}
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-[#2D3131] mb-2">
                Sign in to Account
              </h2>
              <div className="border-2 w-10 border-[#2D3131] inline-block mb-2"></div>

              <div className="flex justify-center my-2">
                
                <button
                  
                  className="border-2 border-gray-200 rounded-full p-2 mx-1"
                >
                  <img src="MetaMask_Fox.svg.png" className="w-9 h-9" />
                </button>
                
                <button
                 onClick={() => signIn('google' , {callbackUrl: "/"})} 
                  className="border-2 border-gray-200 rounded-full p-2 mx-1"
                >
                  <img src="google.png" className="w-9 h-9" />
                </button>
              </div>
              <p className="text-gray-400 my-3">or use your email account</p>
              <div className="flex flex-col items-center">
                <form onSubmit={handleCredentialsLogin}>
                  <div className="bg-gray-200 w-64 p-2 flex items-center mb-3">
                    <EnvelopeIcon className="h-6 w-6 text-gray-400 mr-2" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="bg-gray-200 outline-none text-sm flex-1 text-gray-900 border border-transparent rounded-lg  sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="bg-gray-200 w-64 p-2 flex items-center">
                    <LockClosedIcon className="h-6 w-6 text-gray-400 mr-2" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="bg-gray-200 outline-none text-sm flex-1 text-gray-900 border border-transparent rounded-lg  sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    />
                  </div>
                  {/* <div className="flex w-64 justify-between mt-3 mb-5">
                    <label className="flex items-center text-xs">
                      <input type="checkbox" name="remember" className="mr-1" />
                      Remember me
                    </label>
                    <Link href="#">
                      <p className="text-xs">Forgot Password?</p>
                    </Link>
                  </div> */}
                  <button>
                    <p className="border-2 border-[#2D3131] rounded-full px-12 my-3 py-2 inline-block font-semibold hover:bg-[#2D3131] hover:text-white">
                      Sign In
                    </p>
                  </button>
                  <div className=" text-red-600 text-sm">
                  {error && error}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="font-bold w-2/5 bg-[#2D3131] rounded-tr-2xl rounded-br-2xl py-36 px-12 ">
            <h2 className="text-3xl font-bold mb-2">Hello, Friend</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">
              Fill up personal information and start jouney with us.
            </p>
            <Link href="/register">
              <p className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-[#2D3131]">
                Sign Up
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
