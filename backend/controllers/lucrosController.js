const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Joi = require('joi');

const lucroSchema = Joi.object({
    data: Joi.date().required(),
    empresa: Joi.string().max(100).required(),
    valor: Joi.number().precision(2).required(),
    vendaId: Joi.number().optional()
});

exports.createLucro = async (req, res) => {
    const { error, value } = lucroSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { data, empresa, valor, vendaId } = value;

    try {
        const newLucro = await prisma.lucros.create({
            data: {
                data,
                empresa,
                valor,
                usuarioId: req.user.id, // Usa o ID do usuário do token JWT
                vendaId
            }
        });
        res.status(201).json(newLucro);
    } catch (error) {
        res.status(500).json({ message: 'Não foi possível criar o lucro :/', error: error.message });
    }
};