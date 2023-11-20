const database = require('../models')

class alunoController {
  static async getAlunos(req, res) {
    try {
      const alunos = await database.aluno.findAll()
      return res.status(200).json(alunos)
    } catch (e) {
      return res.status(500).json({ Message: e })
    }
  }

  static async getAlunoPorId(req, res) {
    const { id } = req.params
    try {
      const aluno = await database.aluno.findOne({ where: { id: Number(id) } })
      return res.status(200).json(aluno)
    } catch (e) {
      return res.status(500).json({ Message: e })
    }
  }

  static async postAluno(req, res) {
    const novoAluno = req.body
    try {
      const novoAlunoEnviado = await database.aluno.create(novoAluno)
      return res.status(200).json(novoAlunoEnviado)
    } catch (e) {
      return res.status(500).json({ Message: e })
    }
  }

  static async putAluno(req, res) {
    const novosDados = req.body
    const { id } = req.params
    try {
      await database.aluno.update(novosDados, { where: { id: Number(id) } })
      const aluno = await database.aluno.findOne({ where: { id: Number(id) } })
      return res.status(200).json(aluno)
    } catch (e) {
      return res.status(500).json({ Message: e })
    }
  }

  static async deleteAluno(req, res) {
    const { id } = req.params
    try {
      await database.aluno.destroy({ where: { id: Number(id) } })
      return res.status(200).json({
        messagem: `${id} deletado com sucesso`
      })
    } catch (e) {
      return res.status(500).json({ Message: e })
    }
  }
}

module.exports = alunoController
