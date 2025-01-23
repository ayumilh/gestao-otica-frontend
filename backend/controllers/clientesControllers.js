const Joi = require('joi');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const clienteSchema = Joi.object({
    id: Joi.number().integer().positive(),
    nome: Joi.string().max(200).required(),
    cpf: Joi.string().length(11).required(),
    endereco: Joi.string().max(200).required(),
    numero: Joi.string().max(10).required(),
    complemento: Joi.string().max(100).allow(null, ''),
    telefone: Joi.string().length(11).required(),
    vendas: Joi.array().items(Joi.object()).optional() 
});

exports.cadastrarCliente = async (req, res) => {
    const { error, value } = clienteSchema.validate(req.body)
    if (error) {
        return res.status (400).json({ error: error.details[0].message})
    }

    const { nome, cpf, endereco, numero, complemento, telefone, vendas } = value;

    try{
        const cliente = await prisma.clientes.create({
            data: {
              nome,
              cpf,
              endereco,
              numero,
              complemento,
              telefone,
              vendas: vendas ? {create: vendas} : undefined
            }
          });
        res.status(201).json({ message: 'Cliente cadastrado com sucesso :)', id: cliente.id });
    } catch (error) {
        res.status(500).json({ message: 'Não foi possível cadastrar o cliente :/', error: error.message });
    }
}

exports.listarClientes = async (req, res) => {
    try {
        const clientes = await prisma.clientes.findMany();
        res.status(200).json({ clientes });
    } catch (error) {
        res.status(500).json({ message: 'Não foi possível listar os clientes :/', error: error.message });
    }
}

exports.filtersData = async (req, res) => {
    const { campo, valor } = req.query;

    const filtros = {};

    if (campo && valor) {
        filtros[campo] = {
            contains: valor
        }
    }

    try {
        const clientes = await prisma.clientes.findMany({
            where: filtros
        });
        res.status(200).json({ clientes });
    } catch (error) {
        res.status(500).json({ message: 'Não foi possível listar os clientes :/', error: error.message });
    }
}