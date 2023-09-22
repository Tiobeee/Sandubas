import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import Navbar from "../../components/Navbar";
import { Container, Form } from './style';
import Logo from '../../assets/bapbap.png';

const PedPro = () => {
    const { id } = useParams();
    const [observacao, setObs] = useState('');
    const [produtos_idprodutos, setIdPro] = useState('');
    const [pedidos_idpedidos, setIdPed] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        async function getData() {
            try {
                const { data } = await api.get(`/produtos_pedidos/${id}`);
                setObs(data.observacao);
                setIdPro(data.produtos_idprodutos);
                setIdPed(data.pedidos_idpedidos);
            } catch (err) {
                setError("Houve um problema ao carrega os dados do produto/pedido: " + err);
            }
        }
        getData();
    }, [id]);

    const handleSignIn = async e => {
        e.preventDefault();
        if (!observacao || !produtos_idprodutos || !pedidos_idpedidos) {
            setError("Preencha certo la man");
        } else {
            try {
                if (!id) {
                    await api.post("/produtos_pedidos", {observacao, produtos_idprodutos, pedidos_idpedidos});
                } else {
                    await api.put(`/produtos_pedidos/${id}`, {observacao, produtos_idprodutos, pedidos_idpedidos});
                }
                navigate("/produtos_pedidos");
            } catch (err) {
                console.log(err);
                setError("Houve um problema com o pedido/pedido, verifique suas credenciais...(!)");
            }
        }
    }

    return (
        <div>
            <Navbar />
        <Container>
            <Form onSubmit={handleSignIn}>
                <img src={Logo} alt='logo_senac'/>
                <input
                    value={observacao}
                    type="text"
                    placeholder='Observacao'
                    onChange={e=>setObs(e.target.value)}
                />
                <input
                    value={produtos_idprodutos}
                    type="number"
                    placeholder='IdProdutos'
                    onChange={e=>setIdPro(e.target.value)}
               />
               <input
                    value={pedidos_idpedidos}
                    type="number"
                    placeholder='IdPedidos'
                    onChange={e=>setIdPed(e.target.value)}
               />
               <button type="submit">Entrar</button>
               {error && <p>{error}</p>}
            </Form>
        </Container>
        </div>
    );
    
}
export default PedPro;