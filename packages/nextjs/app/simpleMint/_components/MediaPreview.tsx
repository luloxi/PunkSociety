// MediaPreview.tsx
import Image from "next/image";

export const MediaPreview = ({ image, animationUrl }: { image: string; animationUrl: string }) => {
  return (
    <div className="flex items-center justify-center w-60 h-60 bg-gray-200 rounded-lg shadow-lg relative">
      {image ? (
        <Image src={image} alt="NFT Image" className="w-full h-auto rounded-lg object-cover" width={300} height={300} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-red-600 text-white font-bold text-center p-2 rounded-lg">
          No image provided
        </div>
      )}
      {animationUrl && (
        <video controls className="w-full h-12 my-2">
          <source src={animationUrl} type="audio/mpeg" />
        </video>
      )}
    </div>
  );
};
