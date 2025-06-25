import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login"
import Home from "./pages/home/home"
import Categories from './pages/categories/categories'
import AddCategorie from './pages/categories/addcategories'
import { ToastContainer } from "react-toastify"


function App(){
    return (
        <div>
            <ToastContainer/>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />}/>
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/categories/addCategorie" element={<AddCategorie />} />
                    <Route path="/categories/edit/:id" element={<EditCategories />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;