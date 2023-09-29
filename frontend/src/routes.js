import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } 
                                                        from 'react-router-dom';
import { isAuthenticated } from "./services/auth";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Produto from "./pages/Produto";
import Pedido from "./pages/Pedido";
import PedPro from "./pages/PedPro";
import Usuarios from "./pages/Usuarios";
import ListPro from "./pages/ListPro";
import ListPed from "./pages/ListPed";
import ListPedPro from "./pages/ListPedPro";

const LoginPage = () => <Login />;
const LogoutPage = () => <Logout />;
const SignUpPage = () => <SignUp />;
const ProdutoPage = () => <Produto />;
const PedidoPage = () => <Pedido />;
const PedProPage = () => <PedPro />;
const UsuariosPage = () => <Usuarios />;
const ListProPage = () => <ListPro />;
const ListPedPage = () => <ListPed />;
const ListPedProPage = () => <ListPedPro />;
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
            <Route path="/logout" element={<LogoutPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/produto' element={<ProdutoPage />} />
            <Route path="/produtos/:id" element={<ProdutoPage />} />
            <Route path="/produtos" element={<ListProPage />} />
            <Route path='/pedido' element={<PedidoPage />} />
            <Route path='/pedidos/:id' element={<PedidoPage />} />
            <Route path='/pedidos' element={<ListPedPage />} />
            <Route path='/produtopedido' element={<PedProPage/>} />
            <Route path='/produtos_pedidos/:id' element={<PedProPage/>} />
            <Route path="/produtos_pedidos" element={<ListPedProPage/>} />
            <Route path='/app' element={<AppPage />} />
            <Route path='/usuarios' element={<UsuariosPage />}/>
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    </Router>
);

export default Rotas;