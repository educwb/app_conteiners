import './style.css'
import { useState, useEffect } from 'react';
import Axios from 'axios';

const EditMovimentacoes = (props) => {
  const [cliente, setCliente] = useState(props.cliente)
  const [movimentacoes, setMovimentacoes] = useState(props.movimentacao)
  const [dataEntrada, setDataEntrada] = useState(props.data_entrada)
  const [horaEntrada, setHoraEntrada] = useState(props.hora_entrada)
  const [dataSaida, setDataSaida] = useState(props.data_saida)
  const [horaSaida, setHoraSaida] = useState(props.hora_saida)

  const handleChangeMovimentacoes = (event) => {
    setMovimentacoes(event.target.value)
  };
  const handleChangeDataEntrada = (event) => {
    setDataEntrada(event.target.value)
  };
  const handleChangeHoraEntrada = (event) => {
    setHoraEntrada(event.target.value)
  };
  const handleChangeDataSaida = (event) => {
    setDataSaida(event.target.value)
  };
  const handleChangeHoraSaida = (event) => {
    setHoraSaida(event.target.value)
  };

  const handleEditMovimentacao = () => {
    props.setViewEditar(false)
    Axios.put('http://localhost:3002/editMov', {
      mv_idmovimentacoes: props.id,
      mv_cliente: cliente, 
      mv_movimentacao: movimentacoes,
      mv_data_entrada: formatDate(dataEntrada),
      mv_hora_entrada: horaEntrada,
      mv_data_saida: formatDate(dataSaida),
      mv_hora_saida: horaSaida,
    }).then(res => {
      console.log(res);
      props.setViewEditar(false)
    }).catch(err => {
      console.log(err);
    });

  };

  const handleDeleteMovimentacao = () => {
    props.setViewEditar(false)
    Axios.delete(`http://localhost:3002/deleteMov/${props.id}`)
      .then(res => {
        console.log(res);
        props.setViewEditar(false)
      })
      .catch(err => {
        console.log(err);
      });
  };
 

  // useEffect(() => {
  //   setCliente(props.cliente)
  //   setMovimentacoes(props.movimentacao)
  //   setDataEntrada(props.data_entrada)
  //   setHoraEntrada(props.hora_entrada)
  //   setDataSaida(props.data_saida)
  //   setHoraSaida(props.hora_saida)
  // }, [props])

  const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  
  return (
    <>
      <div className="conteiner-editMov">
        <div className="form">
            <h1 className="conteiner-title">Edit Movimentação</h1>
            <input 
              type="text"
              name="cliente"
              placeholder="cliente"
              value={cliente}
              className="input-fields"
              onChange={() => (alert('O cliente não pode ser alterado'))}
              required
            />
            <select 
              type="text"
              name="movimentacao"
              placeholder="movimentação"
              className="select-fields"
              value={movimentacoes}
              onChange={handleChangeMovimentacoes}
              required
            >
              <option value="">Movimentação</option>
              <option value="Embarque">Embarque</option>
              <option value="Descarga">Descarga</option>
              <option value="Gate In">Gate In</option>
              <option value="Gate Out">Gate Out</option>
              <option value="Reposicionamento">Reposicionamento</option>
              <option value="Pesagem">Pesagem</option>
              <option value="Scanner">Scanner</option>
            </select>
            <h5 className="entrada-saida">Entrada</h5>
            <input 
              type="date"
              name="data_entrada"
              placeholder="data de entrada"
              className="input-fields"
              value={formatDate(dataEntrada)}
              onChange={handleChangeDataEntrada}
              required
            />
            <input 
              type="time"
              name="hora_entrada"
              placeholder="hora de entrada"
              className="input-fields"
              value={horaEntrada}
              onChange={handleChangeHoraEntrada}
              required
            />
            <h5 className="entrada-saida">Saída</h5>
            <input 
              type="date"
              name="data_saida"
              placeholder="data de saída"
              className="input-fields"
              value={formatDate(dataSaida)}
              onChange={handleChangeDataSaida}
              required
            />
            <input 
              type="time"
              name="hora_saida"
              placeholder="hora de saída"
              className="input-fields"
              value={horaSaida}
              onChange={handleChangeHoraSaida}
              required
            />

          <button className="btn-cadastrar" onClick={() => handleEditMovimentacao()}>Atualizar</button>
          <button className="btn-cadastrar" onClick={() => handleDeleteMovimentacao()}>Excluir</button>
          </div>
        </div>
    </>
  )
}

export default EditMovimentacoes;