import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Container, Form } from './style';
import Logo from '../../assets/bapbap.png'

const Pedido = () => {
    const [hora, setHora] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSignIn = async e => {
        e.preventDefault();
        if (!hora || !status){
            setError("Preencha certo la man");
            return;
        }
        try{
            const response = await api.post("/pedidos", {hora, status});
            localStorage.setItem("accessToken", response.data.accessToken);
            navigate("/app");
        } catch (err) {
            setError("Houve um problema com o pedido, verifique suas credenciais...(!)");
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSignIn}>
                <img src={Logo} alt='logo_senac'/>
                <input
                    type="datetime"
                    placeholder='Hora do pedido'
                    onChange={e=>setHora(e.target.value)}
                />
                <input
                    type="number"
                    placeholder='Status'
                    onChange={e=>setStatus(e.target.value)}
               />
               <button type="submit">Entrar</button>
               {error && <p>{error}</p>}
            </Form>
        </Container>
    );
}
export default Pedido;