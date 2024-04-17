# Steps

1. Clone the repo using this 
```https://github.com/Butcher-L/kitra.git```
2. Run ```npm install```
3. Ensure that you stablish a database for the project
4. Create ```.env``` in the root.
   For this example we will use this, copy and paste it in the ```.env``` file
```MYSQLHOST=127.0.0.1
MYSQLPORT=3306
MYSQLDATABASE=kitra
MYSQLUSERNAME=root
MYSQLPASSWORD=admin
```
5. Run the migration, first you need to run this
```node migrations/migration.js ```
   this script will create the tables and columns. 
   Next run this 
```node migrations/seeding.js ```
   this script will populate each tables
6. To start the api run ```npm start```


