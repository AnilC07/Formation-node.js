const fs = require('fs'); // => FS POUR FILESYSTEM. IL DONNE ACCES AU FONCTION DE LECTURE ET D"ECRITURE DE DONNEE PRINCIPALEMENT
const http = require('http');
// const { parse } = require("node:path/posix")
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

////////////////////////////////////////////////////////////////////////
// FILESYSTEM

// BLOCKING, SYNCHRONOUS WAY
/*
const textIn = fs.readFileSync("./txt/input.txt", "utf-8") // VERSION SYNCHRONYSER DE READFILE(), IL PREND DEUX ARGUMENTS: 1-LE CHEMIN D"ACCES AU FICHIER 2-LE TYPE D"ENCODAGE
console.log(textIn) 

const textOut = `This is what we know about the avocado : ${textIn}.\nCreated on ${Date.now()}`
fs.writeFileSync("./txt/output.txt", textOut,"utf8") // VERSION SYNCHRONYSER DE WRITEFILE(). IL PREND LE CHEMIN DU FICHIER OU IL DOIT ECRIRE (LE CREEE S"IL N"EXISTE PAS), LES DONNEES A ECRIRE, LE TYPE D"ENCODAGE 
console.log("File written")
*/

// NON-BLOCKING, ASYNCHRONOUS WAY
/*
fs.readFile("./txt/start.txt","utf-8", (err,data) => {
    console.log(data)
})
console.log("Will read file")
*/

// CALLBACK HELL
/*
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
    if(err) return console.log(err)

            fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
                console.log(data2)
                fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
                    console.log(data3)
                    fs.writeFile(`./txt/final.txt`,`${data2}\n${data3}`, "utf-8", (err) => {
                        console.log("Your file has been written")
                    })
                })
            })
        })
            console.log("Will read file")
            */

////////////////////////////////////////////////////////////////////////
// SERVER CONFIG, ROUTING

// Il ne sera appelé q"une seul fois dans tout notre code
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
// console.log(dataObj)

const slugs = dataObj.map((el) =>
  slugify(el.productName, { lower: true, replacement: '-' })
);
console.log(slugs);
console.log(slugify('Fresh Avocados', { lower: true, replacement: '-' }));

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  console.log(query.id);

  // Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      ContentType: 'text/html',
    });

    const cardHTML = dataObj
      .map((element) => replaceTemplate(tempCard, element))
      .join('');
    // console.log(cardHTML)

    const output = tempOverview.replace('{%PRODUCT_CARD%}', cardHTML);

    res.end(output); // => Facons la plus simple de retourner une reponse

    // Product Page
  } else if (pathname === '/products') {
    res.writeHead(200, {
      ContentType: 'text/html',
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API Page
  } else if (pathname === '/API') {
    res.writeHead(200, {
      ContentType: 'application/json',
    });
    res.end(data);

    // PAGE NOT FOUND
  } else {
    res.writeHead(404, {
      ContentType: 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page not FOUND</h1>'); // => Facons la plus simple de retourner une reponse
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server has been started on port 3000');
});
