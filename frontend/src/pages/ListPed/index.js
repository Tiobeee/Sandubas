import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa';
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import { PedidoContainer } from "./style";

const ListPed = () => {
    const [pedidos, setPedidos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function getData(){
            const response = await api.get('/pedidos');
            setPedidos(response.data);
        }
        getData();
    }, []);

    const handleDeleteAsk = (e) => {
        e.preventDefault();
        const exclamation = e.currentTarget.nextSibling;
        exclamation.setAttribute('display', 'block');
        e.currentTarget.remove();
    };

    const handleDelete = async (e, id, index) => {
        e.persist();
        let response = '';
        try{
            response = await api.delete(`/pedidos/${id}`);
            const novospedidos = [...pedidos];
            novospedidos.splice(index, 1);
            setPedidos(novospedidos);
        }catch(err){
            setError('Houve um problema meno'+response);
        }
    }

    return (
        <div>
            <Navbar />
            <h1>Listagem de pedidos</h1>
            {error && <p>{error}</p>}
            <PedidoContainer>
                <div>
                    <span>ID</span>
                    <span>Nome</span>
                    <span>Valor</span>
                    <span>Editar</span>
                    <span>Excluir</span>

                </div>
                {pedidos.map((pedido, index) => (
                    <div key={String(pedido.idpedidos)}>
                        <span>{pedido.idpedidos}</span>
                        <span>{pedido.hora}</span>
                        <span>{pedido.status}</span>
                       =<Link to={`/pedidos/${pedido.idpedidos}`}>
                            <FaEdit size={16} />
                       </Link>
                        <Link onClick={handleDeleteAsk} to={`/pedidos/${pedido.idpedidos}`}>
                            <FaWindowClose size={16} />
                        </Link>
                        <FaExclamation
                            size={16}
                            display="none"
                            cursor="point"
                            onClick={(e) => handleDelete(e, pedido.idpedidos, index)}
                        />
                    </div>
                ))}
            </PedidoContainer>
            
        </div>
    )
};

export default ListPed;