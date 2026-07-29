"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LoginApple, LoginFacebook, LoginGoogle, LoginOff, Loginsales } from "@/assets/images";
import { LoginBg } from "@/assets/images";
import {
Eye, EyeOff,
} from "lucide-react";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
<div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-background isolate px-4 py-10 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Image src={LoginBg} alt="Background" fill className="object-cover" />
      </div>

      {/* Left Shopping Cart */}
      {/* Left Shopping Cart */}
<Image
  src={Loginsales}
  alt="Shopping Cart"
  width={300}
  height={300}
  className="
    absolute
    left-30
    bottom-8
    w-40
    xl:w-56
    2xl:w-72
    h-auto
    hidden
    xl:block
  "
/>

{/* Right Gift */}
<Image
  src={LoginOff}
  alt="Gift"
  width={200}
  height={200}
  className="
    absolute
    right-40
    top-8
    w-28
    xl:w-40
    2xl:w-52
    h-auto
    hidden
    xl:block
  "
/>


      {/* Login Card */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-xl
          bg-white
          rounded-2xl
          shadow-2xl
          px-8
          py-8
        "
      >

        {/* Title */}

        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Welcome Back!
        </h1>

        <p className="text-center text-sm text-black/50 mt-1">
          Sign in to your account
        </p>


        {/* Form */}

        <div className="mt-6 space-y-5">


          {/* Email */}

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="
  mt-2
  w-full
  h-12
  rounded-lg
  border
  border-gray-300
  px-4
  text-sm
  outline-none
  focus:ring-2
  focus:ring-primary
"
            />
          </div>



          {/* Password */}

          <div>

            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>

            <div className="relative mt-2">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    className="
  mt-2
  w-full
  h-12
  rounded-lg
  border
  border-gray-300
  px-4
  text-sm
  outline-none
  focus:ring-2
  focus:ring-primary
"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-gray-400
      hover:text-gray-700
      transition
    "
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</div>

          </div>



          {/* Remember */}

          <div className="flex justify-between items-center">

            <label className="flex items-center gap-2 text-sm text-gray-700">

              <input
                type="checkbox"
                defaultChecked
                className="accent-primary"
              />

              Remember Me

            </label>


            <Link
              href="/forgot-password"
              className="
                text-sm
                font-semibold
                text-primary
                hover:underline
              "
            >
              Forgot Password?
            </Link>

          </div>



          {/* Sign In Button */}

          <button
           className="
  w-full
  h-12
  sm:h-14
  rounded-lg
  bg-primary
  text-white
  font-semibold
  transition
"
          >
            Sign In
          </button>



          {/* Social Login */}

          <div
  className="
    flex
    flex-col
    sm:flex-row
    items-center
    justify-center
    gap-4
    border
    border-gray-300
    rounded-lg
    bg-black/5
    py-4
  "
>
  <span className="text-sm text-gray-600">
    Or continue with
  </span>

  <div className="flex items-center gap-4">
    <button className="hover:scale-110 transition">
      <Image src={LoginGoogle} alt="Google" width={24} height={24} />
    </button>

    <button className="hover:scale-110 transition">
      <Image src={LoginFacebook} alt="Facebook" width={24} height={24} />
    </button>

    <button className="hover:scale-110 transition">
      <Image src={LoginApple} alt="Apple" width={24} height={24} />
    </button>
  </div>
</div>



          {/* Signup */}

          <p className="
            text-center
            text-sm
            font-semibold
            text-black
          ">

            Don&apos;t have an account?

            <Link
              href="/register"
              className="
                ml-1
                font-semibold
                text-primary
              "
            >
              Sign Up
            </Link>

          </p>


        </div>


      </div>


    </div>
  );
}