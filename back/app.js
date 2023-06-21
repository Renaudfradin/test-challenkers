const express = require("express");
const axios = require("axios");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.get('/', async (req, res, next) => {
  let response = {}
  try {
    response = await axios.get('https://kaamelott.chaudie.re/api/random');
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: 'Bad request',
      errors:[{
        message: 'Error'
      }],
    })
  }
  return res.status(200).json({
    statusCode: 200,
    citation: response.data.citation,
    message:"Bonjour bienvenue sur l'api Challenkers develloper pour le test."
  })
})

module.exports = app;