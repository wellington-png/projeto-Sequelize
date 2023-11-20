const database = require('../models')

class cursoController {
  static async getCursos(req, res) {
    try {
      const cursos = await database.curso.findAll()
      return res.status(200).json(cursos)
    } catch (e) {
      return res.status(500).json({ Message: e })
    }
  }

  static async getCursoPorId(req, res) {
    const { id } = req.params
    try {
      const curso = await database.curso.findOne({ where: { id: Number(id) } })
      return res.status(200).json(curso)
    } catch (e) {
      return res.status(500).json({ Message: e })
    }
  }

  static async postCurso(req, res) {
    const novoCurso = req.body
    try {
      const novoCursoEnviado = await database.curso.create(novoCurso)
      return res.status(200).json(novoCursoEnviado)
    } catch (e) {
      return res.status(500).json({ Message: e })
    }
  }

  static async putCurso(req, res) {
    const novosDados = req.body
    const { id } = req.params
    try {
      await database.curso.update(novosDados, { where: { id: Number(id) } })
      const curso = await database.curso.findOne({ where: { id: Number(id) } })
      return res.status(200).json(curso)
    } catch (e) {
      return res.status(500).json({ Message: e })
    }
  }

  static async deleteCurso(req, res) {
    const { id } = req.params
    try {
      await database.curso.destroy({ where: { id: Number(id) } })
      return res.status(200).json({
        messagem: `${id} deletado com sucesso`
      })
    } catch (e) {
      return res.status(500).json({ Message: e })
    }
  }

  static async getAlunosPorCurso(req, res) {
    const { id } = req.params
    try {
      const alunos = await database.aluno.findAll({
        where: { cur_id: Number(id) }
      })
      return res.status(200).json(alunos)
    } catch (e) {
      return res.status(500).json({ Message: e })
    }
  }
}

module.exports = cursoController
