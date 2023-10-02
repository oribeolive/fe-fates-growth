# FE Fates Growth
This calculates expected stats of units of Fire Emblem Fates at every level.

# Demo
https://fe-fates-growth.vercel.app/

# Requirement

* Docker <=20.10.16
* Docker Compose <=1.29.2

# Installation

Clone the repository.
```bash
git clone https://github.com/oribeolive/fe-fates-growth
```
## App without backend API
This mode uses data in local JSON files.

Build and start 'app' container.
```bash
docker-compose build app
docker-compose up -d app
```
Wait a few minutes until the installation of packages is completed at first time.
Then access to http://127.0.0.1:3000


## App with backend API(Laravel + MySQL)
This mode uses data fetched from backend API.

Copy and rename .env files.
### Backend
```bash
cp [project directory]/backend/src/.env.example [project directory]/backend/src/.env
```
### Frontend
```bash
cp [project directory]/frontend/src/.env [project directory]/frontend/src/.env.local
```
Modify the frontend .env file to use the API.
```diff
-DATA_SOURCE='file'
-NEXT_PUBLIC_DATA_SOURCE='file'
+DATA_SOURCE='api'
+NEXT_PUBLIC_DATA_SOURCE='api'
```

Build containers and start 'db' container.
```bash
docker-compose build
docker-compose up -d db
```

Install packages, generate a secret key, and init data.
```bash
docker-compose run --rm php sh -c 'composer install && php artisan key:generate && php artisan migrate:refresh --seed'
```

Start containers.
```bash
docker-compose up -d
```

Then access to http://127.0.0.1:3000

# Author
mu

https://x.com/loglesslove

# License
FE Fates Growth is under [MIT license](https://github.com/oribeolive/fe-fates-growth/blob/main/LICENSE).
