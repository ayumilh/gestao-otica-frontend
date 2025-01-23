const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

    const token = authHeader.split(' ')[1]; // Remove o "Bearer " do token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Anexa os dados do usuário (ex.: id, email, etc.) ao objeto req
        next();
    } catch (error) {
        console.error('Erro ao validar token:', error);
        return res.status(403).json({ error: 'Token inválido ou expirado' });
    }
}

module.exports = { authenticate };