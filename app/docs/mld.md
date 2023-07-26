# MLD

user (id, firstName, lastName, email, password, #role(id)) 
role (id, name)
favori (id, idDbMeal, name, image, position, #user(id))
scheduling (id, week, #user(id))
meal (id, idDbMeal, name, image, position #scheduling(id))
