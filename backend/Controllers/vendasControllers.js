const Joi = require('joi');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const vendaSchema = Joi.object({
    data: Joi.date().required(),
    entrega: Joi.date().optional(),
    nome: Joi.string().max(200).required(),
    cpf: Joi.string().length(11).required(),
    telefone: Joi.string().max(11).required(),
    endereco: Joi.string().max(200).required(),
    complemento: Joi.string().max(100).optional(),
    lentes: Joi.string().max(100).required(),
    armacao: Joi.string().max(100).required(),
    preco: Joi.number().precision(2).required(),
    sinal: Joi.number().precision(2).optional(),
    a_pagar: Joi.number().precision(2).optional(),
    obs: Joi.string().optional()
});

exports.cadastrarVenda = async (req, res) => {
    const { error, value } = vendaSchema.validate(req.body)
    if (error) {
        return res.status (400).json({ error: error.details[0].message})
    }

    const { data, entrega, nome, cpf, telefone, endereco, complemento, lentes, armacao, preco, sinal, a_pagar, obs } = value;

    try{
        const venda = await prisma.vendas.create({
            data: {
              data,
              entrega,
              nome,
              cpf,
              telefone,
              endereco,
              complemento,
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