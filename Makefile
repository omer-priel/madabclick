SHELL:=/usr/bin/env bash -O globstar

# CI/CD
clean:
	cd frontend && make clean

fix:
	cd frontend && make fix

lint:
	cd frontend && make lint

fix-lint:
	cd frontend && make fix-lint

start:
	cd frontend && make start

build-prod:
	cd frontend && make build-prod

start-prod:
	cd frontend && make start-prod
