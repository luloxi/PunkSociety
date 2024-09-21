// ErrorComponent.tsx
export const ErrorComponent = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="text-2xl text-red-500">Error: {message}</div>
    </div>
  );
};
