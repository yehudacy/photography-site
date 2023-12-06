import "./App.css";
import NavBar from "./components/NavBar";
import Galery from "./pages/Galery";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import SingleCategoryGalery from "./pages/SingleCategoryGalery";

function App() {
  return (
    <>
      <NavBar />  
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/galery" element={<Galery />}></Route>
        <Route path="/galery/:category" element={<SingleCategoryGalery />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
