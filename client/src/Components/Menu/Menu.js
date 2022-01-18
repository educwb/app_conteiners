import './menu.css';
import { useState } from 'react';

import GridConteiners from '../GridConteiners';
import GridCategoria from '../GridCategoria';
import AddConteiner from '../Cadastros/AddConteiner';
import AddMovimentacoes from '../Cadastros/AddMovimentacoes';
import GridMovimentacoes from '../GridMovimentacoes';

const Menu = () => {
  const [addConteiner, setAddConteiner] = useState(false);
  const [gridConteiner, setGridConteiner] = useState(false)
  const [addMovimentacao, setAddMovimentacao] = useState(false);
  const [gridMovimentacao, setGridMovimentacao] = useState(false);
  return (
    <>
      <div className="buttons">
        <button onClick={() => setAddConteiner(!addConteiner)}>{(addConteiner ? "Ocultar Adic. Conteiner" : "Mostrar Adic. Conteiner")}</button>
        <button onClick={() => setAddMovimentacao(!addMovimentacao)}>{(addMovimentacao ? "Ocultar Adic. Movimentação" : "Mostrar Adic. Movimentação")}</button>
        <button onClick={() => setGridConteiner(!gridConteiner)}>{(gridConteiner ? "Ocultar Lista Conteiner" : "Mostrar Lista Conteiner")}</button>
        <button onClick={() => setGridMovimentacao(!gridMovimentacao)}>{(gridMovimentacao ? "Ocultar Lista Movimentação" : "Mostrar Lista Movimentação")}</button>
      </div>
      {gridConteiner && <GridConteiners />}
      {addConteiner && <AddConteiner />}
      {addMovimentacao && <AddMovimentacoes />}
      {gridMovimentacao && <GridMovimentacoes />}
      {gridMovimentacao && <GridCategoria />}
    </>
  );
};

export default Menu;