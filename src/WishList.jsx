import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { MdDelete } from "react-icons/md";
import { removeitem } from "./Store/cartReducer";
const WishList = () => {
  const cartProducts = useSelector((state) => {
    return state.cart;
  });

  let dispatch = useDispatch();
  let handledelete = (reduxItemid) => {
    dispatch(removeitem(reduxItemid));
  };

  return (
    <div>
      {cartProducts.length !== 0 ? (
        <section className="products">
          {cartProducts.map((product) => (
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
      ) : (
        <h1>please purchase something</h1>
      )}
    </div>
  );
};

export default WishList;
