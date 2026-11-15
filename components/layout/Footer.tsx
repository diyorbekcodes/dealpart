"use client";
import bidlogo from "../../assets/img/bidlogo.png";
import Image from "next/image";
import { Input } from "antd";
import facebook from "../../assets/svg/Facebook.svg";
import insta from "../../assets/svg/Instagram.svg";
import linked from "../../assets/svg/Linkedin.svg";
import twitter from "../../assets/svg/twitter.svg";
import { useMe } from "@/app/auth/useMe";
import { useRouter } from "next/navigation";


export default function Footer() {
  const router = useRouter();
  const { data } = useMe();
  return (
    <div className="mt-16 bg-[#EAF8E7] md:mt-[100px]">
      <div className="border-b border-b-[#4EA675] px-4 py-10 sm:px-8 lg:px-11">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:items-start">
          <div className="flex flex-col gap-6">
            <h1 className="text-[#000000] text-[18px] font-medium">
              Company Info
            </h1>
            <div className="flex flex-col gap-5">
              <p className="text-[#000000CC]">About Us</p>
              <p className="text-[#000000CC]">Careers</p>
              <p className="text-[#000000CC]">Press Releases</p>
              <p className="text-[#000000CC]">Sustainability Practices</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-[#000000] text-[18px] font-medium">
              Company Info
            </h1>
            <div className="flex flex-col gap-5">
              <p className="text-[#000000CC]">About Us</p>
              <p className="text-[#000000CC]">Careers</p>
              <p className="text-[#000000CC]">Press Releases</p>
              <p className="text-[#000000CC]">Sustainability Practices</p>
            </div>
          </div>
          <div className="col-span-2 flex items-center justify-center md:col-span-1">
            <Image src={bidlogo} alt="img" className="h-auto w-[140px] sm:w-[180px]" />
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-[#000000] text-[18px] font-medium">
              Company Info
            </h1>
            <div className="flex flex-col gap-5">
              <p className="text-[#000000CC]">About Us</p>
              <p className="text-[#000000CC]">Careers</p>
              <p className="text-[#000000CC]">Press Releases</p>
              <p className="text-[#000000CC]">Sustainability Practices</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-[#000000] text-[18px] font-medium">
              Company Info
            </h1>
            <div className="flex flex-col gap-5">
              <p className="text-[#000000CC]">About Us</p>
              <p className="text-[#000000CC]">Careers</p>
              <p className="text-[#000000CC]">Press Releases</p>
              <p className="text-[#000000CC]">Sustainability Practices</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center gap-8 lg:flex-row lg:justify-around">
          {data ? null : (
            <div className="flex w-full max-w-[396px] flex-col items-center gap-4">
              <h1 className="text-[#4EA674]  font-medium">Newsletter Signup</h1>
              <div className="flex min-h-12 w-full items-center rounded-[200px] bg-[#C1E6BA] p-2">
                <Input
                  className="!border-0  !outline-none !shadow-none !bg-transparent focus:!border-0 focus:!shadow-none focus:!outline-none"
                  placeholder="Enter your email address"
                />
                <button
                  onClick={() => router.push("/register")}
                  className="shrink-0 cursor-pointer rounded-[200px] bg-[#FFFFFF] px-4 py-2 text-sm font-medium text-[#000000] transition-all duration-200 ease-in-out hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] active:scale-95 sm:px-[25px]"
                >
                  Subscribe
                </button>
              </div>
            </div>
          )}
          <div className="text-center lg:text-left">
            <h1 className="text-[#000000] text-[18px] font-medium">
              Connect with us
            </h1>
            <div className="mt-3 flex items-center justify-center gap-3 lg:justify-start">
              <Image src={facebook} alt="facebook" />
              <Image src={insta} alt="insta" />
              <Image src={twitter} alt="twitter" />
              <Image src={linked} alt="linked" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 px-4 py-4 text-center text-sm sm:flex-row sm:justify-between sm:px-11 sm:text-left">
        <p className="text-[#00000080]">© 2025 Dealport. All rights reserved</p>
        <p className="text-[#00000080]">
          Trusted Seller Certifications by SSL Secure
        </p>
      </div>
    </div>
  );
}
