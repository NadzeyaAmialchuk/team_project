import Image from "next/image";
import SignInForm from "./components/signInForm";
import SigninElement from "./components/signinElement";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <main className="flex items-center justify-center gap-8 max-w-5xl">
        <div className="hidden md:block relative w-[600px] h-[700px]">
          <Image
            src="/instagram-image.png"
            alt="Instagram on devices"
            fill
            priority
            className="object-contain"
          />
        </div>
        <SigninElement hasBorder={false}/>
      </main>
    </div>
  );
}
