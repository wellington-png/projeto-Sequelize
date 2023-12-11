const database = require("../models");
const { hash } = require("bcryptjs")

const uuid = require("uuid")

class UsuariosController {
    static async cadastrar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            const usuarioExistente = await database.usuarios.findOne({
                where: {
                    email: email,
                },
            });
            if (usuarioExistente) {

                return res.status(400).json({
                    message: "Email já cadastrado"
                });
            }
            const senhaHash = await hash(senha, 10);
            const novoUsuario = await database.usuarios.create({
                id: uuid.v4(),
                nome: nome,
                email: email,
                senha: senhaHash,
            });
            return res.status(201).json(novoUsuario);
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                message: "Erro interno do servidor"
            });
        }
    }

    static async buscarUsuarios(req, res) {
        try {
            const usuarios = await database.usuarios.findAll();
            if (!usuarios || usuarios.length === 0) {

                return res.status(404).json({ message: "Nenhum usuário encontrado" });
            }
            return res.status(200).json(usuarios);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const usuario = await database.usuarios.findOne({
                where: {
                    id: id,
                },
            });
            if (!usuario) {

                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            return res.status(200).json(usuario);
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                message: "Erro interno do servidor"
            });
        }
    }

    static async editarUsuario(req, res) {
        try {
            const { id } = req.params;
            const { nome, email } = req.body;
            const usuario = await database.usuarios.findOne({
                where: {
                    id: id,
                },
            });
            if (!usuario) {

                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }
            usuario.nome = nome;
            usuario.email = email;
            await usuario.save();
            return res.status(200).json(usuario);
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                message: "Erro interno do servidor"
            });
        }
    }

    static async removerUsuario(req, res) {
        try {
            const { id } = req.params;
            await database.usuarios.destroy({
                where: {
                    id: id,
                },
            });
            return res.status(200).send({ message: "Usuário deletado com sucesso!" });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}
module.exports = UsuariosController;