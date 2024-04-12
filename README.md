# Projet Ynov - Développer pour le Cloud
## Tom DUPUY - M1 Dev Web
___

## Version de Node

v20.11.0

## Comment lancer le projet

À la racine du projet, exécutez les commandes suivantes :
```npm i && npm run dev```

## Run des tests

À la racine du projet, exécutez la commande suivante :
```npm run test```

## Interfaces disponibles

- `/` : Page principale avec un menu de redirection
- `/ui/movies[/...]` : Interfaces pour interagir avec l'API des films (tous, recommandés, top rated, détails d'un film)
- `/ui/sign-in` et `/ui/sign-up` : Pages d'authentification avec Material UI
- `/swagger` : Documentation de l'API

## Réalisation actuelle

### Partie Backend

- Définition des API du cahier des charges
- Swagger opérationnel avec documentation de toutes les routes API (sauf pour l'authentification qui n'est pas encore en
  place)
- Lien fonctionnel entre le Backend et la base de données MongoDB
    - Exemples de requêtes GET / POST / PUT / DELETE pour les likes et les utilisateurs

### Partie Frontend React

- Liste des écrans qui consomment l'API backend : /ui/movies[/*]
- Utilisation du framework graphique Material UI sur les pages de sign-in et sign-up

### Tests Unitaires

- Tests unitaires implémentés pour le frontend et le backend
- Tests sur les requêtes vers l'API externe et les interactions avec la base de données MongoDB

### CI
Lors de chaque push sur le répo distant github, des jobs s'executent via [CircleCI](https://app.circleci.com).
Les étapes communes :
- build du projet
- run des tests

En cas de push sur la branche main ou la branche develop, il y a respectivement un déploiement sur l'environnement de prod ou de preview. Suite à chaque déploiement, on peut penser à réaliser un test de charge, et même des tests de vérification.

### CD
Le déploiement se fait via l'outil [Vercel](https://vercel.com/). Le déploiement, que ce soit pour le prod ou uniquement la preview, est géré par CircleCI _(cf. point ci-dessus)_.
Le lien vers l'environnement de prod, accessible publiquement : https://project-gray-eta.vercel.app/


## Objectifs à venir

- Factoriser le code pour réduire la duplication, notamment en créant un service pour les requêtes vers l'API de TMDB
- Implémenter l'authentification
- Ajouter une fonctionnalité de recherche sur le site
- Personnaliser l'app car très basique pour le moment

## Note

Suite à la démo du 11/04/2024, le lien avec la BDD sur les environnements déployés (prod et preview) ne se fait pas, et aucune requête à l'api interne ne fournit de données.

Faisant du Kotlin/Angular en entreprise, ce cours m'a permis de découvrir une nouvelle stack technique.