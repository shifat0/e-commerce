import { useState, useEffect, useMemo } from "react";
import Card from "./Card";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import { prices } from "../../utils/prices";
import { showError, showSuccess } from "../../utils/messages";
import {
  getCategories,
  getProducts,
  getFilteredProducts,
} from "../../api/apiProduct";
import { addToCart } from "../../api/apiOrder";
import { isAuthenticated, userInfo } from "../../utils/auth";
import { useLocation } from "react-router-dom";

const orderFilters = [
  { id: 1, name: "ascending", value: "asc" },
  { id: 2, name: "descending", value: "desc" },
];

const sortByFilters = [
  { id: 1, name: "price" },
  { id: 2, name: "sold" },
  { id: 3, name: "review" },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(4);
  const [order, setOrder] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    price: [],
  });
  const [loading, setLoading] = useState(false);

  const { search } = useLocation();

  useMemo(() => setLimit((prev) => prev + skip), [skip]);

  const userParams = new URLSearchParams(search);
  const searchedProduct = userParams.get("search") || "";

  const user = JSON.parse(userParams.get("user"));
  // authenticate(user?.token, () => {})
  useMemo(() => {
    if (user) localStorage.setItem("jwt", JSON.stringify(user?.token));
  }, [user]);

  useEffect(() => {
    setLoading(true);
    getProducts(sortBy, order, limit)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => setError("Failed to load products!"));

    getCategories()
      .then((response) => setCategories(response.data))
      .catch((err) => setError("Failed to load categories!"));
  }, [order, sortBy, limit]);

  const handleAddToCart = (product) => () => {
    if (isAuthenticated()) {
      setError(false);
      setSuccess(false);
      const user = userInfo();
      const cartItem = {
        user: user._id,
        product: product._id,
        price: product.price,
      };
      addToCart(user.token, cartItem)
        .then((reponse) => setSuccess(true))
        .catch((err) => {
          if (err.response) setError(err.response.data);
          else setError("Adding to cart failed!");
        });
    } else {
      setSuccess(false);
      setError("Please Login First!");
    }
  };

  const handleFilters = (myfilters, filterBy) => {
    const newFilters = { ...filters };

    if (filterBy === "category") {
      newFilters[filterBy] = myfilters;
    }

    if (filterBy === "price") {
      const data = prices;
      let arr = [];
      for (let i in data) {
        if (data[i].id === parseInt(myfilters)) {
          arr = data[i].arr;
        }
      }
      newFilters[filterBy] = arr;
    }

    if (filterBy === "order") {
      newFilters[filterBy] = myfilters;
    }

    setFilters(newFilters);
    getFilteredProducts(skip, limit, newFilters, order, sortBy)
      .then((response) => setProducts(response.data))
      .catch((err) => setError("Failed to load products!"));
  };

  const showFilters = () => {
    return (
      <>
        <div className="row">
          <div className="col-sm-3">
            <h5>Filter By Categories:</h5>
            <ul>
              <CheckBox
                categories={categories}
                handleFilters={(myfilters) =>
                  handleFilters(myfilters, "category")
                }
              />
            </ul>
          </div>
          <div className="col-sm-5">
            <h5>Filter By Price:</h5>
            <div className="row">
              <RadioBox
                prices={prices}
                handleFilters={(myfilters) => handleFilters(myfilters, "price")}
              />
            </div>
          </div>
          <div className="col-sm-3">
            <h5>Filter By Order:</h5>
            <select
              name="order"
              className="row"
              style={{ textTransform: "capitalize" }}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="">Select a option</option>
              {orderFilters.map((orderFilter) => (
                <option key={orderFilter.id} value={orderFilter.value}>
                  {orderFilter.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-3">
            <h5>Sort By:</h5>
            <select
              name="sortBy"
              className="row"
              style={{ textTransform: "capitalize" }}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Select a option</option>
              {sortByFilters.map((sortByFilter) => (
                <option key={sortByFilter.id} value={sortByFilter.name}>
                  {sortByFilter.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </>
    );
  };

  return (
    <section>
      {showFilters()}
      <div style={{ width: "100%" }}>
        {showError(error, error)}
        {showSuccess(success, "Added to cart successfully!")}
      </div>
      <h4 className="mt-5 mb-3">Products</h4>
      <div className="row">
        {products &&
          products
            .filter((product) =>
              product.name.toLowerCase().includes(searchedProduct.toLowerCase())
            )
            .map((product) => (
              <Card
                product={product}
                key={product._id}
                handleAddToCart={handleAddToCart(product)}
              />
            ))}
      </div>
      <button
        className="btn btn-success d-block mx-auto my-5"
        onClick={() => setSkip(5)}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </section>
  );
};

export default Home;
