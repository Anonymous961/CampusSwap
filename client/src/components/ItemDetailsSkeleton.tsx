export function ItemSkeleton() {
  return (
    <div className="flex flex-col justify-center">
      <div className="h-6 bg-gray-200 rounded-md  w-48 mb-4"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
        <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 ">
          <svg
            className="h-10 text-gray-200 rounded-t-md w-full"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className=" p-10">
          <div>
            <div className="h-7 bg-gray-200  w-48 mb-6"></div>
            <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
              <div className="flex items-center w-full">
                <div className="h-2.5 bg-gray-200 rounded-full w-32"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-24"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
              </div>
              <div className="flex items-center w-full max-w-[480px]">
                <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-24"></div>
              </div>
              <div className="flex items-center w-full max-w-[400px]">
                <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-80"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
              </div>
              <div className="flex items-center w-full max-w-[480px]">
                <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-24"></div>
              </div>
              <div className="flex items-center w-full max-w-[440px]">
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-32"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-24"></div>
                <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
              </div>
              <div className="flex items-center w-full max-w-[360px]">
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
                <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-80"></div>
                <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
            <br />

            <p className="text-gray-800 text-2xl mb-10">
              <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            </p>
            <p className="text-red-300 text-3xl mb-10">
              <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2">
            <div className="h-10 bg-gray-200 rounded-md w-48 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded-md w-48 mb-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
