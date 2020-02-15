# techreach-appinfra
 Caltech TechReach Application Infrastructure

# how to run this repo

1. clone git repo

2. set up server:

2.1 make sure you have a working web/php dev environment. i.e. install php, mysql, apache, nodejs. or just use laragon and have it all set up for you.

2.2 symlink the web folder to www/<project name> (e.g. www/techreach)

2.3 install dependencies. 
  cd www/techreach
  composer install  (php dependencies)
  npm install (or yarn) (js dependencies)

2.4 set up .env file.
  cp .env.example .env
  change app name to <your app name here> e.g. TechReach
  change db name DB_DATABASE=<your db name here> e.g. techreach-appinfra
  change db login credentials (default is root/no pw, but depends on your mysql config)

2.5 make an app key then check your .env file to make sure it's there.
  php artisan key:generate

2.6 make a database. 
  mysql -u root
  create database <your db name here>;  (use the same name you put in your .env file)

2.7 migrate the database.
  php artisan migrate

2.8 if all goes well, you can now run `php artisan serve` from your www/<project name> folder. then go to localhost:8000, yay you have a web app. amaze

3. set up mobile

3.1 make sure you have a working mobile dev environment. that means installing JDK (recommend sticking with JDK 8 right now if doing android dev, JDK 13 is not compatible with gradle 6 or something and causes all sorts of broken issues)

3.2 install JS dependencies
  cd mobile
  npm install (or yarn)

3.3 boot up your android virtual device

3.3 from the mobile/ folder
  expo start
  click `run on android emulator` in the browser window that opens or just press a in the terminal window to open the emulator

3.4 wow AN APP