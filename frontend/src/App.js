import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import HomePage from './Pages/HomePage';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import CategoryProductPage from './Pages/CategoryProductPage';
import {Provider} from 'react-redux'
import { store } from './redux/store';
import Register from './Components/Auth/Register';
import RegisterOTP from './Components/Auth/RegisterOTP';
import Login from './Components/Auth/Login';
import LoginOTP from './Components/Auth/LoginOTP';


function App() {
  return (
    <Provider store={store}>
    <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/register-otpVerify' element={<RegisterOTP/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/login-otpVerify' element={<LoginOTP/>}></Route>


      <Route path="product/:productId" element={<ProductDetailsPage />} />

      {/* men categories */}
      <Route path="category/men_tshirt" element={<CategoryProductPage category="men_tshirt" heading="Men's T-Shirts"/>} />
      <Route path="category/men_shirts" element={<CategoryProductPage category="men_shirts" heading="Men's Shirts"/>} />
      <Route path="category/men_sweatshirts_hoodies" element={<CategoryProductPage category="men_sweatshirts_hoodies" heading="Men's Sweatshirts & Hoodies"/>} />
      <Route path="category/men_jackets" element={<CategoryProductPage category="men_jackets" heading="Men's Jackets"/>} />
      <Route path="category/men_sweaters" element={<CategoryProductPage category="men_sweaters" heading="Men's Sweaters"/>} />

      <Route path="category/men_joggers" element={<CategoryProductPage category="men_joggers" heading="Men's Joggers"/>} />
      <Route path="category/men_jeans" element={<CategoryProductPage category="men_jeans" heading="Men's Jeans"/>} />
      <Route path="category/men_cargos" element={<CategoryProductPage category="men_cargos" heading="Men's Cargos"/>} />
      <Route path="category/men_trousers_pants" element={<CategoryProductPage category="men_trousers_pants" heading="Men's Trousers & Pants"/>} />
      <Route path="category/men_shorts" element={<CategoryProductPage category="men_shorts" heading="Men's Shorts"/>} />
      <Route path="category/men_boxers" element={<CategoryProductPage category="men_boxers" heading="Men's Boxers"/>} />

      <Route path="category/men_watches" element={<CategoryProductPage category="men_watches" heading="Men's Watches"/>} />
      <Route path="category/men_bracelets" element={<CategoryProductPage category="men_bracelets" heading="Men's Bracelets"/>} />
      <Route path="category/men_sunglasses" element={<CategoryProductPage category="men_sunglasses" heading="Men's Sunglasses"/>} />
      <Route path="category/men_caps" element={<CategoryProductPage category="men_caps" heading="Men's Caps"/>} />
      <Route path="category/men_bags" element={<CategoryProductPage category="men_bags" heading="Men's Bags"/>} />
      <Route path="category/men_belts" element={<CategoryProductPage category="men_belts" heading="Men's Belts"/>} />
      {/* women categories */}
      
      <Route path="category/women_dresses" element={<CategoryProductPage category="women_dresses" heading="Women's Dresses"/>} />
      <Route path="category/women_tops" element={<CategoryProductPage category="women_tops" heading="Women's Tops"/>} />
      <Route path="category/women_tshirt" element={<CategoryProductPage category="women_tshirt" heading="Women's T-Shirts"/>} />
      <Route path="category/women_shirts" element={<CategoryProductPage category="women_shirts" heading="Women's Shirts"/>} />
      <Route path="category/women_sweaters" element={<CategoryProductPage category="women_sweaters" heading="Women's Sweaters"/>} />
      <Route path="category/women_jackets" element={<CategoryProductPage category="women_jackets" heading="Women's Jackets"/>} />
      <Route path="category/women_hoodies" element={<CategoryProductPage category="women_hoodies" heading="Women's Hoodies"/>} />

      <Route path="category/women_jeans" element={<CategoryProductPage category="women_jeans" heading="Women's Jeans"/>} />
      <Route path="category/women_leggings" element={<CategoryProductPage category="women_leggings" heading="Women's Leggings"/>} />
      <Route path="category/women_skirts" element={<CategoryProductPage category="women_skirts" heading="Women's Skirts"/>} />
      <Route path="category/women_pants" element={<CategoryProductPage category="women_pants" heading="Women's Pants"/>} />
      <Route path="category/women_shorts" element={<CategoryProductPage category="women_shorts" heading="Women's Shorts"/>} />
      <Route path="category/women_joggers" element={<CategoryProductPage category="women_joggers" heading="Women's Joggers"/>} />

      <Route path="category/women_watches" element={<CategoryProductPage category="women_watches" heading="Women's Watches"/>} />
      <Route path="category/women_bracelets" element={<CategoryProductPage category="women_bracelets" heading="Women's Bracelets"/>} />
      <Route path="category/women_sunglasses" element={<CategoryProductPage category="women_sunglasses" heading="Women's Sunglasses"/>} />
      <Route path="category/women_handbags" element={<CategoryProductPage category="women_handbags" heading="Women's Handbags"/>} />
      <Route path="category/women_scarves" element={<CategoryProductPage category="women_scarves" heading="Women's Scarves"/>} />
      
      
      {/* Search  */}
      <Route path="search/:qry" element={<CategoryProductPage />} />

    </Routes>
    </Router>
    </Provider>
  );
}

export default App;
