import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { UserAtom } from "./store/atoms/user";
import { useRecoilValue } from "recoil";
import Profile from "./pages/Profile";
import AddItem from "./pages/AddItem";
import Cart from "./pages/Cart";

function App() {
  const user = useRecoilValue(UserAtom);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/addItem"
          element={user ? <AddItem /> : <Navigate to="/" />}
        />
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
