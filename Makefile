# Makefile for PurofessorWeb project

# Komendy do uruchomienia
.PHONY: install dev build serve

# Zainstalowanie zależności
install:
	npm install

# Budowanie i uruchamianie aplikacji w trybie deweloperskim
dev:
	npm run build
	npm run dev

# Budowanie projektu
build:
	npm run build

# Uruchomienie serwera produkcyjnego
serve:
	npm run serve
