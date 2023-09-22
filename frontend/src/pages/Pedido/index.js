import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import Navbar from "../../components/Navbar";
import { Container, Form } from './style';
import Logo from '../../assets/bapbap.png'

const Pedido = () => {
    const { id } = useParams();
    const [hora, setHora] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        async function getData() {
            try {
                const { data } = await api.get(`/pedidos/${id}`);
                setHora(data.hora);
                setStatus(data.status);
            } catch (err) {
                setError("Houve um problema ao carrega os dados do pedido: " + err);
            }
        }
        getData();
    }, [id]);

    const handlePedido = async e => {
        e.preventDefault();
        if (!hora || !status) {
            setError("Preencha certo la man");
        } else {
            try {
                if (!id) {
                    await api.post("/pedidos", {hora, status});
                } else {
                    await api.put(`/pedidos/${id}`, {hora, status});
                }
                navigate("/pedidos");
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
            <Form onSubmit={handlePedido}>
                <img src={Logo} alt='logo_senac'/>
                <input
                    value={hora}
                    type="datetime"
                    placeholder='Hora do pedido'
                    onChange={e=>setHora(e.target.value)}
                />
                <input
                    value={status}
                    type="number"
                    placeholder='Status'
                    onChange={e=>setStatus(e.target.value)}
               />
               <button type="submit">Entrar</button>
               {error && <p>{error}</p>}
            </Form>
        </Container>
        </div>
    );
    
}
export default Pedido;