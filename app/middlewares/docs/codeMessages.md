| Numéro code | Message                              | Controller                      | Error |
| ----------- | ------------------------------------ | ------------------------------- | ----- |
| 1           | This favorite already exists!       | favoriteController.addFavorite | oui   |
| 2           | Favorite object error               | favoriteController.addFavorite | oui   |
| 100           | Recipe added to favorites           | favoriteController.addFavorite | non   |
| 4           | Can not find favorite with id + meal_id | favoriteController.deleteFavorite | oui   |
| 101          | Recipe delete to favorite           | favoriteController.deleteFavorite | non   |
| 6           | Fields of meal are not complete     | scheduleController.addMealSchedule | oui   |
| 7           | Schedule don't exist.               | scheduleController.addMealSchedule | oui   |
| 102           | Meal add to schedule                 | scheduleController.addMealSchedule | non   |
| 9           | Can not find meal with id + meal_id  | scheduleController.deleteSchedule | oui   |
| 103          | Meal delete to schedule              | scheduleController.deleteSchedule | non   |
| 104         | Profile has been modified            | userController.modifyUser       | non   |
| 105          | User data got                        | userController.getOneUser       | non   |
| 106          | User delete                          | userController.deleteUser       | non   |
| 14          | User already exists                  | userController.signUp           | oui   |
| 107         | User has been create                 | userController.signUp           | non   |
| 16          | Credentials are invalid              | userController.login            | oui   |
| 108          | You have been logged in              | userController.login            | non   |
| 18          | Token missing. Logout failed.        | userController.logout           | oui   |
| 109          | Logout successful                    | userController.logout           | non   |
