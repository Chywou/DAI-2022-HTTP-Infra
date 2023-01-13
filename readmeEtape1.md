# Étape 1 : Serveur statique HTTP avec apache
Laetitia Guidetti et Cédric Centeno

## Description

Cette partie contient un serveur HTTP statique permettant d'afficher une simple page web.
Pour cela, un modèle de page web est
utilisé et adapté pour un rendu plus propre.

Le serveur est dans un container docker qui est mappé du côté utilisateur au port 9090 et port 80 (HTTP)
pour le serveur.

### Contenu du dossier ```docker-images/Etape1_Apache-image ```
- build-image.sh : script contenant la commande permettant de créer l'image docker
- run-container.sh : script contenant la commande permettant de lancer l'image docker (à modifier si on souhaite modifié le port de l'utilisateur)
- Dockerfile : configuration souhaitée de l'image docker
- apache-config : dossier contenant le contenu du site web affiché par le 
  serveur web (à modifier si on souhaite modifier le site)

## Commande pour lancer le serveur statique

Il faut tout d'abord accéder au chemin ```docker-images/Etape1_Apache-image``` afin 
d'accéder 
aux outils pour utiliser 
le serveur http statique.

- Construire l'image docker : exécuter le script ```build-image.sh```.
- Lancer le container contenant l'image du serveur : ```run-container.sh```.

## Accès à la page web

Après avoir construit l'image et lancé le serveur grâce à Docker, il est possible
d'accéder à la page web en entrant l'adresse suivante dans un navigateur :
```127.0.0.1:9090```.

## Configuration

### Script

Script build-image.sh : créer l'image docker
- ```docker build --tag http_centeno_guidetti/http_server .```
  - ```docker build``` : construit une image
  - ```--tag http_centeno_guidetti/http_server``` : donne un nom à l'image
  - ```.``` : le contexte, ici le répertoire courant

Script run-container-sh : lance le container
- ```docker run -p 9090:80 -d http_centeno_guidetti/http_server``` : la commande présente dans le script
  - ```docker run``` : lance un container
  - ```-p 9090:80``` : mapping des ports du container
  - ```-d``` : lance le container en arrière-plan
  - ```http_centeno_guidetti/http_server``` : l'image utilisée pour construire le container

### Dockerfile
Le fichier contient les lignes suivantes :

```FROM httpd:2.4```
- Importe l'image docker (ici httpd:2.4) avec la commande FROM.
  Source : https://hub.docker.com/_/httpd

`EXPOSE 80`
- Expose le port 80 du container (ceci est déjà réalisé par l'option -p 
de la commande docker-run, mais est ajouté à titre informatif)


```COPY apache-php-image/ /usr/local/apache2/htdocs/```
- Copie les fichiers locaux contenant l'implémentation du site web dans le dossier d'accueil du serveur

### Fichiers de configurations apache

Le contenu requis par le serveur virtuel est spécifié par DocumentRoot. Pour apache, il s'agit par défaut du dossier
```/usr/local/apache2/htdocs```. La page web de base du serveur est le fichier index.html qu'il trouve dans ce dossier.


### Source template page web
https://startbootstrap.com/theme/stylish-portfolio