import './cadastros.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

const AddMovimentacoes = () => {

  const [values, setValues] = useState();
  const [listClientes, setListClientes] = useState();
  
  const handleChangeMovimentacao = (e) => {
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClickMovimentacao = () => {
    // Validação para não enviar dados undefined
    if(values){ 
      // Validação para obrigar o usuário a preencher os campos
      if(values.cliente && values.movimentacao && values.data_entrada && values.hora_entrada && values.data_saida && values.hora_saida){
        Axios.post('http://localhost:3002/movimentacoes', {
          mv_cliente: values.cliente,
          mv_movimentacao: values.movimentacao,
          mv_data_entrada: values.data_entrada,
          mv_hora_entrada: values.hora_entrada,
          mv_data_saida: values.data_saida,
          mv_hora_saida: values.hora_saida
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
      } else {
        alert('Preencha todos os campos');
      }
    }
  };
  
  // usado para popular o select com os clientes
  useEffect(() => {
    Axios.get('http://localhost:3002/conteiners')
      .then(res => {
        setListClientes(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="conteiner">
        <div className="conteiner-fields">
          <h3 className="conteiner-title">Adic. Movimentação</h3>
          <select 
              type="text"
              name="cliente"
              placeholder="cliente"
              className="select-fields"
              onChange={handleChangeMovimentacao}
              required
            >
              <option value="">Selecione o cliente</option>
              {
                // map to list ct_cliente
                listClientes?.map((cliente) => (
                  <option key={cliente.ct_idconteiners} value={cliente.ct_cliente}>{cliente.ct_cliente}</option>
                ))
              }            
            </select>        
          <select 
              type="text"
              name="movimentacao"
              placeholder="movimentação"
              className="select-fields"
              onChange={handleChangeMovimentacao}
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
              onChange={handleChangeMovimentacao}
              required
            />
            <input 
              type="time"
              name="hora_entrada"
              placeholder="hora de entrada"
              className="input-fields"
              onChange={handleChangeMovimentacao}
              required
            />
            <h5 className="entrada-saida">Saída</h5>
            <input 
              type="date"
              name="data_saida"
              placeholder="data de saída"
              className="input-fields"
              onChange={handleChangeMovimentacao}
              required
            />
            <input 
              type="time"
              name="hora_saida"
              placeholder="hora de saída"
              className="input-fields"
              onChange={handleChangeMovimentacao}
              required
            />
            <button className="btn-cadastrar" onClick={() => handleClickMovimentacao()}>Cadastrar</button>
          </div>
      </div>
    
    </>
  );
}

export default AddMovimentacoes;