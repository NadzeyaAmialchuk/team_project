import React from "react";

export default function SignupForm() {
  return (
    <div className="w-full">
      <form className="space-y-2">
        <div className="flex items-center justify-center">
          <div className="border-t border-gray-300 flex-grow mr-3"></div>
          <span className="text-gray-500 text-xs">OR</span>
          <div className="border-t border-gray-300 flex-grow ml-3"></div>
        </div>
        <div>
          <input
            type="text"
            placeholder="Mobile Number or Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
         <div className="text-xs text-gray-500 text-center">
          People who use our service may have uploaded your contact information to Instagram. <a href="#" className="text-blue-500">Learn More</a>
        </div>
        <div className="text-xs text-gray-500 text-center">
          By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
