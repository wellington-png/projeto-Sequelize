const { Router } = require('express')
const alunosController = require('../controllers/alunoController')
const autenticado = require("../middlewares/verificarAutenticacao")

const router = Router()
router.use(['/alunos', '/alunos/:id'], autenticado)

router.get('/alunos', alunosController.getAlunos)
router.get('/alunos/:id', alunosController.getAlunoPorId)
router.post('/alunos', alunosController.postAluno)
router.put('/alunos/:id', alunosController.putAluno)
router.delete('/alunos/:id', alunosController.deleteAluno)

module.exports = router
