export function ProductSkeleton() {
  return (
    <div className="flex flex-col justify-between overflow-hidden max-w-sm hover:scale-105 hover:shadow-lg hover:bg-white ease-in duration-300 rounded-md cursor-pointer">
      <div className="flex items-center h-48 bg-gray-300 rounded sm:w-96 ">
        <svg
          className="h-10 text-gray-200 rounded-t-md w-1/2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div>
        <div className="p-2">
          <div className="h-7 bg-gray-200  w-48 mb-6"></div>
          <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
          <div className="my-2 font-medium">
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
          </div>
          <div className="font-bold">
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2">
          <div className="h-10 bg-gray-200 rounded-md w-48 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded-md w-48 mb-4"></div>
        </div>
      </div>
    </div>
  );
}
