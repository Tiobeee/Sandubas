import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa';
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import { PedProContainer } from "./style";

const ListPro = () => {
    const [pedpro, setPedPro] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function getData(){
            const response = await api.get('/produtos_pedidos');
            setPedPro(response.data);
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
            response = await api.delete(`/produtos_pedidos/${id}`);
            const novosPedPros = [...pedpro];
            novosPedPros.splice(index, 1);
            setPedPro(novosPedPros);
        }catch(err){
            setError('Houve um problema meno'+response);
        }
    }

    return (
        <div>
            <Navbar />
            <h1>Listagem de Produtos_Pedidos</h1>
            {error && <p>{error}</p>}
            <PedProContainer>
                <div>
                    <span>ID</span>
                    <span>Observacao</span>
                    <span>Produtos_IdProdutos</span>
                    <span>Pedidos_IdPedidos</span>
                    <span>Editar</span>
                    <span>Excluir</span>

                </div>
                {pedpro.map((pedpro, index) => (
                    <div key={String(pedpro.idprodutos_pedidos)}>
                        <span>{pedpro.idprodutos_pedidos}</span>
                        <span>{pedpro.observacao}</span>
                        <span>{pedpro.produtos_idprodutos}</span>
                        <span>{pedpro.pedidos_idpedidos}</span>
                       =<Link to={`/produtos_pedidos/${pedpro.idprodutos_pedidos}`}>
                            <FaEdit size={16} />
                       </Link>
                        <Link onClick={handleDeleteAsk} to={`/produtos_pedidos/${pedpro.idprodutos_pedidos}`}>
                            <FaWindowClose size={16} />
                        </Link>
                        <FaExclamation
                            size={16}
                            display="none"
                            cursor="point"
                            onClick={(e) => handleDelete(e, pedpro.idprodutos_pedidos, index)}
                        />
                    </div>
                ))}
            </PedProContainer>
            
        </div>
    )
};

export default ListPro;