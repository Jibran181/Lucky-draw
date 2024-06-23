import React from "react";

export default function Footer() {
  return (
    <footer class="bg-[#233545] rounded-lg shadow  m-4 ">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <div className="text-2xl font-bold text-white  cursor-pointer">
              Eth Lucky Draw{" "}
            </div>
          </a>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-[#efb23a] sm:mb-0 ">
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <span class="block text-sm text-[#efb23a] sm:text-center ">
          © 2024 Eth Lucky Draw . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
