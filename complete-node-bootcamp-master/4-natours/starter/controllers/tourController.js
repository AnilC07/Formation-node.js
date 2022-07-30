const fs = require('fs');

// ON LIT LE FICHIER QUI CONTIENTS LES DATAS DE MANIERES SYNCHRONE ET ON LES AFFECTE A LA CONSTANTE EN LES PARSANT AU FORMAT JSON
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
);

// Creation d'un middleware (generale pour les routes qui prennent un id ) qui va checker si l'id est valide sur l'url
exports.checkId = (req, res, next, value) => {
  console.log('tour id : ' + value);
  if (req.params.id * 1 > tours.length) {
    // Le return est tres important pour stopper le code en cas d'erreur, dans le cas contraire on aura l'erreur et ca va continuer le reste du code
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: ' Missing name or price',
    });
  }
  next()
}


exports.getAllTours = (req, res) => {
  // console.log(req.requestTime)
  // ON DEMANDE À RENVOYER TOUTES LES DONNEES DANS UN FORMAT JSON
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime, // PROVIENT DU MIDDLEWARE
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  // POSIBILITÉ D'EN DÉFINIR PLUSIEURS  COMME ('/API/V1/TOURS/:ID/:X/:Y?)' '?' LE REND OPTIONNEL
  // RECUPERE DANS UN OBJET TOUS LES PARAMETRES DE L'URL
  const id = Number(req.params.id); // ATTRIBUT LE PARAMETRE ID A UNE CONSTANTE EST LE CONVERTIT EN NOMBRE
  const tour = tours.find((el) => el.id === id); // FIND() SUR LE TABLEAU. LA FONCTION RETOURNE TRUE OU FALSE. SEUL L'ELEMENT AYANT L'ID EGALE SERA RETOURNÉ
  // SOLUTION 1: VERIFIER SI L'ID DEMANDER EST PLUS GRAND QUE LA LONGUEUR DU TABLEAU
  // if(id > tours.length){

  // SOLUTION 2:VERIFIER S'IL EXISTE UN "TOUR" (S'IL N'EXISTE PAS "TOUR" EST "UNDEFINED")
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1; // ON DEFINIT UN NOUVELLE ID POUR NOTRE NOUVELLE DESTINATION

  // ON CONCATENE L'OBJET CONTENANT LE NOUVEL ID À L'OBJET RECUPERÉ DANS REQ.BODY
  const newTour = Object.assign({
      id: newId,
    },
    req.body
  );

  // AJOUTE L'OBJET NEWTOUR AU TABLEAU "TOURS"
  tours.push(newTour);

  // REECRIS SUR LE FICHIER CONTENANT LES DATAS AVEC LES NOUVELLES DATAS
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      }); // => 200 -> OK, 201 -> créée
    }
  );
};

exports.updateTour = (req, res) => {
  // ON REGARDE SI LE TOURS À METTRE À JOUR EXISTE DANS LE TABLEAU
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(201).json({
    status: 'success',
    data: {
      tour: '< Updated tour here...>',
    },
  }); // => 201 -> créée
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null, // -> mettre la data a la valeur "null" revient a la supprimer
  }); // => 204 -> effacer
};