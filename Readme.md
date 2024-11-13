
# MyDU Node.js Mod Example

This repository contains a Node.js mod example for integration with MyDU servers. It provides an API server and mod registration functionality for custom mod communication.

## Prerequisites

- **Node.js** (version 14 or higher)
- **Docker** and **Docker Compose** (optional, for containerized deployment)
- Environment variables configured in a `.env` file (see details below)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jimmybutzen/mydu-nodejs-mod-example.git
cd mydu-nodejs-mod-example
```

### 2. Set up environment variables

Create a `.env` file in the project root with the following environment variables:

```env
ORLEANS_URL=<orleans_server_url>
WEBHOOK_BASE_URL=<webhook_base_url>
WEBHOOK_PORT=<webhook_port>
```

Replace `<orleans_server_url>`, `<webhook_base_url>`, and `<webhook_port>` with appropriate values for your setup.

### 3. Install dependencies

```bash
npm install
```

### 4. Run the project locally (you will need to expose orleans)

To start the server, run:

```bash
node index.js
```

The API server will start and listen on the port defined in `WEBHOOK_PORT`.

### 5. Use Docker (preffered)

If you prefer a containerized setup, use the Docker files provided.

#### Build and run with Docker Compose

```bash
docker-compose up --build
```

This command builds and starts the Docker container, setting up your environment according to `docker-compose.yml` and `Dockerfile`.

## Usage

- **Mod Registration**: The mod will automatically register itself with the MyDU server using the `registerMod` function.
- **API Endpoints**:
  - `/getmodinfo`: Provides mod information.
  - `/action/`: Triggers an action from the game to the mod.

## Project Structure

- **index.js**: Entry point of the server, initializes the API server and registers the mod.
- **api.js**: Contains the API logic for mod registration, sending requests, and handling actions.

## Troubleshooting

- **Connection Issues**: Ensure that `ORLEANS_URL` and `WEBHOOK_PORT` in the `.env` file are correctly configured.
- **Docker Setup**: If you encounter issues with Docker, make sure Docker and Docker Compose are installed and properly configured.
