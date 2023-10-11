SHELL:=/usr/bin/env bash -O globstar

# CI/CD
clean:
	rm -rf .next

fix:
	yarn run next-fix
	yarn run prettier-fix

lint:
	yarn run next-lint
	yarn run prettier-lint

fix-lint: fix lint

start: clean
	yarn run dev

build-prod: clean
	yarn run build

start-prod:
	yarn run start
