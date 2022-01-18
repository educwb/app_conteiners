import { useState, useEffect } from 'react';
import Axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import EditMovimentacoes from '../EditMovimentacoes';

import './style.css';

const GridMovimentacoes = () => {
  const [movimentacoes, setMovimentacoes] = useState();
  const [showEdit, setShowEdit] = useState([]);
  const [viewEditar, setViewEditar] = useState(false); // para controlar a exibição do modal de edição

  const columns = [
    { field: 'cliente', headerName: 'Cliente', width: 180 },
    { field: 'movimentacao', headerName: 'Movimentações', width: 180 },
    { field: 'data_entrada', headerName: 'Data de Entrada', width: 180},
    { field: 'hora_entrada', headerName: 'Hora da Entrada', width: 180 },
    { field: 'data_saida', headerName: 'Data de Saída', width: 180 },
    { field: 'hora_saida', headerName: 'Hora de Saída', width: 180 },
  ]; 

  // get Movimentacoes
  useEffect(() => {
    Axios.get('http://localhost:3002/movimentacoes')
      .then(res => {
        setMovimentacoes(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [viewEditar]);

  // carregar conteiner para edição
  const getConteiner = async (id) => {
    const res = await Axios.get(`http://localhost:3002/viewMov/${id}`);
    console.log('res ', res)
    setShowEdit(res.data[0]);
    setViewEditar(true);
  }

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
      {viewEditar && 
        <EditMovimentacoes 
          id = {showEdit.mv_idmovimentacoes}
          cliente={showEdit.mv_cliente}
          movimentacao={showEdit.mv_movimentacao}
          data_entrada={showEdit.mv_data_entrada}
          hora_entrada={showEdit.mv_hora_entrada}
          data_saida={showEdit.mv_data_saida} 
          hora_saida={showEdit.mv_hora_saida} 
          setViewEditar={setViewEditar}      
        />
      }
      <div className="gridMovimentacoes" style={{ height: 500, width: '70%' }}>
        <h2>Lista Movimentações</h2>
        <DataGrid 
          rows={movimentacoes ?
            movimentacoes.map(conteiner => {
              return {
                id: conteiner.mv_idmovimentacoes,
                cliente: conteiner.mv_cliente,
                movimentacao: conteiner.mv_movimentacao,
                data_entrada: formatDate(conteiner.mv_data_entrada),
                hora_entrada: conteiner.mv_hora_entrada,
                data_saida: formatDate(conteiner.mv_data_saida),
                hora_saida: conteiner.mv_hora_saida,
              }
          }) : []} 
          columns={columns}
          onRowClick={(e) => getConteiner(e.id)}
        /> 
      </div>
    
    </>
  );
}

export default GridMovimentacoes;