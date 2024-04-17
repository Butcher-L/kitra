# Steps

1. Clone the repo using this `\n`
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
5. Run the migration, first you need to run this \n
```node migrations/migration.js ```\n
   this script will create the tables and columns. \n
   Next run this \n
```node migrations/seeding.js ```\n
   this script will populate each tables\n
6. To start the api run ```npm start```\n


