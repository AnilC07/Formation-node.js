const fs = require('fs') // => FS POUR FILESYSTEM. IL DONNE ACCES AU FONCTION DE LECTURE ET D'ECRITURE DE DONNEE PRINCIPALEMENT
const http = require('http')
const url = require('url')

////////////////////////////////////////////////////////////////////////
// FILESYSTEM


// BLOCKING, SYNCHRONOUS WAY
/*
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8') // VERSION SYNCHRONYSER DE READFILE(), IL PREND DEUX ARGUMENTS: 1-LE CHEMIN D'ACCES AU FICHIER 2-LE TYPE D'ENCODAGE
console.log(textIn) 

const textOut = `This is what we know about the avocado : ${textIn}.\nCreated on ${Date.now()}`
fs.writeFileSync("./txt/output.txt", textOut,'utf8') // VERSION SYNCHRONYSER DE WRITEFILE(). IL PREND LE CHEMIN DU FICHIER OU IL DOIT ECRIRE (LE CREEE S'IL N'EXISTE PAS), LES DONNEES A ECRIRE, LE TYPE D'ENCODAGE 
console.log('File written');
*/

// NON-BLOCKING, ASYNCHRONOUS WAY
/*
fs.readFile('./txt/start.txt','utf-8', (err,data) => {
    console.log(data)
})
console.log('Will read file')
*/

// CALLBACK HELL
/*
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if(err) return console.log(err)

            fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
                console.log(data2)
                fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
                    console.log(data3);
                    fs.writeFile(`./txt/final.txt`,`${data2}\n${data3}`, 'utf-8', (err) => {
                        console.log('Your file has been written');
                    })
                })
            })
        })
            console.log('Will read file')
            */

////////////////////////////////////////////////////////////////////////
// SERVER CONFIG, ROUTING

// Il ne sera appelé q'une seul fois dans tout notre code

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)


const server = http.createServer((req, res) => {
    // console.log(req.url)
    const pathName = req.url;
    if (pathName === '/overview') {
        res.end('THIS is OVERVIEW') // => Facons la plus simple de retourner une reponse
    } else if (pathName === '/products') {
        res.end('THIS is PRODUCTS') // => Facons la plus simple de retourner une reponse
    } else if (pathName === '/API') {
        res.writeHead(200, {
            'ContentType': 'application/json'
        })
        res.end(data);
    } else {
        res.writeHead(404, {
            'ContentType': 'text/html',
            'my-own-header': 'hello-world'
        })
        res.end('<h1>Page not FOUND</h1>') // => Facons la plus simple de retourner une reponse
    }
})

server.listen(3000, '127.0.0.1', () => {
    console.log('Server has been started on port 3000')
})