import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Navbar from "../../components/Navbar";
import { Container, Form } from './style';
import Logo from '../../assets/bapbap.png'

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSignIn = async e => {
        e.preventDefault();
        if (!email || !senha){
            setError("Preencha certo la man");
            return;
        }
        try{
            const response = await api.post("/signin", {email, senha});
            localStorage.setItem("accessToken", response.data.accessToken);
            navigate("/app");
        } catch (err) {
            setError("Houve um problema com o login, verifique suas credenciais...(!)");
        }
    }

    return (
        <Container>
            <Navbar />
            <Form onSubmit={handleSignIn}>
                <img src={Logo} alt='logo_senac'/>
                <input
                    type="email"
                    placeholder='Endereco de Email'
                    onChange={e=>setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='Senha'
                    onChange={e=>setSenha(e.target.value)}
               />
               <button type="submit">Entrar</button>
               {error && <p>{error}</p>}
            </Form>
        </Container>
    );
}
export default SignIn;