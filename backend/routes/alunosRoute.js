const { Router } = require('express')
const cursosController = require('../controllers/alunoController')

const router = Router()

router.get('/alunos', cursosController.getAlunos)
router.get('/alunos/:id', cursosController.getAlunoPorId)
router.post('/alunos', cursosController.postAluno)
router.put('/alunos/:id', cursosController.putAluno)
router.delete('/alunos/:id', cursosController.deleteAluno)

module.exports = router
