# Etape 1 : Serveur static HTTP  avec apache http, php
Laetitia Guidetti et Cédric Centeno

## Description

Le serveur permet d'afficher une simple page web. Un modèle de page web est 
utilisé et adapté afin de pouvoir afficher le contenu souhaité pour cette étape du 
laboratoire.

Un serveur http statique afin de pouvoir garder la configuration voulue lorsque 
le container du serveur est lancé. 

Le container est mapé du côté utilisateur au port 9090 et port 80 (HTTP) 
pour le serveur.

### Contenu 
- build-image.sh : automatise la commande permettant de créer l'image docker.
- run-container.sh : automatise la commande permettant de lancer l'image docker.
- Dockerfile : configuration souhaitée de l'image docker
- apache-php-image : contient la configuration de la page web affichée par le 
  serveur web à l'adresse racine.

## Commande pour lancer le serveur static

En premier lieu, ce rendre dans l'emplacement du projet, 
puis dans ```http-static\docker-images``` afin d'accéder aux outils pour utiliser 
le serveur http statique.

- Construire l'image docker : exécuter le script ```build-image.sh```. 
- Lancer le container contenant l'image du serveur : ```run-container.sh```.

## Accès à la page web

Après avoir construit l'image et lancé le serveur sur Docker, il est possible 
d'accéder à la page web en entrant l'adresse suivante dans un navigateur : ```127.
0.0.1/9090```.

## Configuration

### Dockerfile
- Importer le contexte de l'image docker (ici php:7.2-apache) avec la commande FROM.
- Copier les fichiers locaux contenant l'implémentation de la page web dans les 
  dossiers d'implémentation http du serveur web.

### Fichiers de configurations apache

Le contenu requis par le serveur virtuel est spécifié par DocumentRoot. Sur 
Ubuntu, le serveur virtuel est setup pour chercher le contenu du chemin suivant 
/var/www, il faut donc mettre donner ce chemin au DocumentRoot.

Comme nous le serveur est utilisé pour héberger une page we, le chemin que nous 
utilisons est ```/var/www/html/```.

### Source template page web
https://startbootstrap.com/theme/stylish-portfolio