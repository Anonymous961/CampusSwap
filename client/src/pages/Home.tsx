import Products from "../components/Products";
import Herosection from "../components/Herosection";
import { Suspense } from "react";
import LoadingSpin from "../components/LoadingSpin";

const Home = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpin />}>
        <Herosection />
      </Suspense>
      <Products />
    </div>
  );
};

export default Home;
