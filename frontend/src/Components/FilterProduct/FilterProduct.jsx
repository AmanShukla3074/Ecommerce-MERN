import React, { useEffect, useState } from "react";
import "./FilterProduct.css";
import axios from "axios";
import Item from "../Item/Item";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";
import ReactSlider from "react-slider";
import { FiFilter } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const FilterProduct = (props) => {
  const [product, setProduct] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [minDiscount, setMinDiscount] = useState(undefined);
  const [sort, setSort] = useState("Featured");
  const [stock, setStock] = useState(undefined);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [isInitialized, setIsInitialized] = useState(false);

  const [showFilters, setShowFilters] = useState(false);

  const [colorDropdown, setColorDropdown] = useState(false);
  const [sizeDropdown, setSizeDropdown] = useState(false);
  const [pricerangeDropdown, setPricerangeDropdown] = useState(false);
  const [minDiscountDropdown, setMinDiscountDropdown] = useState(false);
  const [stockDropdown, setStockDropdown] = useState(false);
  const [sortDropdown, setSortDropdown] = useState(false);

  const category = props.category;
  const heading = props.heading;
  let pages = [];
  const { qry } = useParams();
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
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/api/product`,
          {
            params: {
              searchQry: qry,
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
          }
        );

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

  const handleMinDiscountChange = (value) => {
    // const value = event.target.value ? Number(event.target.value) : undefined;
    setMinDiscount(value);
    updateQueryParams({ minDiscount: value });
  };

  // const handleMinDiscountChange = (event) => {
  //   const value = event.target.value ? Number(event.target.value) : undefined;
  //   setMinDiscount(value);
  //   updateQueryParams({ minDiscount: value });
  // };

  const handlesortChange = (value) => {
    setSort(value);
    updateQueryParams({ sort: value });
  };

  // const handlesortChange = (event) => {
  //   const value = event.target.value;
  //   setSort(value);
  //   updateQueryParams({ sort: value });
  // };

  const handlestockChange = (value) => {
    setStock(value);
    updateQueryParams({ stock: value });
  };

  // const handlestockChange = (event) => {
  //   const value = event.target.value;
  //   setStock(value);
  //   updateQueryParams({ stock: value });
  // };

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
      {product.content && product.content.length > 0 && (
        <div
          className="toggle-filters-button"
          onClick={() => setShowFilters(true)}
        >
          Show Filters
        </div>
      )}

      <div
        className={`filter-options ${showFilters ? "filter-options-show" : ""}`}
      >
        <div className="filter-header">
          <p className="filter-header-title">Filters</p>
          <FiFilter className="filter-header-icon" />
        </div>
        <div className="color-filter-option">
          <div
            className="filter-headings"
            onClick={() => {
              setColorDropdown(!colorDropdown);
            }}
          >
            <span className="filter-headings-header"> Color </span>{" "}
            {colorDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}{" "}
          </div>
          {colorDropdown && (
            <div className="color-filter">
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
          )}
        </div>
        <div className="size-filter-option">
          <div
            className="filter-headings"
            onClick={() => {
              setSizeDropdown(!sizeDropdown);
            }}
          >
            <span className="filter-headings-header"> Sizes </span>{" "}
            {sizeDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {sizeDropdown && (
            <div className="size-filter">
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
          )}
        </div>
        <div className="price-filter-option">
          <div
            className="filter-headings"
            onClick={() => {
              setPricerangeDropdown(!pricerangeDropdown);
            }}
          >
            <span className="filter-headings-header"> Price Range </span>{" "}
            {pricerangeDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            {/* Price Range: {priceRange[0]} - {priceRange[1]} */}
          </div>
          {pricerangeDropdown && (
            <div className="price-filter">
              {" "}
              {priceRange[0]} - {priceRange[1]}{" "}
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
              />{" "}
            </div>
          )}
        </div>
        <div className="minDiscount">
          <div
            className="filter-headings"
            onClick={() => {
              setMinDiscountDropdown(!minDiscountDropdown);
            }}
          >
            <span className="filter-headings-header"> Minmum Discount </span>{" "}
            {minDiscountDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {minDiscountDropdown && (
            <div className="dropdown-options-container">
              <p
                className="dropdown-options"
                onClick={() => {
                  handleMinDiscountChange(10);
                }}
              >
                10%
              </p>
              <p
                className="dropdown-options"
                onClick={() => {
                  handleMinDiscountChange(20);
                }}
              >
                20%
              </p>
              <p
                className="dropdown-options"
                onClick={() => {
                  handleMinDiscountChange(30);
                }}
              >
                30%
              </p>
              <p
                className="dropdown-options"
                onClick={() => {
                  handleMinDiscountChange(40);
                }}
              >
                40%
              </p>
              <p
                className="dropdown-options"
                onClick={() => {
                  handleMinDiscountChange(50);
                }}
              >
                50%
              </p>
              <p
                className="dropdown-options"
                onClick={() => {
                  handleMinDiscountChange(60);
                }}
              >
                60%
              </p>
            </div>
          )}
        </div>
        <div className="product-stock">
          <div
            className="filter-headings"
            onClick={() => {
              setStockDropdown(!stockDropdown);
            }}
          >
            <span className="filter-headings-header">Stock</span>{" "}
            {stockDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {stockDropdown && (
            <div className="dropdown-options-container">
              <p
                className="dropdown-options"
                onClick={() => {
                  handlesortChange();
                }}
              >
                All
              </p>
              <p
                className="dropdown-options"
                onClick={() => {
                  handlesortChange("in_stock");
                }}
              >
                In Stock
              </p>
              <p
                className="dropdown-options"
                onClick={() => {
                  handlesortChange("out_of_stock");
                }}
              >
                Out of Stock
              </p>
            </div>
          )}
        </div>
        <IoMdClose onClick={() => setShowFilters(false)} className="filter-options-close-btn"/>
        <div
          className="toggle-filters-button"
          onClick={() => setShowFilters(false)}
        >
          Hide Filters
        </div>
      </div>
      <div className="filtered-product-container">
        <div className="filtered-product-header">
          <div className="filtered-product-heading">{heading}</div>
          <div className="sort-price">
            <div
              className="sort-filter-header"
              onClick={() => {
                setSortDropdown(!sortDropdown);
              }}
            >
              <span className="filter-headings-header">{`Sort By: ${
                sort == "price_high"
                  ? "High to Low"
                  : sort == "price_low"
                  ? "Low to High"
                  : "Featured"
              }`}</span>
              {sortDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {sortDropdown && (
              <div className="sort-dropdown-options">
                <p
                  className="dropdown-options"
                  onClick={() => {
                    handlesortChange("");
                  }}
                >
                  Featured
                </p>
                <p
                  className="dropdown-options"
                  onClick={() => {
                    handlesortChange("price_high");
                  }}
                >
                  High to Low
                </p>
                <p
                  className="dropdown-options"
                  onClick={() => {
                    handlesortChange("price_low");
                  }}
                >
                  Low to High
                </p>
              </div>
            )}
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

//old code without my dropdown
// import React, { useEffect, useState } from "react";
// import "./FilterProduct.css";
// import axios from "axios";
// import Item from "../Item/Item";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import queryString from "query-string";
// import ReactSlider from "react-slider";
// import { FiFilter } from "react-icons/fi";

// const FilterProduct = (props) => {
//   const [product, setProduct] = useState([]);
//   const [colors, setColors] = useState([]);
//   const [sizes, setSizes] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 20000]);
//   const [minDiscount, setMinDiscount] = useState(undefined);
//   const [sort, setSort] = useState(undefined);
//   const [stock, setStock] = useState(undefined);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize, setPageSize] = useState(3);
//   const [isInitialized, setIsInitialized] = useState(false);

//   const [colorDropdown, setColorDropdown] = useState(false);
//   const [sizeDropdown, setSizeDropdown] = useState(false);
//   const [pricerangeDropdown, setPricerangeDropdown] = useState(false);
//   const [minDiscountDropdown, setMinDiscountDropdown] = useState(false);
//   const [stockDropdown, setStockDropdown] = useState(false);
//   const [sortDropdown, setSortDropdown] = useState(false);

//   const category = props.category;
//   const heading = props.heading;
//   let pages = [];
//   const {qry}=useParams()
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const params = queryString.parse(location.search);
//     setColors(params.color ? params.color.split(",").filter(Boolean) : []);
//     setSizes(params.size ? params.size.split(",").filter(Boolean) : []);
//     setPriceRange([
//       params.minPrice ? Number(params.minPrice) : 0,
//       params.maxPrice ? Number(params.maxPrice) : 20000,
//     ]);
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
//         const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/product`, {
//           params: {
//             searchQry:qry,
//             color: colors.length > 0 ? colors : undefined,
//             sizes: sizes.length > 0 ? sizes : undefined,
//             minPrice: priceRange[0],
//             maxPrice: priceRange[1],
//             minDiscount,
//             sort,
//             stock,
//             pageNumber,
//             pageSize,
//             category,
//           },
//         });

//         setProduct(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchProduct();
//   }, [
//     qry,
//     colors,
//     sizes,
//     priceRange,
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

//     Object.keys(updatedParams).forEach((key) => {
//       if (
//         !updatedParams[key] ||
//         updatedParams[key] === "" ||
//         updatedParams[key] === "undefined"
//       ) {
//         delete updatedParams[key];
//       }
//     });

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
//       updateQueryParams({ color: newColors.join(",") });
//       return newColors;
//     });
//   };

//   const handleSizeChange = (event) => {
//     const value = event.target.value;
//     setSizes((prevSizes) => {
//       const newSizes = prevSizes.includes(value)
//         ? prevSizes.filter((size) => size !== value)
//         : [...prevSizes, value];
//       updateQueryParams({ size: newSizes.join(",") });
//       return newSizes;
//     });
//   };

//   const handlePriceRangeChange = (values) => {
//     setPriceRange(values);
//     updateQueryParams({ minPrice: values[0], maxPrice: values[1] });
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
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   for (let i = 1; i <= (product.totalPages || 1); i++) {
//     pages.push(i);
//   }

//   return (
//     <div className="filter-product-container">
//     <div className="filter-products-tabView">
//     <div className="filter-header">
//         <p className="filter-header-title">Filters</p>
//         <FiFilter className="filter-header-icon"/>
//         </div>
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
//         <div className="price-filter-option">
//           <p className="filter-headings">
//             Price Range: {priceRange[0]} - {priceRange[1]}
//           </p>
//           <ReactSlider
//             className="horizontal-slider"
//             thumbClassName="thumb"
//             trackClassName="track"
//             defaultValue={priceRange}
//             ariaLabel={["Lower thumb", "Upper thumb"]}
//             ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
//             pearling
//             minDistance={10}
//             min={0}
//             max={20000}
//             value={priceRange}
//             onChange={handlePriceRangeChange}
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
//         <div className="sort-price">
//             <p className="sort-filter-header">Sort By:</p>
//             <select value={sort} onChange={handlesortChange}>
//               <option value="">Featured</option>
//               <option value="price_high">Price: High to Low</option>
//               <option value="price_low">Price: Low to High</option>
//             </select>
//           </div>
//       </div>
//       <div className="filter-options">
//         <div className="filter-header">
//         <p className="filter-header-title">Filters</p>
//         <FiFilter className="filter-header-icon"/>
//         </div>
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
//         <div className="price-filter-option">
//           <p className="filter-headings">
//             Price Range: {priceRange[0]} - {priceRange[1]}
//           </p>
//           <ReactSlider
//             className="horizontal-slider"
//             thumbClassName="thumb"
//             trackClassName="track"
//             defaultValue={priceRange}
//             ariaLabel={["Lower thumb", "Upper thumb"]}
//             ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
//             pearling
//             minDistance={10}
//             min={0}
//             max={20000}
//             value={priceRange}
//             onChange={handlePriceRangeChange}
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
//                 className={`pageNum ${
//                   page === pageNumber ? "currentPageNum" : ""
//                 }`}
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

// import React, { useState, useEffect } from "react";
// import "./FilterProduct.css";
// import axios from "axios";
// import Item from "../Item/Item";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import queryString from "query-string";
// import ReactSlider from "react-slider";
// import { FiFilter } from "react-icons/fi";

// const FilterProduct = (props) => {
//   const [product, setProduct] = useState([]);
//   const [colors, setColors] = useState([]);
//   const [sizes, setSizes] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 20000]);
//   const [minDiscount, setMinDiscount] = useState(undefined);
//   const [sort, setSort] = useState(undefined);
//   const [stock, setStock] = useState(undefined);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize, setPageSize] = useState(3);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [showDropdown, setShowDropdown] = useState({
//     color: false,
//     size: false,
//     minDiscount: false,
//     sort: false,
//     stock: false,
//   });
//   const category = props.category;
//   const heading = props.heading;
//   let pages = [];
//   const { qry } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const params = queryString.parse(location.search);
//     setColors(params.color ? params.color.split(",").filter(Boolean) : []);
//     setSizes(params.size ? params.size.split(",").filter(Boolean) : []);
//     setPriceRange([
//       params.minPrice ? Number(params.minPrice) : 0,
//       params.maxPrice ? Number(params.maxPrice) : 20000,
//     ]);
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
//         const response = await axios.get(
//           `${process.env.REACT_APP_BACKEND_API}/api/product`,
//           {
//             params: {
//               searchQry: qry,
//               color: colors.length > 0 ? colors : undefined,
//               sizes: sizes.length > 0 ? sizes : undefined,
//               minPrice: priceRange[0],
//               maxPrice: priceRange[1],
//               minDiscount,
//               sort,
//               stock,
//               pageNumber,
//               pageSize,
//               category,
//             },
//           }
//         );

//         setProduct(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchProduct();
//   }, [
//     qry,
//     colors,
//     sizes,
//     priceRange,
//     minDiscount,
//     sort,
//     stock,
//     pageNumber,
//     pageSize,
//     category,
//     isInitialized,
//   ]);

//   const handlesortChange = (event) => {
//     const value = event.target.value;
//     setSort(value);
//     updateQueryParams({ sort: value });
//   };
//   const updateQueryParams = (params) => {
//     const currentParams = queryString.parse(location.search);
//     const updatedParams = { ...currentParams, ...params };

//     Object.keys(updatedParams).forEach((key) => {
//       if (
//         !updatedParams[key] ||
//         updatedParams[key] === "" ||
//         updatedParams[key] === "undefined"
//       ) {
//         delete updatedParams[key];
//       }
//     });

//     navigate({
//       search: queryString.stringify(updatedParams),
//     });
//   };

//   const handleFilterChange = (type, value) => {
//     if (type === "color") {
//       setColors((prevColors) =>
//         prevColors.includes(value)
//           ? prevColors.filter((color) => color !== value)
//           : [...prevColors, value]
//       );
//       updateQueryParams({ color: colors.join(",") });
//     }
//     if (type === "size") {
//       setSizes((prevSizes) =>
//         prevSizes.includes(value)
//           ? prevSizes.filter((size) => size !== value)
//           : [...prevSizes, value]
//       );
//       updateQueryParams({ size: sizes.join(",") });
//     }
//     if (type === "minDiscount") {
//       setMinDiscount(value);
//       updateQueryParams({ minDiscount: value });
//     }
//     if (type === "sort") {
//       setSort(value);
//       updateQueryParams({ sort: value });
//     }
//     if (type === "stock") {
//       setStock(value);
//       updateQueryParams({ stock: value });
//     }
//   };

//   const handlePageChange = (page) => {
//     setPageNumber(page);
//     updateQueryParams({ pageNumber: page });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   for (let i = 1; i <= (product.totalPages || 1); i++) {
//     pages.push(i);
//   }

//   const renderDropdown = (type, options, currentValue) => (
//     <div className="custom-dropdown">
//       <div
//         className="dropdown-label"
//         onClick={() =>
//           setShowDropdown((prev) => ({ ...prev, [type]: !prev[type] }))
//         }
//       >
//         {currentValue || `Select ${type}`}
//       </div>
//       {showDropdown[type] && (
//         <div className="dropdown-menu">
//           {options.map((option) => (
//             <div
//               key={option}
//               className={`dropdown-item ${
//                 currentValue === option ? "selected" : ""
//               }`}
//               onClick={() => handleFilterChange(type, option)}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="filter-product-container">
//       <div className="filter-options">
//         <div className="filter-header">
//           <p className="filter-header-title">Filters</p>
//           <FiFilter className="filter-header-icon" />
//         </div>
//         <div className="color-filter-option">
//           <p className="filter-headings">Color:</p>
//           {renderDropdown(
//             "color",
//             ["black", "red", "purple", "pink", "blue"],
//             colors.join(", ")
//           )}
//         </div>
//         <div className="size-filter-option">
//           <p className="filter-headings">Sizes:</p>
//           {renderDropdown(
//             "size",
//             ["L", "X", "XL", "XXL", "XXXL"],
//             sizes.join(", ")
//           )}
//         </div>
//         <div className="price-filter-option">
//           <p className="filter-headings">
//             Price Range: {priceRange[0]} - {priceRange[1]}
//           </p>
//           <ReactSlider
//             className="horizontal-slider"
//             thumbClassName="thumb"
//             trackClassName="track"
//             defaultValue={priceRange}
//             ariaLabel={["Lower thumb", "Upper thumb"]}
//             ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
//             pearling
//             minDistance={10}
//             min={0}
//             max={20000}
//             value={priceRange}
//             onChange={setPriceRange}
//             onAfterChange={(values) =>
//               updateQueryParams({ minPrice: values[0], maxPrice: values[1] })
//             }
//           />
//         </div>
//         <div className="minDiscount">
//           <p className="filter-headings">Min Discount:</p>
//           {renderDropdown(
//             "minDiscount",
//             ["All", "10%", "20%", "30%", "40%", "50%", "60%"],
//             minDiscount === undefined ? "All" : `${minDiscount}%`
//           )}
//         </div>
//         <div className="sortOption">
//           <p className="filter-headings">Sort By:</p>
//           {renderDropdown(
//             "sort",
//             ["Featured", "Price: High to Low", "Price: Low to High"],
//             sort
//           )}
//         </div>
//         <div className="stockOption">
//           <p className="filter-headings">Stock:</p>
//           {renderDropdown(
//             "stock",
//             ["All", "In Stock", "Out of Stock"],
//             stock === undefined ? "All" : stock
//           )}
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
//                 className={`pageNum ${
//                   page === pageNumber ? "currentPageNum" : ""
//                 }`}
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
