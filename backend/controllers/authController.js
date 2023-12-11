const database = require("../models");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");
const { verify } = require("jsonwebtoken");

class AuthController {

    static async login(req, res) {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {
                return res.status(400).send({ message: "Email e senha são obrigatórios" });
            }

            const usuario = await database.usuarios.findOne({
                attributes: ["id", "email", "senha"],
                where: { email: email }
            });
            if (!usuario) {

                return res.status(401).send({
                    message: "Usuário não cadastrado"
                });
            }
            const comparacao = await compare(senha, usuario.senha);
            if (!comparacao) {
                return res.status(401).send({
                    message: "Usuário ou senha incorretos"
                });
            }
            const accessToken = sign(
                {
                    id: usuario.id,
                    email: usuario.email,
                },
                jsonSecret.secret,
                {
                    expiresIn: 86400,
                }
            );
            res.status(200).send({ accessToken });
        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: "Ocorreu um erro durante a autenticação"
            });
        }
    }

    static async verifyToken(req, res) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({
                message: 'Token não fornecido'

            });

        }
        const [bearer, accessToken] = token.split(" ");
        try {
            const decodedToken = verify(accessToken, jsonSecret.secret);
            res.status(200).send({ valid: true });
        } catch (err) {
            res.status(401).send({ valid: false });
        }
    }
}
module.exports = AuthController;