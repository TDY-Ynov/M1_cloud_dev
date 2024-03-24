# Projet Ynov - Développer pour le Cloud
## Tom DUPUY - M1 Dev Web
___

## Version de Node

v20.11.0

## Comment lancer le projet

À la racine du projet, exécutez les commandes suivantes :
```npm i && npm run dev```

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

## Objectifs à venir

- Factoriser le code pour réduire la duplication, notamment en créant un service pour les requêtes vers l'API de TMDB
- Implémenter l'authentification pour finaliser le système de likes
- Ajouter une fonctionnalité de recherche sur le site
- Personnaliser l'app car très basique pour le moment

## Note

Faisant du Kotlin/Angular en entreprise, je découvre quelque peu la stack sur laquelle ce cours est réalisé