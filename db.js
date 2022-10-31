// enter the mediation between our data base and our models (our clases) = Object-Relation Mapping (an ORM, sequelize)
const { Sequelize } = require('sequelize')

// path I'm working on
const path = require('path')


// new sequelize object
const db = new Sequelize('my_books', 'esgrid', 'sikahall', {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'my_books.sqlite')
})

module.exports = db