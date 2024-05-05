start:
	docker-compose up
build:
	docker-compose up --build
stop:
	docker-compose down
remove:
	docker image rmi nestjs-microservices-app

.PHONY: start stop remove