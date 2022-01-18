import './cadastros.css';
import { useState } from 'react';
import Axios from 'axios';

const AddConteiner = () => {

  const [values, setValues] = useState();
  
  const handleChangeConteiner = (e) => {
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClickConteiner = () => {
    // Validação para não enviar dados undefined
    if(values){ 
      // Validação para obrigar o usuário a preencher os campos
      if(values.cliente && values.n_conteiner && values.tipo && values.status && values.categoria){
        // Validação para o padrão do campo 'número conteiner'
        if(/[a-zA-Z]{4}\d{7}/.test(values.n_conteiner)){
          // console.log(values);
          Axios.post('http://localhost:3002/conteiners', {
            ct_cliente: values.cliente, 
            ct_n_conteiner: values.n_conteiner,
            ct_tipo: values.tipo,
            ct_status: values.status,
            ct_categoria: values.categoria
          }).then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          });
        }else{
          alert('Número do contêiner (4 letras e 7 números. Ex: TEST1234567)');
        }
      } 

    }else {
      alert("Preencha os campos!")
    }
  }

  return (
    <>
      <div className="conteiner">
        <div className="conteiner-fields">
          <h3 className="conteiner-title">Adic. Conteiner</h3>

          <input 
            type="text"
            name="cliente"
            placeholder="Cliente"
            className="input-fields"
            onChange={handleChangeConteiner}
            required
          />

          <input 
            type="text"
            name="n_conteiner"
            placeholder="Nº Conteiner"
            className="input-fields"
            onChange={handleChangeConteiner}
            required
          />

          <select
            type="text"
            name="tipo"
            placeholder="Tipo de Conteiner"
            className="select-fields"
            onChange={handleChangeConteiner}
            required
          >
            <option value="">Tipo de Conteiner</option>
            <option value="20">20</option>
            <option value="40">40</option>
          </select>

          <select
            type="text"
            name="status"
            placeholder="Status"
            className="select-fields"
            onChange={handleChangeConteiner}
            required
          >
            <option value="">Status</option>
            <option value="Cheio">Cheio</option>
            <option value="Vazio">Vazio</option>
          </select>

          <select
            type="text"
            name="categoria"
            placeholder="Categoria"
            className="select-fields"
            onChange={handleChangeConteiner}
            required
          >
            <option value="">Categoria</option>
            <option value="Exportação">Exportação</option>
            <option value="Importação">Importação</option>
          </select>

          <button className="btn-cadastrar" onClick={() => handleClickConteiner()}>Cadastrar</button>
        </div>
      </div> 
    
    </>
  );
}

export default AddConteiner;