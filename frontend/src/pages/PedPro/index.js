import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import Navbar from "../../components/Navbar";
import { Container, Form } from './style';
import Logo from '../../assets/bapbap.png';
import axios from "axios";
import { func } from 'prop-types';

const PedPro = () => {
    const { id } = useParams();
    const [observacao, setObs] = useState('');
    const [produtos_idprodutos, setIdPro] = useState('');
    const [pedidos_idpedidos, setIdPed] = useState('');

    const [produtos, setTableProdutos] = useState([]);
    const [pedidos, setTablePedidos] = useState([]);

    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function getSelect(){
            try{
                //Carrega combobox produtos
                let response = await api.get('/produtos');
                setTableProdutos(response.data);

                //Carrega combobox pedidos
                response = await api.get('/pedidos');
                setTablePedidos(response.data);
            }catch(err){

            }
        }
         getSelect();

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

               <select onChange={e => setIdPro(e.target.value)} value={produtos_idprodutos}>
                    <option value="">Selecione um produto</option>
                    {produtos.map(produto => (
                        <option key={produto.idprodutos} value={produto.idprodutos}>
                            {produto.idprodutos}
                        </option>
                    ))}
               </select>

               <select onChange={e => setIdPed(e.target.value)} value={pedidos_idpedidos}>
                    <option value="">Selecione um Pedido</option>
                    {pedidos.map(pedido => (
                        <option key={pedido.idpedidos} value={pedido.idpedidos}>
                            {pedido.idpedidos}
                        </option>
                    ))}
               </select>

               <button type="submit">Entrar</button>
               {error && <p>{error}</p>}
            </Form>
        </Container>
        </div>
    );
    
}
export default PedPro;