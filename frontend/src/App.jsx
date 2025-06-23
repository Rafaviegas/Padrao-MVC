import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";




function App(){
    return (
        <>
        <ToastContainer/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<h1>Bem-vindo!</h1>} />
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App;