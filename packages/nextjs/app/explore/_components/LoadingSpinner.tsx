// LoadingSpinner.tsx
export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <span className="loading loading-spinner loading-lg"></span>
      <div className="text-2xl text-primary-content ml-4">Loading NFTs...</div>
    </div>
  );
};
