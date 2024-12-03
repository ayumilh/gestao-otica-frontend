const express = require('express');
const app = express();
const pool = require('./bg');

app.use(express.json());

// routes
const vendasRoutes = require('./Routes/vendasRoutes');


app.get("/", (req, res) => {
    res.send("Bem-vindo à página principal, ATUALIZOU 2");
}); // Rota de teste Tela Principal


// rotas
app.use('/api/vendas', vendasRoutes);


app.listen(3001, () => {
    console.log('Server running on port 3001');
});