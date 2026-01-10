export default function CheckoutLoading() {
  return (
    <div className="container mt-5">
      <div className="h-12 bg-gray-200 rounded w-64 mb-8 animate-pulse"></div>
      <div className="flex gap-10">
        <div className="flex-1 space-y-10">
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="w-[450px] h-96 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}