const bodyParser = require('body-parser')
const cursos = require('./cursosRoute')
const alunos = require('./alunosRoute')

module.exports = app => {
  app.use(bodyParser.json())
  app.use(cursos)
  app.use(alunos)

  app.get('/', (req, res) => {
    res.status(200).send({ message: 'Bem-vindo!' })
  })
}
