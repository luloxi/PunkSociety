// RestoreDescriptionButton.tsx
export const RestoreDescriptionButton = ({ handleRestore }: { handleRestore: () => void }) => {
  return (
    <div className="flex justify-center my-4">
      <button onClick={handleRestore} className="bg-green-500 text-white px-4 py-2 rounded-full">
        Restore Simple Mint Info
      </button>
    </div>
  );
};
