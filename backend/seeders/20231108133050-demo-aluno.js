'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentTime = new Date()
    await queryInterface.bulkInsert(
      'alunos',
      [
        {
          nome: 'Jéssica',
          email: 'jessica@aluno.ifpi.br',
          cur_id: 1,

          createdAt: currentTime,
          updatedAt: currentTime
        },

        {
          nome: 'Gabriel',
          email: 'gabriel@aluno.ifpi.br',
          cur_id: 2,

          createdAt: currentTime,
          updatedAt: currentTime
        },

        {
          nome: 'Luana',
          email: 'luana@aluno.ifpi.br',
          cur_id: 2,
          createdAt: currentTime,
          updatedAt: currentTime
        },

        {
          nome: 'Sabrina',
          email: 'sabrina@aluno.ifpi.br',
          cur_id: 3,

          createdAt: currentTime,
          updatedAt: currentTime
        },

        {
          nome: 'Leandro',
          email: 'leandro@aluno.ifpi.br',
          cur_id: 1,

          createdAt: currentTime,
          updatedAt: currentTime
        }
      ],
      {}
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alunos', null, {})
  }
}
