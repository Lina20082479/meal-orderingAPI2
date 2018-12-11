Linan Chen
20082479


Description
The application is designed for users to order their meal online. Customers can search the dishes and they also can add, delete or update their order after register and login.


Function List
Users
Register:    (post) Create a new user, e-mail and password are required.
Login:     (post) User can sign in if the email and password exist in database and are both correct.
Authentication: If the user logins in successfully, it will give a token to authenticate. When the user get permissions, he can do some specific operations.

Delete user:    (delete) Delete a user by ID.
Update user:    (put) Modify user information such as first name, last name and so on. 
Get all users:    (get) List all users in database.
Get a user:    (get) Get a user according to ID.

Dishes 
Get all dishes:    (get) List all dishes in database.
get one dish:    (get) Get a dish according to ID. 

fuzzy search: find dishes by name: Find a dish contained the key word in name. 

Add dishes:    (post) Create a new dish, including name, type, description, price, and date is generated automatically.
Delete dishes:    (delete) Delete a dish according to ID.
Update dishes:    (put) Modify a dish according to ID.

Orders
Create an order:    (post) User who has permission can create an order, the “dishes” in order is an array and the date is generated automatically.
Delete an order:    (delete) Delete an order according ID.
Update an order:    (put) Modify an order according ID.
Get all orders:     (get) List all orders in database. 
Get an order :     (get) Get an order according to ID.

Get total price of order:     (get) Calculate the total price of an order. 


Reference
https://medium.com/@obrientimothya/make-an-api-with-node-js-mongodb-and-jwt-authentication-9da443a1f59b
https://stackoverflow.com/questions/2351630/fuzzy-regular-expressions
https://docs.mongodb.com/manual/reference/database-references/
https://mongoosejs.com/docs/populate.html


Video Link
https://www.youtube.com/watch?v=RRxiTIE66ss&feature=youtu.be

Repo Link
https://bitbucket.org/Lina20082479/meal-ordering/src/master/