const express = require('express');
const app = express();
const resultados = [];

app.use(express.json());

app.post('/adicionar-resposta', (req, res) => {
  const { nome, pontuacao } = req.body;
  resultados.push({ nome, pontuacao });
  res.send({ message: 'Resposta adicionada com sucesso' });
});

app.get('/get-rank', (req, res) => {
  const rank = resultados.sort((a, b) => b.pontuacao - a.pontuacao);
  res.send(rank);
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});