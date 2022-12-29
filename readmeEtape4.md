# Étape 4 : Requête Ajax avec jQuery
Laetitia Guidetti et Cédric Centeno

## Description

Cette partie contient un serveur HTTP possèdent une page web qui s'actualise toutes les secondes.

Pour cela, nous utilisons la librairie jQuery.

### Contenu du dossier ```docker-images/Etape4_Ajax_image```

- build-image.sh : script contenant la commande permettant de créer l'image docker
- Dockerfile : configuration souhaitée de l'image docker
- apache-config : dossier contenant le contenu du site web affiché par le
  serveur web et le script chargé de réalisé l'actualisation toutes les secondes.

## Commande pour lancer le serveur

Le serveur est un service du reverse_proxy installé lors de l'étape 3, il nécessite son lancement pour fonctionner correctement
(il utilise le JSON généré par l'étape 2). Par conséquent, son lancement se fait via le lancement du reverse proxy, détails : [readmeEtape3.md](readmeEtape3.md)


## Accès à la page web

Après avoir lancé le reverse proxy, il est possible
d'accéder à la page web en entrant l'adresse suivante dans un navigateur :
```localhost```.

## Configuration

### Dockerfile
Le fichier contient les lignes suivantes :

```FROM httpd:2.4```
- Importe l'image docker (ici httpd:2.4) avec la commande FROM.
  Source : https://hub.docker.com/_/httpd

```COPY apache-php-image/ /usr/local/apache2/htdocs/```
- Copier les fichiers locaux contenant l'implémentation du site web dans le dossier d'accueil du serveur

### Script

Le script permettant la mise à jour dynamique est
[docker-images/Etape4_Ajax_image/apache-config/js/cats.js](docker-images/Etape4_Ajax_image/apache-config/js/cats.js)

```function loadCats()```
- Une fonction récupérant un JSON généré par l'étape 2
- Elle récupère le premier chat (s'il y en a 1)
- Puis le fourni à la balise portant l'id "cats"

```setInterval(loadCats, 1000)```
- Apple la fonction loadCats toutes les 1000ms (toutes les secondes).
