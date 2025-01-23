const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);


// routes
const vendasRoutes = require('./Routes/vendasRoutes');
const clientesRoutes = require('./Routes/clientesRoutes');
const usuariosRoutes = require('./Routes/usuariosRoutes');
const lucrosRoutes = require('./Routes/lucrosRoutes');

// rotas
app.get("/", (req, res) => {
    res.send("Bem-vindo à página principal, ATUALIZOU 2");
});
app.use('/api/vendas', vendasRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/auth', usuariosRoutes);
app.use('/api/lucros', lucrosRoutes);


app.listen(3001, () => {
    console.log('Server running on port 3001');
});