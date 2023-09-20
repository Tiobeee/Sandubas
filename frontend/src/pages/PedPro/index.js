import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Navbar from "../../components/Navbar";
import { Container, Form } from './style';
import Logo from '../../assets/bapbap.png';

const PedPro = () => {
    const [observacao, setObs] = useState('');
    const [produtos_idprodutos, setIdPro] = useState('');
    const [pedidos_idpedidos, setIdPed] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSignIn = async e => {
        e.preventDefault();
        if (!observacao || !produtos_idprodutos || !pedidos_idpedidos){
            setError("Preencha certo la man");
            return;
        }
        try{
            const response = await api.post("/produtos_pedidos", {observacao, produtos_idprodutos, pedidos_idpedidos});
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
                <img src={Logo} alt='logo_senac'/>
                <input
                    type="text"
                    placeholder='Observacao'
                    onChange={e=>setObs(e.target.value)}
                />
                <input
                    type="number"
                    placeholder='IdProdutos'
                    onChange={e=>setIdPro(e.target.value)}
               />
               <input
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