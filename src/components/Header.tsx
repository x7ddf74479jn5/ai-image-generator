import Link from "next/link";
import Image from "next/image";
export const Header = () => {
  return (
    <header className="flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md">
      <div className="flex space-x-2 items-center">
        <Image src="/open-ai-logo-8B9BFEDC26-seeklogo.com.png" alt="logo" width={30} height={30} />
        <div className="">
          <h1 className="font-bold">
            The Pandashark <span className="text-violet-500">AI</span> Image Generator
          </h1>
          <h2 className="text-xs">Powered by DALL∙E 2, ChatGPT & Microsoft Azure!</h2>
        </div>
      </div>

      <div className="flex text-xs md:text-base divide-x items-center text-gray-500">
        <Link href="https://github.com/x7ddf74479jn5" className="px-2 font-light text-light">
          Pandashark (@x7ddf74479jn5) Project
        </Link>
        <Link href="https://github.com/x7ddf74479jn5/ai-image-generator" className="px-2 font-light">
          Github Repo
        </Link>
      </div>
    </header>
  );
};
