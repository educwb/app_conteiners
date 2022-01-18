import { useState, useEffect } from 'react';
import Axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import EditConteiners from '../EditConteiners';

import './style.css';

const GridConteiners = () => {
  const [conteiners, setConteiners] = useState();
  const [showEdit, setShowEdit] = useState([]);
  const [viewEditar, setViewEditar] = useState(false); // para controlar a exibição do modal de edição

  const columns = [
    { field: 'cliente', headerName: 'Cliente', width: 180 },
    { field: 'n_conteiner', headerName: 'Número Conteiner', width: 180 },
    { field: 'tipo', headerName: 'Tipo', width: 180},
    { field: 'status', headerName: 'Status', width: 180 },
    { field: 'categoria', headerName: 'Categoria', width: 180 },
  ]; 

  // get conteiners
  useEffect(() => {
    Axios.get('http://localhost:3002/conteiners')
      .then(res => {
        setConteiners(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [viewEditar]);

  // carregar conteiner para edição
  const getConteiner = async (id) => {
    const res = await Axios.get(`http://localhost:3002/view/${id}`);
    console.log(res)
    setShowEdit(res.data[0]);
    setViewEditar(true);
  }

  return (
    <>
      {viewEditar && 
        <EditConteiners 
          id = {showEdit.ct_idconteiners}
          cliente={showEdit.ct_cliente}
          n_conteiner={showEdit.ct_n_conteiner}
          tipo={showEdit.ct_tipo}
          status={showEdit.ct_status}
          categoria={showEdit.ct_categoria} 
          setViewEditar={setViewEditar}     
        />
      }
      <div className="gridConteiner" style={{ height: 500, width: '70%' }}>
        <h2>Lista Conteiners</h2>
        <DataGrid 
          rows={conteiners ?
            conteiners.map(conteiner => {
              return {
                id: conteiner.ct_idconteiners,
                cliente: conteiner.ct_cliente,
                n_conteiner: conteiner.ct_n_conteiner,
                tipo: conteiner.ct_tipo,
                status: conteiner.ct_status,
                categoria: conteiner.ct_categoria
              }
            }) : []
          } 
          columns={columns}
          onRowClick={(e) => getConteiner(e.id)}
        /> 
      </div>
    
    </>
  );
}

export default GridConteiners;