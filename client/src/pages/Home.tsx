import Products from "../components/Products";
import Herosection from "../components/Herosection";
import { Suspense } from "react";
import LoadingSpin from "../components/LoadingSpin";

const Home = () => {
  return (
    <div>
      <Herosection />
      {/* <Suspense fallback={<LoadingSpin />}> */}
      <Products />
      {/* </Suspense> */}
    </div>
  );
};

export default Home;
