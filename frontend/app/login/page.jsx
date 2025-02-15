"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const [emailFilled, setEmailFilled] = useState(false);
  const [passwordFilled, setPasswordFilled] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1E1F26] ">
      {/* Main Container: Two sections with a gap */}
      <div className="flex items-center justify-start gap-40">
        {" "}
        {/* Moved the form more to the left */}
        {/* Left Side: Dummy SVG Image */}
        <div className="hidden md:block">
          <img
            src="/dummy.png"
            alt="Dummy Image"
            className="w-[600px] h-auto"
          />{" "}
          {/* Increased size of SVG */}
        </div>
        {/* Right Side: Login Form */}
        <div className="w-full max-w-md bg-[#292B34] p-8 rounded-2xl shadow-lg">
          <form action="">
            {/* Email Field */}
            <div className="mb-4 relative">
              <label className="block text-[#EEEEEE]">Email</label>
              <div className="relative">
                <span
                  className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                    emailFilled ? "text-[#CAC8FF]" : "text-gray-500"
                  }`}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="text-lg " />
                </span>
                <input
                  type="email"
                  className="peer w-full pl-10 pr-4 py-2 mt-1 border-b-2 border-[#2F3138] bg-[#2F3138] focus:border-[#885cf6] text-[#CAC8FF] outline-none leading-6"
                  placeholder="weall@gmail.com"
                  onChange={(e) => setEmailFilled(e.target.value.length > 0)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <label className="block text-[#EEEEEE]">Password</label>
              <div className="relative">
                <span
                  className={`absolute left-3 top-1/2 transform -translate-y-1/3 transition-colors ${
                    passwordFilled ? "text-[#CACBFF]" : "text-gray-500"
                  }`}
                >
                  <FontAwesomeIcon icon={faKey} className="text-lg" />
                </span>
                <input
                  type="password"
                  className="peer w-full pl-10 pr-10 py-2 mt-1 border-b-2 border-[#2F3138] bg-[#2F3138] focus:border-[#885cf6] text-[#CAC8FF] outline-none"
                  placeholder="Enter a secure password"
                  onChange={(e) => setPasswordFilled(e.target.value.length > 0)}
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm text-[#CAC8FF] mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="hover:text-[#A0A2E6]">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#FF6F61] text-white py-2 rounded-lg hover:bg-[#FF9389] transition"
            >
              LOGIN
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-4 text-center text-sm text-[#CAC8FF]">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#8B5CF6]">
              Register
            </a>
          </p>

          {/* OR Separator */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social Login Buttons */}
          <button className="w-full flex items-center justify-center border p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-black">
            <img src="/google_img.png" alt="Google" className="w-5 h-5 mr-2" />
            Login with Google
          </button>

          <button className="w-full flex items-center justify-center bg-blue-600 text-white p-3 rounded-lg mt-3 hover:bg-[#1877F2] transition">
            <img src="/fb_img.png" alt="Facebook" className="w-5 h-5 mr-2" />
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}