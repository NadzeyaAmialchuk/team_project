import Image from "next/image";
import SignInForm from "./components/signInForm";
import { Grand_Hotel } from "next/font/google";



export default function Home() {
  return (
    <main className="container flex flex-row items-center justify-between gap-8 p-4">
      <div className="flex justify-center mb-8">
        <Image
          src="/instagram-image.png"
          alt="Instagram image"
          width={200}
          height={100}
          priority
        />
      </div>
      <div className="formContainer flex, flex-column">
      <h1 className="font-[--font-instagram] italic text-4xl">Instagram</h1>
      <SignInForm />
      </div>
       </main>
  );
}

export const dynamic = 'force-static';
