import React, { useEffect, useState } from "react";
import "./FilterProduct.css";
import axios from "axios";
import Item from "../Item/Item";
const FilterProduct = (props) => {
  const [product, setProduct] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [minDiscount, setMinDiscount] = useState(undefined);
  const [sort, setSort] = useState(undefined);
  const [stock, setStock] = useState(undefined);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const category = props.category;
  const heading = props.heading;
  let pages=[];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/product", {
          params: {
            color: colors.length > 0 ? colors : undefined,
            size: sizes.length > 0 ? sizes : undefined,
            minPrice,
            maxPrice,
            minDiscount,
            pageNumber,
            pageSize,
            category,
            sort,
            stock,
          },
        });

        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    pageNumber,
    pageSize,
    category,
    sort,
    stock,
  ]);

  const handleColorChange = (event) => {
    const value = event.target.value;
    setColors((prevColors) => {
      return prevColors.includes(value)
        ? prevColors.filter((color) => color !== value)
        : [...prevColors, value];
    });
  };

  const handleSizeChange = (event) => {
    const value = event.target.value;
    setSizes((prevSizes) => {
      return prevSizes.includes(value)
        ? prevSizes.filter((size) => size !== value)
        : [...prevSizes, value];
    });
  };


  for (let i = 1; i <= product.totalPages; i++) {
    pages.push(i)
  }

  const handleminPriceChange = (event) => setMinPrice(event.target.value);
  const handlemaxPriceChange = (event) => setMaxPrice(event.target.value);
  const handleMinDiscountChange = (event) => setMinDiscount(event.target.value);
  const handlesortChange = (event) => setSort(event.target.value);
  const handlestockChange = (event) => setStock(event.target.value);


  const handlePageChange = (page) =>{
    setPageNumber(page)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="filter-product-container">
      <div className="filter-options">
        <div className="color-filter-option">
          <p className="filter-headings">Color:</p>
          <label htmlFor="">
            <input
              type="checkbox"
              value="black"
              checked={colors.includes("black")}
              onChange={handleColorChange}
            />
            Black
          </label>
          <br />
          <label htmlFor="">
            <input
              type="checkbox"
              value="red"
              checked={colors.includes("red")}
              onChange={handleColorChange}
            />
            Red
          </label>
          <br />
          <label htmlFor="">
            <input
              type="checkbox"
              value="blue"
              checked={colors.includes("blue")}
              onChange={handleColorChange}
            />
            blue
          </label>
        </div>
        <div className="size-filter-option">
          <p className="filter-headings">Sizes:</p>
          <label htmlFor="">
            <input
              type="checkbox"
              value="L"
              checked={sizes.includes("L")}
              onChange={handleSizeChange}
            />
            L
          </label>
          <br />
          <label htmlFor="">
            <input
              type="checkbox"
              value="X"
              checked={colors.includes("X")}
              onChange={handleColorChange}
            />
            X
          </label>

          <br />
          <label htmlFor="">
            <input
              type="checkbox"
              value="XL"
              checked={colors.includes("XL")}
              onChange={handleColorChange}
            />
            XL
          </label>
        </div>
        <div className="minPrice-filter-option">
          <p className="filter-headings">Min-Max Price</p>
          <p className="filter-headings">Min Price: {minPrice}</p>
          <input
            type="range"
            min="0"
            max="20000"
            value={minPrice}
            onChange={handleminPriceChange}
          />
          {/* {minPrice} */}
          <br />
          <p className="filter-headings">Max Price: {maxPrice}</p>
          <input
            type="range"
            min="0"
            max="20000"
            value={maxPrice}
            onChange={handlemaxPriceChange}
          />
          {/* {maxPrice} */}
        </div>
        <div className="minDiscount">
          <p className="filter-headings">Min Discount: </p>
          <select value={minDiscount} onChange={handleMinDiscountChange}>
            <option value="">All</option>
            <option value="10">10%</option>
            <option value="20">20%</option>
            <option value="30">30%</option>
            <option value="40">40%</option>
            <option value="50">50%</option>
            <option value="60">60%</option>
          </select>
        </div>
        {/* <div className="sort-price">
          <p className="filter-headings">Sort Price:</p>
          <select value={sort} onChange={handlesortChange}>
            <option value="">None</option>
            <option value="price_high">Price:High to Low</option>
            <option value="price_low">Price:Low to High</option>
          </select>
        </div> */}
        <div className="product-stock">
          <p className="filter-headings">Stock:</p>
          <select value={stock} onChange={handlestockChange}>
            <option value="">All</option>
            <option value="in_stock">In Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
      </div>
      <div className="filtered-product-container">
        <div className="filtered-product-header">
          <div className="filtered-product-heading">{heading}</div>
          <div className="sort-price">
            <p className="sort-filter-header">Sort By:</p>
            <select value={sort} onChange={handlesortChange}>
              <option value="">Featured</option>
              <option value="price_high">Price:High to Low</option>
              <option value="price_low">Price:Low to High</option>
            </select>
          </div>
        </div>
        <div className="filtered-product">
          {product.content && product.content.length > 0 ? (
            product.content.map((item) => (
              <Item product={item} key={item._id} />
            ))
          ) : (
            <p>no product found</p>
          )}
        </div>
        <div className="pagination">
          {pages.length>0 && pages.map((page,index)=>(
            
            <div className={`pageNum ${page==pageNumber?"currentPageNum":""}`} key={index} onClick={()=>{handlePageChange(page)}} >{page}</div>
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
