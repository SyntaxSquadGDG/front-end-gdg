export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-136px)]">
      <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

