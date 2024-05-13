import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import PanShopNavbar from './components/PanShopNavbar';
// import CarouselDefault from './components/CarouselDefault';


function App() {
  return (
    < >
     {/* <Admin/> */}
     <PanShopNavbar/>  
    
     <Outlet />
     {/* <CarouselDefault/> */}
     <Footer/>
    </>
  );
}

export default App;
