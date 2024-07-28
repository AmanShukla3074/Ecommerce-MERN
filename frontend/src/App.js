import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import HomePage from './Pages/HomePage';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import CategoryProductPage from './Pages/CategoryProductPage';

function App() {
  return (
    <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path="product/:productId" element={<ProductDetailsPage />} />
      <Route path="category/men_tshirt" element={<CategoryProductPage category="men_tshirt" />} />
    </Routes>
    </Router>
  );
}

export default App;
