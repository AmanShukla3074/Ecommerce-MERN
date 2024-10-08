const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

const createProduct = async (reqData) => {
  let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

  if (!topLevel) {
    topLevel = new Category({
      name: reqData.topLevelCategory,
      level: 1,
    });

    await topLevel.save()
  }

  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id,
  });


  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
      level: 2,
    });
    await secondLevel.save()
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });

  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    });
    await thirdLevel.save()
  }

  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountPercent: reqData.discountPercent,
    imgUrls: reqData.imgUrls,
    brand: reqData.brand,
    price: reqData.price,
    quantity: reqData.quantity,
    sizes: reqData.sizes,
    category: thirdLevel._id,
  });

  return await product.save();
};

const deleteProduct = async (prodId) => {
  // 1:6:21 -4
  try {
    await Product.findByIdAndDelete(prodId);

    return `Product with id ${prodId} is deleted`;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProduct = async (prodId, reqData) => {
  // 1:6:21 -4
  try {
    await Product.findByIdAndUpdate(prodId, reqData);

    return `Product with id ${prodId} is updated`;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findProductById = async (prodId) => {
 try {
  const product = Product.findById(prodId)
  .populate("category")
  .populate({
    path: "ratings",
    populate: {
      path: "user", 
    },
  })
  .populate({
    path: "reviews",
    populate: {
      path: "user", 
    },
  })
  .exec();

 
   if (!product) { 
     throw new Error("Product not found with id" + prodId);
   }
 
   return product;
 } catch (error) {
  
  throw new Error(error.message);
 }
};


//http://localhost:5001/api/product?color=pink&size=L&minPrice=&maxPrice=2000&category=hoodie&minDiscount=0&sort=&stock=&pageNumber=1&pageSize=10

// const getAllProduct = async (reqQuery) => {
//   let {
//     category,
//     color,
//     sizes,
//     minPrice,
//     maxPrice,
//     minDiscount,
//     sort,
//     stock,
//     pageNumber,
//     pageSize,
//   } = reqQuery;

//   pageSize = pageSize || 10;

//   let query = Product.find().populate("category");
//   // let query = Product.find().populate({ path: "category", populate: { path: "parentCategory" } })

//   if (category) {
//     const existCategory = await Category.find({ name: category }).exec();
//     if (existCategory) {
//       query = query.where("category").equals(existCategory._id);
//     } else {
//       return { content: [], currentPage: 1, totalPages: 1 };
//     }
//   }

//   if (color) {
//     const colorSet = new Set(
//       color.split(",").map((color) => color.trim().toLowerCase())
//     );

//     const colorRegex =
//       colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

//     query = query.where("color").regex(colorRegex);
//   }

//   if (sizes) {
//     const sizesSet = new Set(sizes);

//     query = query.where("sizes.name").in([...sizesSet]); //q.q
//   }

//   if (minPrice && maxPrice) {
//     query = query.where("discountedPrice").gte("minPrice").lte("maxPrice");
//   }

//   if (minDiscount) {
//     query = query.where("discountPercent").gt(minDiscount);
//   }

//   if (stock) {
//     if (stock == "in_stock") {
//       query = query.where("quantity").gt(0);
//     }
//     if (stock == "out_of_stock") {
//       query = query.where("quantity").gt(1); //???
//     }
//   }

//   if (sort) {
//     const sortDirection = sort === "price_hight" ? -1 : 1;
//     query = query.sort({ discountedPrice: sortDirection });
//   }

//   const totalProducts = await Product.countDocuments(query);

//   const skip = (pageNumber - 1) * pageSize;

//   query = query.skip(skip).limit(pageSize);

//   const products = await query.exec();

//   const totalPages = Math.ceil(totalProducts.pageSize);

//   return { content: products, currentPage: pageNumber, totalPages };
// };

const getAllProduct = async (reqQuery) => {
  let {
      category,
      color,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      sort,
      stock,
      pageNumber,
      pageSize,
      searchQry
  } = reqQuery;

  pageSize = pageSize || 10;
  pageNumber = pageNumber || 1;

  let query = Product.find().populate("category");

  if(searchQry){
    query = query.where("title").regex(new RegExp(searchQry, "i"));
  }

  if (category) {
      const existCategory = await Category.findOne({ name: category }).exec();
      if (existCategory) {
          query = query.where("category").equals(existCategory._id);
      } else {
          return { content: [], currentPage: pageNumber, totalPages: 0 };
      }
  }

  if (color) {
    const colorArray = Array.isArray(color) ? color : color.split(",");
    query = query.where("color").in(colorArray.map((color) => color.trim().toLowerCase()));
  }


  if (sizes) {
    const sizesArray = Array.isArray(sizes) ? sizes : sizes.split(",");
    query = query.where("sizes.name").in(sizesArray.map((size) => size.trim()));
  }

  if (minPrice && maxPrice) {
      query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  if (minDiscount) {
      query = query.where("discountPercent").gt(minDiscount);
  }

  if (stock) {
      if (stock == "in_stock") {
          query = query.where("quantity").gt(0);
      } else if (stock == "out_of_stock") {
          query = query.where("quantity").lte(0);
      }
  }

  if (sort) {
      const sortDirection = sort === "price_high" ? -1 : 1;
      query = query.sort({ discountedPrice: sortDirection });
  }

  const totalProducts = await Product.countDocuments(query);

  const skip = (pageNumber - 1) * pageSize;

  query = query.skip(skip).limit(pageSize);

  const products = await query.exec();

  const totalPages = Math.ceil(totalProducts / pageSize);

  return { content: products, currentPage: pageNumber, totalPages };
};


const createMultipleProducts=async(products)=>{
    for (let product of products){
        await createProduct(product)
    }
}

module.exports={
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProduct,
    createMultipleProducts,
}