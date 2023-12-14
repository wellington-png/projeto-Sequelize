const database = require('../models')

class alunoController {
  static async getAlunos(req, res) {
    try {
      const alunos = await database.aluno.findAll({
        include: [{
          model: database.curso,
          attributes: ['curso'] // Specify the attributes you want to include from the curso model
        }]
      });

      return res.status(200).json(alunos);
    } catch (e) {
      return res.status(500).json({ message: e.message || 'Internal Server Error' });
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
    const novoAluno = req.body;
    try {
      const existingAluno = await database.aluno.findOne({
        where: { email: novoAluno.email }
      });

      if (existingAluno) {
        return res.status(400).json({ Message: 'Email already exists' });
      }

      let novoAlunoEnviado = await database.aluno.create(novoAluno);
      novoAlunoEnviado = await database.aluno.findOne({
        where: { id: novoAlunoEnviado.id },
        include: [{ model: database.curso, attributes: ['curso'] }]
      });
      return res.status(200).json(novoAlunoEnviado);
    } catch (e) {
      return res.status(500).json({ Message: e.message || 'Internal Server Error' });
    }
  }

  static async putAluno(req, res) {
    const novosDados = req.body;
    const { id } = req.params;
    try {
      const existingAluno = await database.aluno.findOne({
        where: { email: novosDados.email, id: { [database.Sequelize.Op.not]: Number(id) } }
      });

      if (existingAluno) {
        return res.status(400).json({ Message: 'Email already exists' });
      }

      await database.aluno.update(novosDados, { where: { id: Number(id) } });
      const aluno = await database.aluno.findOne({ where: { id: Number(id) }, include: [{ model: database.curso, attributes: ['curso'] }] });
      return res.status(200).json(aluno);
    } catch (e) {
      return res.status(500).json({ Message: e.message || 'Internal Server Error' });
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
