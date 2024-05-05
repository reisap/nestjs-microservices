start:
	docker-compose up
stop:
	docker-compose down
remove:
	docker image rmi nestjs-microservices-app

.PHONY: start stop remove