start:
	docker-compose -f docker-compose.local.yaml up
start-prod:
	docker-compose -f docker-compose.production.yaml -f docker-compose.yaml up
start-qa:
	docker-compose -f docker-compose.qa.yaml up
build:
	docker-compose -f docker-compose.local.yaml build
stop:
	docker-compose -f docker-compose.local.yaml down
remove:
	docker image rmi nestjs-microservices

.PHONY: start stop remove start-prod start-qa