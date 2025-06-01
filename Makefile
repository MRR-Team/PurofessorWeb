.PHONY: install dev build serve

install:
	npm install

dev:
	npm run build
	npm run dev

build:
	npm run build

serve:
	npm run serve

test:
	npm run test:unit


up:
	docker-compose up -d --build

down:
	docker-compose down

logs:
	docker-compose logs -f

frontend:
	docker-compose exec frontend sh