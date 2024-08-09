import React, { useEffect, useState } from "react";
import "./FilterProduct.css";
import axios from "axios";
import Item from "../Item/Item";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";
import ReactSlider from "react-slider";
import { FiFilter } from "react-icons/fi";

const FilterProduct = (props) => {
  const [product, setProduct] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [minDiscount, setMinDiscount] = useState(undefined);
  const [sort, setSort] = useState(undefined);
  const [stock, setStock] = useState(undefined);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [isInitialized, setIsInitialized] = useState(false);
  const category = props.category;
  const heading = props.heading;
  let pages = [];
  const {qry}=useParams()
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = queryString.parse(location.search);
    setColors(params.color ? params.color.split(",").filter(Boolean) : []);
    setSizes(params.size ? params.size.split(",").filter(Boolean) : []);
    setPriceRange([
      params.minPrice ? Number(params.minPrice) : 0,
      params.maxPrice ? Number(params.maxPrice) : 20000,
    ]);
    setMinDiscount(params.minDiscount ? Number(params.minDiscount) : undefined);
    setSort(params.sort || undefined);
    setStock(params.stock || undefined);
    setPageNumber(params.pageNumber ? Number(params.pageNumber) : 1);
    setPageSize(params.pageSize ? Number(params.pageSize) : 3);

    setIsInitialized(true);
  }, [location.search]);

  useEffect(() => {
    if (!isInitialized) return;
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/product`, {
          params: {
            searchQry:qry,
            color: colors.length > 0 ? colors : undefined,
            sizes: sizes.length > 0 ? sizes : undefined,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            minDiscount,
            sort,
            stock,
            pageNumber,
            pageSize,
            category,
          },
        });

        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [
    qry,
    colors,
    sizes,
    priceRange,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
    category,
    isInitialized,
  ]);

  const updateQueryParams = (params) => {
    const currentParams = queryString.parse(location.search);
    const updatedParams = { ...currentParams, ...params };

    Object.keys(updatedParams).forEach((key) => {
      if (
        !updatedParams[key] ||
        updatedParams[key] === "" ||
        updatedParams[key] === "undefined"
      ) {
        delete updatedParams[key];
      }
    });

    navigate({
      search: queryString.stringify(updatedParams),
    });
  };

  const handleColorChange = (event) => {
    const value = event.target.value;
    setColors((prevColors) => {
      const newColors = prevColors.includes(value)
        ? prevColors.filter((color) => color !== value)
        : [...prevColors, value];
      updateQueryParams({ color: newColors.join(",") });
      return newColors;
    });
  };

  const handleSizeChange = (event) => {
    const value = event.target.value;
    setSizes((prevSizes) => {
      const newSizes = prevSizes.includes(value)
        ? prevSizes.filter((size) => size !== value)
        : [...prevSizes, value];
      updateQueryParams({ size: newSizes.join(",") });
      return newSizes;
    });
  };

  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
    updateQueryParams({ minPrice: values[0], maxPrice: values[1] });
  };

  const handleMinDiscountChange = (event) => {
    const value = event.target.value ? Number(event.target.value) : undefined;
    setMinDiscount(value);
    updateQueryParams({ minDiscount: value });
  };

  const handlesortChange = (event) => {
    const value = event.target.value;
    setSort(value);
    updateQueryParams({ sort: value });
  };

  const handlestockChange = (event) => {
    const value = event.target.value;
    setStock(value);
    updateQueryParams({ stock: value });
  };

  const handlePageChange = (page) => {
    setPageNumber(page);
    updateQueryParams({ pageNumber: page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  for (let i = 1; i <= (product.totalPages || 1); i++) {
    pages.push(i);
  }

  return (
    <div className="filter-product-container">      
      <div className="filter-options">
        <div className="filter-header">
        <p className="filter-header-title">Filters</p>
        <FiFilter className="filter-header-icon"/>
        </div>
        <div className="color-filter-option">
          <p className="filter-headings">Color:</p>
          <label>
            <input
              type="checkbox"
              value="black"
              checked={colors.includes("black")}
              onChange={handleColorChange}
            />
            Black
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="red"
              checked={colors.includes("red")}
              onChange={handleColorChange}
            />
            Red
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="purple"
              checked={colors.includes("purple")}
              onChange={handleColorChange}
            />
            Purple
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="pink"
              checked={colors.includes("pink")}
              onChange={handleColorChange}
            />
            Pink
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="blue"
              checked={colors.includes("blue")}
              onChange={handleColorChange}
            />
            Blue
          </label>
        </div>
        <div className="size-filter-option">
          <p className="filter-headings">Sizes:</p>
          <label>
            <input
              type="checkbox"
              value="L"
              checked={sizes.includes("L")}
              onChange={handleSizeChange}
            />
            L
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="X"
              checked={sizes.includes("X")}
              onChange={handleSizeChange}
            />
            X
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="XL"
              checked={sizes.includes("XL")}
              onChange={handleSizeChange}
            />
            XL
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="XXL"
              checked={sizes.includes("XXL")}
              onChange={handleSizeChange}
            />
            XXL
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              value="XXXL"
              checked={sizes.includes("XXXL")}
              onChange={handleSizeChange}
            />
            XXXL
          </label>
        </div>
        <div className="price-filter-option">
          <p className="filter-headings">
            Price Range: {priceRange[0]} - {priceRange[1]}
          </p>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="thumb"
            trackClassName="track"
            defaultValue={priceRange}
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            pearling
            minDistance={10}
            min={0}
            max={20000}
            value={priceRange}
            onChange={handlePriceRangeChange}
          />
        </div>
        <div className="minDiscount">
          <p className="filter-headings">Min Discount:</p>
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
              <option value="price_high">Price: High to Low</option>
              <option value="price_low">Price: Low to High</option>
            </select>
          </div>
        </div>
        <div className="filtered-product">
          {product.content && product.content.length > 0 ? (
            product.content.map((item) => (
              <Item product={item} key={item._id} />
            ))
          ) : (
            <p>No product found</p>
          )}
        </div>
        <div className="pagination">
          {pages.length > 0 &&
            pages.map((page, index) => (
              <div
                className={`pageNum ${
                  page === pageNumber ? "currentPageNum" : ""
                }`}
                key={index}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;

// import React, { useEffect, useState } from "react";
// import "./FilterProduct.css";
// import axios from "axios";
// import Item from "../Item/Item";
// import { useLocation, useNavigate } from "react-router-dom";
// import queryString from "query-string";

// const FilterProduct = (props) => {
//   const [product, setProduct] = useState([]);
//   const [colors, setColors] = useState([]);
//   const [sizes, setSizes] = useState([]);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(20000);
//   const [minDiscount, setMinDiscount] = useState(undefined);
//   const [sort, setSort] = useState(undefined);
//   const [stock, setStock] = useState(undefined);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize, setPageSize] = useState(3);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const category = props.category;
//   const heading = props.heading;
//   let pages = [];

//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const params = queryString.parse(location.search);
//     console.log("params",params);
//     setColors(params.color ? params.color.split(',').filter(Boolean) : []);
//     setSizes(params.size ? params.size.split(',').filter(Boolean) : []);
//     setMinPrice(params.minPrice ? Number(params.minPrice) : 0);
//     setMaxPrice(params.maxPrice ? Number(params.maxPrice) : 20000);
//     setMinDiscount(params.minDiscount ? Number(params.minDiscount) : undefined);
//     setSort(params.sort || undefined);
//     setStock(params.stock || undefined);
//     setPageNumber(params.pageNumber ? Number(params.pageNumber) : 1);
//     setPageSize(params.pageSize ? Number(params.pageSize) : 3);

//     setIsInitialized(true);
//   }, [location.search]);

//   useEffect(() => {
//     if (!isInitialized) return;

//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/product", {
//           params: {
//             color: colors.length > 0 ? colors : undefined,
//             sizes: sizes.length > 0 ? sizes : undefined,
//             minPrice,
//             maxPrice,
//             minDiscount,
//             sort,
//             stock,
//             pageNumber,
//             pageSize,
//             category,
//           },
//         });

//         setProduct(response.data);
//         console.log("colors while fetching",colors);
//         console.log("sizes while fetching",sizes);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchProduct();
//   }, [
//     colors,
//     sizes,
//     minPrice,
//     maxPrice,
//     minDiscount,
//     sort,
//     stock,
//     pageNumber,
//     pageSize,
//     category,
//     isInitialized,
//   ]);

//   const updateQueryParams = (params) => {
//     const currentParams = queryString.parse(location.search);
//     const updatedParams = { ...currentParams, ...params };
//     navigate({
//       search: queryString.stringify(updatedParams),
//     });
//   };

//   const handleColorChange = (event) => {
//     const value = event.target.value;
//     setColors((prevColors) => {
//       const newColors = prevColors.includes(value)
//         ? prevColors.filter((color) => color !== value)
//         : [...prevColors, value];
//       updateQueryParams({ color: newColors.join(',') });
//       return newColors;
//     });
//   };

//   const handleSizeChange = (event) => {
//     const value = event.target.value;
//     setSizes((prevSizes) => {
//       const newSizes = prevSizes.includes(value)
//         ? prevSizes.filter((size) => size !== value)
//         : [...prevSizes, value];
//       updateQueryParams({ size: newSizes.join(',') });
//       return newSizes;
//     });
//   };

//   const handleminPriceChange = (event) => {
//     const value = Number(event.target.value);
//     setMinPrice(value);
//     updateQueryParams({ minPrice: value });
//   };

//   const handlemaxPriceChange = (event) => {
//     const value = Number(event.target.value);
//     setMaxPrice(value);
//     updateQueryParams({ maxPrice: value });
//   };

//   const handleMinDiscountChange = (event) => {
//     const value = event.target.value ? Number(event.target.value) : undefined;
//     setMinDiscount(value);
//     updateQueryParams({ minDiscount: value });
//   };

//   const handlesortChange = (event) => {
//     const value = event.target.value;
//     setSort(value);
//     updateQueryParams({ sort: value });
//   };

//   const handlestockChange = (event) => {
//     const value = event.target.value;
//     setStock(value);
//     updateQueryParams({ stock: value });
//   };

//   const handlePageChange = (page) => {
//     setPageNumber(page);
//     updateQueryParams({ pageNumber: page });
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   for (let i = 1; i <= (product.totalPages || 1); i++) {
//     pages.push(i);
//   }

//   return (
//     <div className="filter-product-container">
//       <div className="filter-options">
//         <div className="color-filter-option">
//           <p className="filter-headings">Color:</p>
//           <label>
//             <input
//               type="checkbox"
//               value="black"
//               checked={colors.includes("black")}
//               onChange={handleColorChange}
//             />
//             Black
//           </label>
//           <br />
//           <label>
//             <input
//               type="checkbox"
//               value="red"
//               checked={colors.includes("red")}
//               onChange={handleColorChange}
//             />
//             Red
//           </label>
//           <br />
//           <label>
//             <input
//               type="checkbox"
//               value="purple"
//               checked={colors.includes("purple")}
//               onChange={handleColorChange}
//             />
//             Purple
//           </label>
//           <br />
//           <label>
//             <input
//               type="checkbox"
//               value="pink"
//               checked={colors.includes("pink")}
//               onChange={handleColorChange}
//             />
//             Pink
//           </label>
//           <br />
//           <label>
//             <input
//               type="checkbox"
//               value="blue"
//               checked={colors.includes("blue")}
//               onChange={handleColorChange}
//             />
//             Blue
//           </label>
//         </div>
//         <div className="size-filter-option">
//           <p className="filter-headings">Sizes:</p>
//           <label>
//             <input
//               type="checkbox"
//               value="L"
//               checked={sizes.includes("L")}
//               onChange={handleSizeChange}
//             />
//             L
//           </label>
//           <br />
//           <label>
//             <input
//               type="checkbox"
//               value="X"
//               checked={sizes.includes("X")}
//               onChange={handleSizeChange}
//             />
//             X
//           </label>
//           <br />
//           <label>
//             <input
//               type="checkbox"
//               value="XL"
//               checked={sizes.includes("XL")}
//               onChange={handleSizeChange}
//             />
//             XL
//           </label>
//           <br />
//           <label>
//             <input
//               type="checkbox"
//               value="XXL"
//               checked={sizes.includes("XXL")}
//               onChange={handleSizeChange}
//             />
//             XXL
//           </label>
//           <br />
//           <label>
//             <input
//               type="checkbox"
//               value="XXXL"
//               checked={sizes.includes("XXXL")}
//               onChange={handleSizeChange}
//             />
//             XXXL
//           </label>
//         </div>
//         <div className="minPrice-filter-option">
//           <p className="filter-headings">Min-Max Price</p>
//           <p className="filter-headings">Min Price: {minPrice}</p>
//           <input
//             type="range"
//             min="0"
//             max="20000"
//             value={minPrice}
//             onChange={handleminPriceChange}
//           />
//           <br />
//           <p className="filter-headings">Max Price: {maxPrice}</p>
//           <input
//             type="range"
//             min="0"
//             max="20000"
//             value={maxPrice}
//             onChange={handlemaxPriceChange}
//           />
//         </div>
//         <div className="minDiscount">
//           <p className="filter-headings">Min Discount:</p>
//           <select value={minDiscount} onChange={handleMinDiscountChange}>
//             <option value="">All</option>
//             <option value="10">10%</option>
//             <option value="20">20%</option>
//             <option value="30">30%</option>
//             <option value="40">40%</option>
//             <option value="50">50%</option>
//             <option value="60">60%</option>
//           </select>
//         </div>
//         <div className="product-stock">
//           <p className="filter-headings">Stock:</p>
//           <select value={stock} onChange={handlestockChange}>
//             <option value="">All</option>
//             <option value="in_stock">In Stock</option>
//             <option value="out_of_stock">Out of Stock</option>
//           </select>
//         </div>
//       </div>
//       <div className="filtered-product-container">
//         <div className="filtered-product-header">
//           <div className="filtered-product-heading">{heading}</div>
//           <div className="sort-price">
//             <p className="sort-filter-header">Sort By:</p>
//             <select value={sort} onChange={handlesortChange}>
//               <option value="">Featured</option>
//               <option value="price_high">Price: High to Low</option>
//               <option value="price_low">Price: Low to High</option>
//             </select>
//           </div>
//         </div>
//         <div className="filtered-product">
//           {product.content && product.content.length > 0 ? (
//             product.content.map((item) => (
//               <Item product={item} key={item._id} />
//             ))
//           ) : (
//             <p>No product found</p>
//           )}
//         </div>
//         <div className="pagination">
//           {pages.length > 0 &&
//             pages.map((page, index) => (
//               <div
//                 className={`pageNum ${page === pageNumber ? "currentPageNum" : ""}`}
//                 key={index}
//                 onClick={() => handlePageChange(page)}
//               >
//                 {page}
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterProduct;
