"use client";

export const PickCategories = () => {
  return (
    <div className="grid grid-cols-5 gap-[24px] overflow-hidden mx-[48px] mt-[64px] ">
      <div className="w-[224px] h-[120px] rounded-xl bg-[url('/home-images/categories/glitch.png')] bg-cover bg-center bg-black hover:scale-110 hover:cursor-pointer">
        <p className="pt-[64px] pl-[32px] font-bold">Glitch Art</p>
      </div>
      <div className="w-[224px] h-[120px] bg-gray-300 rounded-xl bg-[url('/home-images/categories/illustration.png')] bg-cover bg-center hover:scale-110 hover:cursor-pointer">
        <p className="pt-[64px] pl-[32px] font-bold">Illustration</p>
      </div>
      <div className="w-[224px] h-[120px] bg-gray-300 rounded-xl  bg-[url('/home-images/categories/generative.png')] bg-cover bg-center hover:scale-110 hover:cursor-pointer">
        <p className="pt-[64px] pl-[32px] font-bold">Generative Art</p>
      </div>
      <div className="w-[224px] h-[120px] bg-gray-300 rounded-xl  bg-[url('/home-images/categories/music.png')] bg-cover bg-center hover:scale-110 hover:cursor-pointer">
        <p className="pt-[64px] pl-[32px] font-bold">Music</p>
      </div>
      <div className="w-[224px] h-[120px] bg-gray-300 rounded-xl  bg-[url('/home-images/categories/podcast.png')] bg-cover bg-center hover:scale-110 hover:cursor-pointer">
        <p className="pt-[64px] pl-[32px] font-bold">Media</p>
      </div>
    </div>
  );
};
