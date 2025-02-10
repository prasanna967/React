// import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LifeLine } from "react-loading-indicators";
import useFetch from "./useFetch";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { RiAddLargeLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { additem } from "./Store/cartReducer";

const ProductList = () => {
  // let [Products, setproducts] = useState([]);
  // let [error, seterror] = useState("");
  // let [looding, setlooding] = useState( true );

  // useEffect(() => {
  //   fetch("http://localhost:3000/products", { method: "GET" })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setproducts(data);
  //     })
  //     .catch((error) => {
  //       seterror(error.message);
  //     })
  //     .finally(()=>{
  //       setlooding (false)
  //     })

  //   }, []);
  let { Products, error, looding, setproducts } = useFetch(
    "http://localhost:3000/products"
  );
  let navigate = useNavigate();

  let handledelete = (id) => {
    axios.delete(`http://localhost:3000/products/${id}`).then(() => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
      let Newproductlist = Products.filter((product) => product.id !== id);
      setproducts(Newproductlist);
    });
  };

  let dispatch = useDispatch();
  let stateproduct = useSelector((state) => {
    return state.cart;
  });

  //  Some is like a logical operator
  const addItemTocard = (product) => {
    let checkproduct = stateproduct.some(
      (stateproduct) => stateproduct.id === product.id
    );

    if (!checkproduct) {
      dispatch(additem(product));
      Swal.fire({
        title: "Added To Cart",
        text: "Your product added successfully",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Oops !",
        text: "already added to card",
      });
    }
  };

  if (looding) {
    return (
      <div>
        <center>
          <LifeLine
            color="#32cd32"
            size="medium"
            text="Looding please wait"
            textColor="red"
          />
        </center>
      </div>
    );
  } else {
    return (
      <div>
        <article>
          <span>Click here to Add New Product</span>
          <Button
            onClick={() => {
              navigate("/NewProduct");
            }}
          >
            <RiAddLargeLine />
          </Button>
        </article>
        <h1> Product List</h1>
        {Products.length !== 0 && (
          <section className="products">
            {Products.map((product) => (
              <Card
                key={product.id}
                style={{ width: "18rem" }}
                className="product"
              >
                <center>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ width: "9rem", height: "12rem" }}
                  />
                </center>

                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text style={{ overflow: "scroll", height: "200px" }}>
                    {product.description}
                  </Card.Text>
                </Card.Body>
                <Card.Text>${product.price}</Card.Text>

                <Card.Footer
                  className="detail"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button
                    variant="primary"
                    onClick={() => addItemTocard(product)}
                  >
                    <MdOutlineAddShoppingCart />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      navigate(`/Update/${product.id}`);
                    }}
                  >
                    <FaEdit />{" "}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handledelete(product.id)}
                  >
                    {" "}
                    <MdDelete /> {""}{" "}
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </section>
        )}

        {error && <p>{error}</p>}
      </div>
    );
  }
};

export default ProductList;
