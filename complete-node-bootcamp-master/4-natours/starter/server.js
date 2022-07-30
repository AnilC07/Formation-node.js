
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' })
// Affiche notre environnement actuelle
// console.log(app.get('env'));
// console.log(process.env.PORT);
const app = require('./app')
// START SERVER

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
