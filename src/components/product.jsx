import { Link } from "react-router-dom";

const Product = (props) => {
  const { productImg, productName, productPrice, productId } = props;
  return (
    <Link to={`/order/${productId}`} className="product">
      <img src={`/product/${productImg}`} alt={productName} />
      <h2>{productName}</h2>
      <p>{productPrice}</p>
      <br />
      <button className="btn">Buy</button>
    </Link>
  );
};

export default Product;
