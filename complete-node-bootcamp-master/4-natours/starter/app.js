const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARE GENERAL
app.use(express.json()); // PERMET DE RÉCUPERER LES DONNEES DU BODY


if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // AFFICHE DANS LA CONSOLE LES INFOS SUR LA REQUETE EFFECTUÉ
}
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  console.log('Hello from the middellware');
  next();
});
// MIDDLEWARE QUI SERA EXECUTER AU MILIEU DE CHAQUE REQUETE POUR OBTENIR L'HEURE A LAQUELLE ON FAIT LA REQUETE
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 1) MIDDLEWARE specifique au routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app