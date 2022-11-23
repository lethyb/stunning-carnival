default:
	make --help

create:
	docker-compose build --force-rm --no-cache

start:
	docker-compose up

build:
	docker-compose run react yarn build

stop:
	docker-compose down

restart:
	make stop start

upy:
	docker-compose run react yarn
