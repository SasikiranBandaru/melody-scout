"use client";

import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <span className="flex items-center cursor-pointer">
                <img
                  src="/melodyscout.png"
                  className="h-8 mr-3"
                  alt="MelodyScout Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap"></span>
              </span>
            </Link>
          </div>
          {/* Placeholder for additional columns or content */}
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm sm:text-center">
            © 2023 MelodyScout. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <Link href="https://github.com/Ccrewe92/MelodyScout_WebFinal">
              <span className="cursor-pointer">
                <img src="/github-mark.png" className="h-8 w-auto" alt="GitHub Logo" />
                <span className="sr-only">GitHub account</span>
              </span>
            </Link>
            {/* Placeholder for additional social media links */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
