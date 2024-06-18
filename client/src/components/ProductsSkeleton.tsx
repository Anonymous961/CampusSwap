import { ProductSkeleton } from "./ProductSkeleton";

export function ProductsSkeleton() {
  return (
    <section className="grid lg:grid-cols-6 grid-cols-1 mx-8">
      <div className="rounded-md p-5">
        <h3 className="text-3xl font-semibold">Filter</h3>
        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
      </div>
      <div className="lg:col-span-5 p-5 ">
        <h3 className="text-4xl mx-2 mb-5">All Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 m-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
