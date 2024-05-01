import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import Home from './components/HomePage';
import Category from './components/Category';
import Cart from './components/Cart';
import Signup from './components/Signup';
import Login from './components/login';
import { AuthProvider } from './auth/authContext';

function App() {
  return (
     <AuthProvider>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />


        </Routes>
      </Router>
      </AuthProvider>
  );
}

export default App;
