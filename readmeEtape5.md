# Étape 5 : Répartition de charge: round-robin et sessions permanentes 
Laetitia Guidetti et Cédric Centeno

## Demonstration du fonctionnement

### Sans l'ajout du cookie
- Mettre en commentaire les lignes permettant la session permanente dans le 
  docker-compose.yml.

  ![commenter_cookie](readmeFiles/Etape5_commenter_cookies.jpg)
- Exécuter le script ```docker-compose-run.sh```, garder le terminal ouvert.
- Dans un navigateur, accéder à localhost, rafraichir plusieurs fois afin de 
  constater sur le terminal ayant exécuté que la charge est distribuées sur des 
  instances différentes.

  ![instances_sans_cookie](readmeFiles/Etape5_requetes_sans_cookie.jpg)

### Avec cookie
- Si les lignes de docker-compose.yml concernant le cookie sont commentée, les 
  décommenter.
- Exécuter le script ```docker-compose-run.sh```, garder le terminal ouvert.
- Dans un navigateur, accéder à localhost, rafraichir plusieurs fois afin de
  constater sur le terminal ayant exécuté que la charge est distribuées sur la 
  même instance.

  ![instances_sans_cookie](readmeFiles/Etape5_requetes_avec_cookie.jpg)
- On peut observer dans le navigateur que le cookie est bien présent.

  ![instances_sans_cookie](readmeFiles/Etape5_cookie_dans_navigateur.jpg)