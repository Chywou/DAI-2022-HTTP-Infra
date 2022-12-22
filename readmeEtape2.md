# Etape 2 : Serveur HTTP dynamique avec express.js
Laetitia Guidetti et Cédric Centeno

## Description

Cette partie contient un serveur HTTP dynamique permettant d'afficher une page 
web différente pour chaque nouvelle requête client. Nous utilisons le framework 
Express.js pour simplifier l'implémentation de la communication client-serveur. 
Une page contient des données au format JSON généré aléatoirement via la 
bibliothèque Chance.js. Ses données représentent des chats et pour chaque requête, 
le serveur va générer un nouveau contenu pour la page web.

Le serveur est dans un container docker qui est mappé du côté utilisateur au port 
9091 et port 2022 pour le serveur (le serveur est configuré pour écouter les 
requêtes clients à ce port). 

### Contenu du dossier ```docker-images/Etape2_Express-image ```
- build-image.sh : script contenant la commande permettant de créer l'image docker
- run-container.sh : script contenant la commande permettant de lancer l'image docker (à modifier si on souhaite modifié le port de l'utilisateur)
- Dockerfile : configuration souhaitée de l'image docker
- src : dossier contenant la configuration ainsi que les dépendances de 
  l'application node.js.

## Commande pour lancer le serveur dynamique (node js)

Il faut tout d'abord accéder au chemin ```docker-images/Etape2_Express-image``` afin
d'accéder aux outils pour utiliser le serveur http dynamique.

- Construire l'image docker : exécuter le script ```build-image.sh```.
- Lancer le container contenant l'image du serveur : ```run-container.sh```.

## Accès à la page web

Après avoir construit l'image et lancé le serveur grâce à Docker, il est possible
d'accéder à la page web en entrant l'adresse suivante dans un navigateur :
```127.0.0.1:9091```.
Vous pourrez constater qu'à chaque nouvelle requête, une nouvelle page de 'Cats' 
est générée.

### Connection manuelle
#### Prérequis
- telnet

Il est possible de se connecter manuellement, pour cela, il faut que le 
serveur soit à l'écoute. Il faut ensuite entrer en ligne de commande les 
instructions suivantes :
- se connecter au serveur : ```telnet localhost 9091``` 
- requête GET: ```GET / HTTP/1.0```


## Fonctionnement de l'application web
Nous avons appelé notre application **Cats**, la version est 0.1.0.
À chaque nouvelle requête client, notre serveur va générer une liste d'un nombre 
aléatoire de chat, ayant des attributs aussi aléatoirement générés. Cette liste 
de chats sera envoyée au client en format json à travers HTTP.


## Configuration

### Dockerfile
Le fichier contient les lignes suivantes :

```FROM node:18.12.1```
- Importe l'image docker de node js (version 18.12.1) avec la commande FROM.
  Source : https://hub.docker.com/_/node

```COPY src /opt/app```
- Copier les fichiers locaux contenant l'implémentation du site web dans le dossier d'accueil du serveur

```CMD ["node", "/opt/app/index.js"]```
- Commande qui sera exécutée lorsqu'un container est lancé sur la base de notre 
  image afin d'exécuter le script index.js.


