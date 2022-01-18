const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'user',
  password: 'user',
  database: 'conteiners'
});

app.listen(3002, () => {
  console.log('Server started on port 3002');
});

app.post('/testeinserir', (req, res) => {

  let SQL = "INSERT INTO conteiners (ct_cliente, ct_n_conteiner, ct_tipo, ct_status, ct_categoria) VALUES ('cliente05', 'abcd7654321', '20', 'Cheio', 'Importação')";
  
  db.query(SQL, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
}); 

app.get('/conteiners', (req, res) => {
  let SQL = "SELECT * FROM conteiners.conteiners;"

  db.query(SQL, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/categoria', (req, res) => {
  db.query('SELECT ct_categoria,COUNT(*) as ct_quantidade FROM conteiners GROUP BY ct_categoria', (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.post('/conteiners', (req, res) => {
  const { ct_cliente, ct_n_conteiner, ct_tipo, ct_status, ct_categoria } = req.body;

  let SQL = `INSERT INTO conteiners (ct_cliente, ct_n_conteiner, ct_tipo, ct_status, ct_categoria) VALUES ('${ct_cliente}', '${ct_n_conteiner}', '${ct_tipo}', '${ct_status}', '${ct_categoria}')`;
  
  let values = [ct_cliente, ct_n_conteiner, ct_tipo, ct_status, ct_categoria];

  db.query(SQL, values, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
}); 

// popular formulário de conteiners para edição
app.get('/view/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);

  let SQL = `SELECT * FROM conteiners WHERE ct_idconteiners = ${id}`;
  
  db.query(SQL, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.put('/edit', (req, res) => {
  const { ct_idconteiners, ct_cliente, ct_n_conteiner, ct_tipo, ct_status, ct_categoria } = req.body;

  let SQL = `UPDATE conteiners SET ct_cliente = '${ct_cliente}', ct_n_conteiner = '${ct_n_conteiner}', ct_tipo = '${ct_tipo}', ct_status = '${ct_status}', ct_categoria = '${ct_categoria}' WHERE ct_idconteiners = ${ct_idconteiners}`;
  
  db.query(SQL, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  let SQL = `DELETE FROM conteiners WHERE ct_idconteiners = ${id}`;
  
  db.query(SQL, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

// MOVIMENTAÇÕES
app.post('/movimentacoes', (req, res) => {
  const { mv_cliente, mv_movimentacao, mv_data_entrada, mv_hora_entrada, mv_data_saida, mv_hora_saida } = req.body;
  // console.log(req.body);

  let sql = `INSERT INTO movimentacoes (mv_cliente, mv_movimentacao, mv_data_entrada, mv_hora_entrada, mv_data_saida, mv_hora_saida) VALUES ('${mv_cliente}', '${mv_movimentacao}', '${mv_data_entrada}', '${mv_hora_entrada}', '${mv_data_saida}', '${mv_hora_saida}')`;
  
  db.query(sql, [mv_cliente, mv_movimentacao, mv_data_entrada, mv_hora_entrada, mv_data_saida, mv_hora_saida], (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
  });

});

app.get('/movimentacoes', (req, res) => {
  let SQL = "SELECT * FROM conteiners.movimentacoes;"

  db.query(SQL, (err, result) => {
    if(err) console.log(err)
    else res.send(result)
  })
});

// popular formulário de movimentações para edição
app.get("/viewMov/:id", (req,res) => {
  const { id } = req.params;
  let sql = `SELECT * FROM movimentacoes WHERE mv_idmovimentacoes = ${id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });

})

app.put("/editMov", (req,res) => {
  const {mv_idmovimentacoes, mv_cliente, mv_movimentacao, mv_data_entrada, mv_hora_entrada, mv_data_saida, mv_hora_saida } = req.body;
  let sql = `UPDATE movimentacoes SET mv_cliente = '${mv_cliente}', mv_movimentacao = '${mv_movimentacao}', mv_data_entrada = '${mv_data_entrada}', mv_hora_entrada = '${mv_hora_entrada}', mv_data_saida = '${mv_data_saida}', mv_hora_saida ='${mv_hora_saida}' WHERE mv_idmovimentacoes = '${mv_idmovimentacoes}'`;
  db.query(sql, [mv_idmovimentacoes, mv_cliente, mv_movimentacao, mv_data_entrada, mv_hora_entrada, mv_data_saida, mv_hora_saida], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });

})

app.delete("/deleteMov/:id", (req,res) => {
  const { id } = req.params;
  let sql = `DELETE FROM movimentacoes WHERE mv_idmovimentacoes = ${id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });

})