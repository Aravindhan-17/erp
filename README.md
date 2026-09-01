# ERP & Flash Deals Platform

Welcome to the ERP and Flash Deals platform repository by **Hattussa IT Solution**. 
This is a full-stack monorepo consisting of a Next.js frontend application (client) and a backend service (server).

## 📂 Project Structure

```text
.
├── client/                 # Frontend application (Next.js 15, React, Tailwind CSS)
├── server/                 # Backend application (NestJS, TypeScript)
├── docs/                   # Project documentation
├── demo/                   # Demo assets or materials
├── docker-compose.yml      # Docker compose configuration for local development
└── package.json            # Root configuration (Husky pre-commit hooks)
```

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (Optional, for containerized environments)

### 1. Installation

You can install all dependencies (root, client, and server) with a single command from the root directory:
```bash
npm run install:all
```

### 2. Running Locally

To run both the frontend client and backend server simultaneously from the root directory:
```bash
npm run dev
```
The client will run on http://localhost:3000 and the server will start locally.

If you prefer to run them separately, you can use:
```bash
npm run dev:client  # Starts only the frontend
npm run dev:server  # Starts only the backend
```

### 3. Running with Docker

Alternatively, you can spin up the entire stack using Docker Compose:
```bash
docker-compose up -d
```

## 🛠️ Code Quality Tools

This repository is configured with **Husky** to enforce pre-commit hooks. Before any commit is accepted, it automatically runs:
- **ESLint**: Lints code to enforce code styles.
- **Prettier**: Formats code to ensure a consistent style (configured in the `client/` directory).

If a commit fails due to a linting error, please fix the error and try committing again.

## 🤝 Contribution Guidelines
When contributing to this repository:
1. Always create a new branch from `dev` for your features (e.g. `feature/my-new-feature`).
2. Ensure your code passes all linting rules and is formatted via Prettier.
3. Open a Pull Request targeting the `dev` branch.
4. Merge `dev` into `main` for releases.
