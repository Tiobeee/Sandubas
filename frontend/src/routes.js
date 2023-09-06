import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } 
                                                        from 'react-router-dom';
import { isAuthenticated } from "./services/auth";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Produto from "./pages/Produto";
import Pedido from "./pages/Pedido";
import Usuarios from "./pages/Usuarios";
import ListPro from "./pages/ListPro";
import ListPed from "./pages/ListPed";

const LoginPage = () => <Login />;
const SignUpPage = () => <SignUp />;
const ProdutoPage = () => <Produto />;
const PedidoPage = () => <Pedido />;
const UsuariosPage = () => <Usuarios />;
const ListProPage = () => <ListPro />;
const ListPedPage = () => <ListPed />;
const NotFoundPage = () => <h1>Page not found...</h1>;
const AppPage = () => {
    if (!isAuthenticated()){
        return <Navigate to="/" replace/>
    }

    return <h1>App</h1>;
}

const Rotas = () => (
    <Router>
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/produto' element={<ProdutoPage />} />
            <Route path="/produtos" element={<ListProPage />} />
            <Route path='/pedido' element={<PedidoPage />} />
            <Route path='/pedidos' element={<ListPedPage />} />
            <Route path='/app' element={<AppPage />} />
            <Route path='/usuarios' element={<UsuariosPage />}/>
<Route path='*' element={<NotFoundPage />} />
        </Routes>
    </Router>
);

export default Rotas;