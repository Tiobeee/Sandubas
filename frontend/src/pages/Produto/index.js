import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form } from './style';
import api from '../../services/api';
import Logo from '../../assets/bapbap.png'
import Navbar from "../../components/Navbar";

const Produto = () => {
    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        async function getData() {
            try {
                const { data } = await api.get(`/produtos/${id}`);
                setNome(data.nome);
                setValor(data.valor);
            } catch (err) {
                setError("Houve um problema ao carrega os dados do produto: " + err);
            }
        }
        getData();
    }, [id]);

    const handleProduto = async e => {
        e.preventDefault();
        if (!nome || !valor) {
            setError("Preencha certo la man");
        } else {
            try {
                if (!id) {
                    await api.post("/produtos", {nome, valor});
                } else {
                    await api.put(`/produtos/${id}`, {nome, valor});
                }
                navigate("/produtos");
            } catch (err) {
                console.log(err);
                setError("Houve um problema com o pedido, verifique suas credenciais...(!)");
            }
        }
    }

    return (
        <div>
            <Navbar />
            <Container>
                <Form onSubmit={handleProduto}>
                    <img src={Logo} alt='logo_senac' />
                    <input
                        value={nome}
                        type="text"
                        placeholder='Nome do produto'
                        onChange={e => setNome(e.target.value)}
                    />
                    <input
                        value={valor}
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