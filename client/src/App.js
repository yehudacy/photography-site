import "./App.css";
import NavBar from "./components/NavBar";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import SingleCategoryGallery from "./pages/SingleCategoryGallery";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import ContactMe from "./pages/ContactMe";
import Order from "./pages/Order";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Payment from "./pages/Payment";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
      <NavBar />  
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
        <Route path="/gallery/:category" element={<SingleCategoryGallery />}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/pricing/order" element={<Order />}></Route>
        <Route path="/pay" element={<Payment />}></Route>
        <Route path="/admin" element={<AdminDashboard />}></Route>
        <Route path="/contactme" element={<ContactMe />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      </LocalizationProvider>
    </>
  );
}

export default App;
