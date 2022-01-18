import './style.css'
import { useState } from 'react';
import Axios from 'axios';

const EditConteiners = (props) => {
  const [tipo, setTipo] = useState(props.tipo)
  const [status, setStatus] = useState(props.status)
  const [categoria, setCategoria] = useState(props.categoria)
  const [cliente, setCliente] = useState(props.cliente)
  const [n_conteiner, setN_conteiner] = useState(props.n_conteiner)

  const handleChangeCliente = (event) => {
    setCliente(event.target.value)
  };

  const handleChangeNumero = (event) => {
    setN_conteiner(event.target.value)
  }

  const handleChangeTipo = (event) => {
    setTipo(event.target.value)
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value)
  };
  const handleChangeCategoria = (event) => {
    setCategoria(event.target.value)
  };

  const handleEditConteiner = () => {
    props.setViewEditar(false)
    Axios.put('http://localhost:3002/edit', {
      ct_idconteiners: props.id,
      ct_cliente: cliente, 
      ct_n_conteiner: n_conteiner,
      ct_tipo: tipo,
      ct_status: status,
      ct_categoria: categoria
    }).then(res => {
      console.log(res);
      props.setViewEditar(false)
    }).catch(err => {
      console.log(err);
    });
  };

  const handleDeleteConteiner = () => {
    props.setViewEditar(false)
    Axios.delete(`http://localhost:3002/delete/${props.id}`)
      .then(res => {
        console.log(res);
        props.setViewEditar(false)
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="conteiner-edit">
        <div className="form">
          <h1 className="conteiner-title">Edit Conteiner</h1>
          <input 
            type="text"
            name="cliente"
            placeholder="cliente"
            className="input-fields"
            value={cliente}
            onChange={handleChangeCliente}
            required
          />
          <input
            type="text"
            name="n_conteiner"
            placeholder="número do conteiner"
            className="input-fields"
            value={n_conteiner}
            onChange={handleChangeNumero}
            required
          />
          <select 
            type="text"
            name="tipo"
            placeholder="tipo do conteiner"
            className="select-fields"
            value={tipo}
            onChange={handleChangeTipo}
            required
          >
            <option value="">Tipo do conteiner</option>
            <option value="20">20</option>
            <option value="40">40</option>
          </select>

          <select 
            type="text"
            name="status"
            placeholder="status"
            className="select-fields"
            value={status}
            onChange={handleChangeStatus}
            required
          >
            <option value="">Status</option>
            <option value="Cheio">Cheio</option>
            <option value="Vazio">Vazio</option>
          </select>
          <select 
            type="text"
            name="categoria"
            placeholder="categoria"
            className="select-fields"
            value={categoria}
            onChange={handleChangeCategoria}
            required
          >
            <option value="">Categoria</option>
            <option value="Importação">Importação</option>
            <option value="Exportação">Exportação</option>
          </select>

          <button className="btn-cadastrar" onClick={() => handleEditConteiner()}>Atualizar</button>
          <button className="btn-cadastrar" onClick={() => handleDeleteConteiner()}>Excluir</button>
        </div>
      </div>
    </>
  )
}

export default EditConteiners;