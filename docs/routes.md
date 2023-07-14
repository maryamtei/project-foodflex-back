Voici la description des différentes routes du backend sous forme de tableau :

| VERBE | ROUTE                                 | DESCRIPTION                                            |
|-------|---------------------------------------|--------------------------------------------------------|
| POST  | /contact                              | Envoie le formulaire de contact                         |
| GET   | /mettre route http dbMeal              | Affiche les recettes (nom, image, description)         |
| GET   | /mettre route http dbMeal/:id-recette  | Affiche la description d'une recette spécifique         |
| GET   | /planning/:id-semaine                  | Affiche le planning de la semaine spécifiée             |
| PATCH | /planning/:id-semaine                  | Modifie le planning de la semaine spécifiée             |
| POST  | /signup                               | Crée le profil de l'utilisateur                        |
| POST  | /login                                | Authentifie l'utilisateur et crée une session          |
| GET   | /profil/:id                             | Affiche le profil de l'utilisateur                     |
| PATCH | /profil/:id                              | Modifie le profil de l'utilisateur                     |
| DELETE| /profil/:id                              | Supprime le profil de l'utilisateur                   |
| GET   | /profil/favori                        | Affiche les recettes favorites de l'utilisateur        |
| POST  | /profil/favori                        | Ajoute une recette favorite à l'utilisateur            |

Ces routes représentent les différentes fonctionnalités de votre application backend. Assurez-vous de les implémenter correctement en fonction de vos besoins et de votre structure de projet.