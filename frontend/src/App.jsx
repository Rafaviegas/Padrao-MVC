import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login"
import Home from "./pages/home/home"
import EditCategories from './pages/categories/editCategories' 
import Categories from './pages/categories/categories'
import AddCategorie from './pages/categories/addcategories'
import Livros from './pages/livros/livros'
import AddLivro from './pages/livros/addLivro'
import EditLivros from './pages/livros/editLivros'
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
                    <Route path="/livros" element={<Livros />} />
                    <Route path="/livros/addLivro" element={<AddLivro />} />
                    <Route path="/livros/edit/:id" element={<EditLivros />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;