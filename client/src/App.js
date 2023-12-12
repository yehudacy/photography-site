import "./App.css";
import NavBar from "./components/NavBar";
import Galery from "./pages/Galery";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import SingleCategoryGalery from "./pages/SingleCategoryGalery";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import ContactMe from "./pages/ContactMe";
import Order from "./pages/Order";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';

function App() {
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
      <NavBar />  
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/galery" element={<Galery />}></Route>
        <Route path="/galery/:category" element={<SingleCategoryGalery />}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="pricing/order" element={<Order />}></Route>
        <Route path="/contactme" element={<ContactMe />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      </LocalizationProvider>
    </>
  );
}

export default App;
