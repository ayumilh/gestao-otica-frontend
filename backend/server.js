const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./bg');

app.use(express.json());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);


// routes
const vendasRoutes = require('./Routes/vendasRoutes');


// rotas
app.get("/", (req, res) => {
    res.send("Bem-vindo à página principal, ATUALIZOU 2");
});
app.use('/api/vendas', vendasRoutes);


app.listen(3001, () => {
    console.log('Server running on port 3001');
});