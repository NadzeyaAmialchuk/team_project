import Image from "next/image";
import SignupForm from "../components/signupForm";


export default function Signup() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-sm">
        <div className="flex justify-center mb-6">
          <div className="relative w-44 h-14">
            <Image
              src="/instagram_logo.svg"
              alt="Instagram logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
        <div className="text-center mb-4">
          Sign up to see photos and videos from your friends.
        </div>
        <a
          href="/api/auth/facebook"
          className="flex items-center justify-center mb-4 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
        >
          <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
          Log in with Facebook
        </a>
        <SignupForm />
      </div>
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-sm flex flex-col items-center">
      <p className="text-sm text-gray-600">
                Have an account?
              </p>
              <a
                href="/signin"
                className="text-sm font-semibold text-blue-500 ml-1"
              >
                Log in
              </a>
      </div>
    </div>
  );
}
