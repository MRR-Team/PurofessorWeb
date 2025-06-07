# PurofessorWeb – Frontend
## Architektura i wzorce

- **Zasady OOP, SOLID** – (SRP, OCP, LSP - (brak dziedziczenia, struktury interfejsów i fabryk są spójne), ISP, DIP), DRY (Don't Repeat Yourself)
- **Wzorce projektowe**:
    - **Factory Pattern** 
    - **Service Layer** 
    - **UseCase Pattern** 
    - **State Management** 
    - **Composables**
---

## Stack technologiczny

- Vue 3 + Vite
- TypeScript
- Pinia
- Vue Router
- Axios
- Vitest – testy jednostkowe
- ESLint + Prettier
- Tailwind
- Makefile
- Docker

---

## Project Setup

```sh
make install
```

### Compile and Hot-Reload for Development

```sh
make dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
make test
```

### Run Docker

```sh
make up
```