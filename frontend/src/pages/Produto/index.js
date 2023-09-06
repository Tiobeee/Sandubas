import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Navbar from "../../components/Navbar";
import { Container, Form } from './style';
import Logo from '../../assets/bapbap.png'

const Produto = () => {
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSignIn = async e => {
        e.preventDefault();
        if (!nome || !valor) {
            setError("Preencha certo la man");
            return;
        }
        try {
            const response = await api.post("/produtos", { nome, valor });
            localStorage.setItem("accessToken", response.data.accessToken);
            navigate("/app");
        } catch (err) {
            setError("Houve um problema com o pedido, verifique suas credenciais...(!)");
        }
    }

    return (
        <div>
            <Navbar />
            <Container>
                <Form onSubmit={handleSignIn}>
                    <img src={Logo} alt='logo_senac' />
                    <input
                        type="text"
                        placeholder='Nome do produto'
                        onChange={e => setNome(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder='Valor'
                        onChange={e => setValor(e.target.value)}
                    />
                    <button type="submit">Entrar</button>
                    {error && <p>{error}</p>}
                </Form>
            </Container>
        </div>
    );
}
export default Produto;