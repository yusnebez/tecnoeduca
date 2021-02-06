const jwt = require('jsonwebtoken')
const teacherModel = require('../models/teacher.model')

function authUser (req, res, next) {
    
    if (!req.headers.token) {
      res.status(403).json({ error: 'No Token found' })
    } else {
      jwt.verify(req.headers.token, process.env.SECRET, (err, token) => {
        if (err) { res.status(403).json({ error: 'Token not valid' }) }
  
        teacherModel.findOne({ email: token.email })
          .then(user => {
            res.locals.user = user
            next()
          })
          .catch(function (error) {
            console.error("Error al crear el alumno")
        })
      })
    }
  }

  function handleError (err, res) {
    return res.status(400).json(err)
  }

  module.exports = {
    authUser,
    handleError 
  }
  