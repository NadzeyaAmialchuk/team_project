import Image from "next/image";
import SignInForm from "./signInForm";

export default function SigninElement ({ hasBorder }: { hasBorder: boolean }) {
  return (
    <div className="bg-white p-8 rounded-sm w-80">
      <div className={hasBorder ? 'border border-gray-300 rounded-sm' : ''}>
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
              <SignInForm />
              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="mx-4 text-xs font-semibold text-gray-400">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>
              <div className="flex flex-col items-center">
                <a
                  href="/api/auth/facebook"
                  className="flex items-center mb-4 text-xs font-semibold text-blue-500"
                >
                  <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Log in with Facebook
                </a>

                <a href="/password/reset" className="text-xs text-blue-900">
                  Forgot password?
                </a>
              </div>
              </div>
              <div className={`${hasBorder ? 'border border-gray-300 rounded-sm' : ''} mt-4 text-center`}>
                <div className="inline-flex items-center justify-center bg-white p-4">
                  <span className="text-sm text-gray-600">
                    Don't have an account?
                  </span>
                  <a
                    href="/signup"
                    className="text-sm font-semibold text-blue-500 ml-1"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </div>
  )
}
