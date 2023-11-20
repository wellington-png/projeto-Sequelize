const { Router } = require('express')
const cursosController = require('../controllers/cursoController')

const router = Router()

router.get('/cursos', cursosController.getCursos)
router.get('/cursos/:id', cursosController.getCursoPorId)
router.post('/cursos', cursosController.postCurso)
router.put('/cursos/:id', cursosController.putCurso)
router.delete('/cursos/:id', cursosController.deleteCurso)
router.get('/alunoscurso/:id', cursosController.getAlunosPorCurso)

module.exports = router
