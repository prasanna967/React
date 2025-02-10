import TODO from "./Todo";
import Home from "./Home";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./Products";
import Signup from "./Signup";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Navbar";
import NotFound from "./NotFound";
import NewProduct from "./NewProduct";
import Updateproduct from "./Updateproduct";
import WishList from "./WishList";
function App() {
  return (
    <div className="app">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Todo" element={<TODO />} />
          <Route path="/signup" element={<Signup />} />

          {/* child component syntax in products  */}
          <Route path="/Products" element={<Products />}>
            {/* inizially child com will showing in parent com  using index */}
            <Route index element={<ProductList />} />
            <Route path="List" element={<ProductList />} />
            <Route path="Details" element={<ProductDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/Newproduct" element={<NewProduct />} />
          <Route path="/Update/:id" element={<Updateproduct />} />
          <Route path="/WishList" element={<WishList />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
