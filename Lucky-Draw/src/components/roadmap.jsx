import React from "react";

export default function Roadmap() {
    return(
        <div class="flex min-h-screen  justify-center p-10">
  <div>
    <h2 class=" text-2xl font-semibold md:text-5xl underline text-white mb-7">Project Roadmap</h2>
    <ul>
      <li class="relative flex items-baseline gap-6 pb-5">
        <div class="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="bi bi-circle-fill fill-yellow-500 animate-bounce" viewBox="0 1 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
        </div>
        <div>
          <p class="text-2xl font-semibold underline text-white animate-pulse">Lucky Draw</p>
          <p class="mt-2 text-white text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </li>
      <li class="relative flex items-baseline gap-6 pb-5">
        <div class="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="bi bi-circle-fill fill-gray-400" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
        </div>
        <div>
        <p class="text-2xl font-semibold underline text-white">Coming Soon</p>
          <p class="mt-2 text-white text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </li>
      <li class="relative flex items-baseline gap-6 pb-5">
        <div className="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400" >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="bi bi-circle-fill fill-gray-400" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
        </div>
        <div>
        <p class="text-2xl font-semibold underline text-white">Coming Soon</p>
          <p class="mt-2 text-white text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </li>
      <li class="relative flex items-baseline gap-6 pb-5">
        <div className="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="bi bi-circle-fill fill-gray-400" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
        </div>
        <div>
        <p class="text-2xl font-semibold underline text-white">Coming Soon</p>
          <p class="mt-2 text-white text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </li>
      <li class="relative flex items-baseline gap-6 pb-5">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" class="bi bi-circle-fill fill-gray-400" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
        </div>
        <div>
        <p class="text-2xl font-semibold underline text-white">Coming Soon</p>
          <p class="mt-2 text-white text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt blanditiis dignissimos. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </li>
    </ul>
  </div>
        </div>
    );
}