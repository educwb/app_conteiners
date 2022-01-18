import { useState, useEffect } from 'react';
import Axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const GridCategoria = () => {
  const [categoria, setCategoria] = useState();

  const columns = [
    { field: 'categoria', headerName: 'Categoria', width: 180 },
    { field: 'quantidade', headerName: 'Quantidade', width: 180 },
  ]; 

  // get categoria
  useEffect(() => {
    Axios.get('http://localhost:3002/categoria')
      .then(res => {
        setCategoria(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="conteiner" style={{ height: 300, width: '100%' }}>
      <h3>Sumário Categoria</h3>
      <DataGrid 
        rows={categoria ?
          categoria.map(conteiner => {
            return {
              id: Math.random(),
              categoria: conteiner.ct_categoria,
              quantidade: conteiner.ct_quantidade
            }
          }) : []
        } 
        columns={columns}
      /> 
    </div>
  );
}

export default GridCategoria;