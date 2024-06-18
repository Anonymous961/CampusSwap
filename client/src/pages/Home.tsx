import Products from "../components/Products";
import Herosection from "../components/Herosection";
import { Suspense } from "react";
import LoadingSpin from "../components/LoadingSpin";

const Home = () => {
  return (
    <div className="min-h-screen w-full">
      <Suspense fallback={<LoadingSpin />}>
        <Herosection />
      </Suspense>
      <Products />
    </div>
  );
};

export default Home;
