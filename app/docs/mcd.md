# MCD 

Favori : code_favori, idDbMeal, name, image, position
has, 0N User, 11 Favori
:

:
User : code_user, firstName, lastName, email, password
is, 11 User, 0N Role

:
own , 01 User, 11 Scheduling
Role: code_role, name

:
Scheduling  : code_scheduling , week
:

:
contain, 1N Scheduling , 11 Meal
Meal : code_meal, idDbMeal, name, image, position

