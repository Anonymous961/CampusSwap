import { ProductSkeleton } from "./ProductSkeleton";

export const UserItemsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 overflow-y-scroll gap-5 m-2">
      {Array.from({ length: 5 }).map((_, index) => {
        return <ProductSkeleton key={index} />;
      })}
    </div>
  );
};
