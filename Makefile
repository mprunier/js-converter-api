install:
	npm install

start:
	npm run start

build:
	npm run build
	docker-compose build

run:
	docker-compose up -d

stop:
	docker-compose down

logs:
	docker-compose logs -f