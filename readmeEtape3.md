# Etape 3 : Reverse proxy avec Traefik

## Description

Cette partie contient un docker compose et un reverse proxy Traefik.

Docker compose est un outil qui permet de définir et de lancer plusieurs containers docker. 
Un fichier YAML (```docker-compose.yml ```) est utilisé pour configurer les différents services, le tout est lançable avec
une seule commande.

Traefik est un reverse proxy et un load balancer (équilibreur de charges).

Un reverse proxy est ici un dispositif se situant entre les requêtes clientes et les serveurs web. Il s'agit d'un niveau
d'abstraction qui permet de contrôler la fluidité du trafic et permet de contrôler les requêtes. 

Traefik est le seul conteneur accessible depuis l'extérieur, il est donc la seule entrée possible pour accéder aux
serveurs webs. La sécurité est par conséquent renforcée, car la seule entrée est contrôlée et facilement configurable.

Un load balancer permet de répartir le trafic sur plusieurs serveurs. Cela permet d'augmenter la fiabilité et la capacité
d'un service. Si un serveur tombe, sa charge est répartie sur les autres serveurs disponibles.

### Contenu du dossier ```docker-images/Etape3_Reverse_Proxy```

- docker-compose-run.sh : script contenant la commande permettant de construire les images et de démarrer les containers
- docker-compose.yml : fichier définissant les services composants l'application exécutable dans un environnement isolé

## Commande pour lancer l'infrastructeur

#### Avec le reverse proxy
Il faut tout d'abord accéder au chemin ```docker-images/Etape3_Reverse_Proxy``` afin
d'accéder au docker-compose.

- Construire les images docker et lancer les containers : exécuter le script ```docker-compose-run.sh```.

#### Sans le reverse proxy

Il faut tout d'abord accéder au chemin ```docker-images/Etape3_Reverse_Proxy/Without_Traefik``` afin
d'accéder au docker-compose.

- Construire les images docker et lancer les containers : exécuter le script ```docker-compose-run.sh```.


## Accès aux pages Web

#### Avec le reverse proxy

Après avoir construit les images et lancé les serveurs grâce à Docker, il est possible d'accéder au serveur statique à l'adresse :
```localhost``` et accéder au serveur dynamique à l'adresse ```localhost/api```.
La version avec reverse proxy utilise le serveur statique de l'étape 4.

#### Sans le reverse proxy

Après avoir construit les images et lancé les serveurs grâce à Docker, il est possible d'accéder au serveur statique à l'adresse :
```127.0.0.1:9090``` et accéder au serveur dynamique à l'adresse ```127.0.0.1:9091```.
La version sans reverse proxy utilise le serveur statique de l'étape 1.

## Multiple instances

Afin de vérifier qu'il y a bien plusieurs instances de nos services répondant aux différentes requêtes 
avec Round-Robin (par défaut), on affiche le log des requêtes dynamiques.
Voici l'extrait d'un test : 

```
web-infrastructure-dynamic_server-3  | sample text
web-infrastructure-dynamic_server-1  | sample text
web-infrastructure-dynamic_server-2  | sample text
web-infrastructure-dynamic_server-3  | sample text
web-infrastructure-dynamic_server-1  | sample text
web-infrastructure-dynamic_server-2  | sample text
web-infrastructure-dynamic_server-3  | sample text
web-infrastructure-dynamic_server-1  | sample text
web-infrastructure-dynamic_server-2  | sample text
web-infrastructure-dynamic_server-3  | sample text
web-infrastructure-dynamic_server-1  | sample text
```

## Configuration

### Script

Script docker-compose-run.sh :

Le script exécute la commande suivante : ```docker-compose -p web-infrastructure up```.
Cette commande crée et lance un container en spécifiant le nom du projet 
(web-infrastructure).


### docker-compose

Le docker compose comprend 3 services :

#### reverse-proxy
Nous utilisons **Traefik** comme reverse proxy. La configuration comprend :
- l'image Trafik à utiliser 
- la commande permettant d'activer l'interface utilisateur web, ainsi que 
  d'écouter docker
- le mapping des ports utilisés
- dans volume, lier le montage du fichier correspondant à la socket Unix que 
  Docker daemon écoute par défaut. Docker daemon écoute les requêtes API et les 
  les transmet au volume, ici la socket.

#### static_server
Le serveur statique que nous avons créé dans [**l'étape 4**](readmeEtape4.md).
Il faut préciser :
- le chemin d'exécution du build de l'image du serveur statique.
- le nombre de containers qui devraient fonctionner en tout temps (replicas).
- le port d'écoute du container.
- le label précisant le domaine du serveur, ici localhost.

#### dynamic_server
Le serveur dynamique que nous avons créé dans [**l'étape 2**](readmeEtape2.md).
Il faut préciser :
- le chemin d'exécution du build de l'image du serveur dynamique.
- le nombre de containers qui devraient fonctionner en tout temps (replicas).
- le port d'écoute du container.
- les labels :
  - le domaine ainsi que le chemin (localhost/api).
  - créer un middleware afin de retirer ```api``` de la requête URL, car le 
    serveur dynamique est configuré pour écouter sur localhost, api est utilisé 
    par le reverse proxy pour diriger les requêtes.

