import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CategoryNav from './components/CategoryNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Collection from './pages/Collection';

import ScrollToTop from './components/ScrollToTop';
import Story from './pages/Story';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen relative">
        <Navbar />
        <CategoryNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/collection/:filterType" element={<Collection />} />
        </Routes>
        <FloatingWhatsApp />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
