const Joi = require('joi');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const vendaSchema = Joi.object({
    data: Joi.date().required(),
    entrega: Joi.date().optional(),
    lentes: Joi.string().max(100).required(),
    armacao: Joi.string().max(100).required(),
    preco: Joi.number().precision(2).required(),
    sinal: Joi.number().precision(2).optional(),
    a_pagar: Joi.number().precision(2).optional(),
    obs: Joi.string().optional(),
    cpf: Joi.string().length(11).required()
});

exports.cadastrarVenda = async (req, res) => {
    const { error, value } = vendaSchema.validate(req.body)
    if (error) {
        return res.status (400).json({ error: error.details[0].message})
    }

    const { data, entrega, cpf, lentes, armacao, preco, sinal, a_pagar, obs } = value;

    try{
        const venda = await prisma.vendas.create({
            data: {
              data,
              entrega,
              clienteCpf: cpf,
              lentes,
              armacao,
              preco,
              sinal,
              a_pagar,
              obs
            }
          });
        res.status(201).json({ message: 'Venda cadastrada com sucesso :)', id: venda.id });
    } catch (error) {
        res.status(500).json({ message: 'Não foi possível cadastrar a venda :/', error: error.message });
    }
}

exports.listarVendas = async (req, res) => {
    try {
        const vendas = await prisma.vendas.findMany();
        res.status(200).json({ vendas });
    } catch (error) {
        res.status(500).json({ message: 'Não foi possível listar as vendas :/', error: error.message });
    }
}

exports.filtersData = async (req, res) => {
    const { campo, valor } = req.query;

    const filtros = {};

    if (campo && valor) {
        filtros[campo] = {
            contains: valor,
            mode: 'insensitive',
        };
    }

    try {
        const vendas = await prisma.vendas.findMany({
            where: filtros,
        });
        res.status(200).json(vendas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar vendas', error: error.message });
    }
};