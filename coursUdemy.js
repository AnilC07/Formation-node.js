/* Qu'est-ce que Node.js 

****************************************************************
Definition : Node.js est un environnement d'execution javascript construit sur le moteur V8 open source de Google
****************************************************************
- Node.js nous permet d'utiliserJavaScript du cote serveur du developpement web afin de creer des applications réseau 
  rapide et evolutive pour alimenter le backend
- Node.js est basé basé sur un model d'E/S non bloquant, ce qui le rend tres leger et efficace
- Parfait pour creer des applications web rapide et evolutive gourmande en donnees
- Parfait pour creer une API avec de preference une base de donnee NoSQL non relationnelle come MongoDB

Pour lancer un fichier.js dans le terminal la commande est la suivante : node fichier.js
Faire des require pour appeler un module, par exemple : require('fs') qui est un module de node

****************************************************************
Synchrone signifie que chaque instruction est traitée l'une après l'autre ligne par ligne
Exemple:

(1) const fs = require('fs')                                                      (1) On appelle le module
(2) const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')                    (2) Puis on lit le fichier
(3) console.log(textIn)                                                           (3) Et enfin affiche le contenu

Peut etre un probleme si une ligne de code est particulierement longue a s'executer. Le Synchrone est donc bloquant.

Asynchrone signifie que meme si une ligne du code est lente, elle ne va pas empecher le reste du programme de fonctionner.
Ce qui suit va s'executer pendant que la ligne precedente tourne en arriere plan. L'Asynchrone est non-bloquant
Exemple:

(1) const fs = require('fs')                                                      (1) On appelle le module
(3) const textIn = fs.readFile('./txt/input.txt', 'utf-8', (err,data)=>{          (3) On lance la fonction en asynchrone. Elle prend une callback qui va executer la tache en arriere plan
  console.log(data)                                                               
})    
(2) console.log('Reading file...')                                                 (2) En attendant que la fonction tourne en arriere plan on va afficher notre console.log
****************************************************************
Pourquoi utilise-ton autant de callback ? 
1 - On a qu'un seul thread (un block d'execution) ou toute les requete se font les un a la suite des autres.
2 - La callback va utiliser un thread de background ou il va excuter sa tache en arriere plan sans bloquer le reste des utilisateurs puis une fois fini
    il va revenir sur le thread pour executer son truc.
3 - L'UTILISATION DU CALLBACK NE REND PAS LA FONCTION AUTOMATIQUEMENT ASYNCHRONE
****************************************************************
LE ROUTAGE
****************************************************************
LES API


*/

