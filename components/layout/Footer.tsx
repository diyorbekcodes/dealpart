"use client";
import bidlogo from "../../assets/img/bidlogo.png";
import Image from "next/image";
import { Input } from "antd";
import facebook from "../../assets/svg/Facebook.svg";
import insta from "../../assets/svg/Instagram.svg";
import linked from "../../assets/svg/Linkedin.svg";
import twitter from "../../assets/svg/twitter.svg";
export default function Footer() {
  return (
    <div className="bg-[#EAF8E7] mt-[100px] ">
      <div className="px-[44px] flex flex-col justify-center h-[448px]  border-b border-b-[#4EA675]">
        <div className="flex justify-around items-center">
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
          <div className="flex justify-center items-center">
            <Image src={bidlogo} alt="img" />
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
        <div className="flex justify-around items-center mt-[48px]">
          <div></div>
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-[#4EA674]  font-medium">Newsletter Signup</h1>
            <div className="bg-[#C1E6BA] rounded-[200px] w-[396px] h-[48px] flex items-center p-2">
              <Input
                className="!border-0  !outline-none !shadow-none !bg-transparent focus:!border-0 focus:!shadow-none focus:!outline-none"
                placeholder="Enter your email address"
              />
              <button
                className="text-[#000000]   transition-all duration-200 ease-in-out

hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] active:scale-95 bg-[#FFFFFF] cursor-pointer rounded-[200px] font-medium px-[25px] py-[8px]"
              >
                Subscribe
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-[#000000] text-[18px] font-medium">
              Connect with us
            </h1>
            <div className="flex gap-3 items-center mt-3">
              <Image src={facebook} alt="facebook" />
              <Image src={insta} alt="insta" />
              <Image src={twitter} alt="twitter" />
              <Image src={linked} alt="linked" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between h-[56px] items-center px-[44px]">
        <p className="text-[#00000080]">© 2025 Dealport. All rights reserved</p>
        <p className="text-[#00000080]">
          Trusted Seller Certifications by SSL Secure
        </p>
      </div>
    </div>
  );
}
