#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting User Access Management System development environment...${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating default .env file...${NC}"
    cp .env.example .env 2>/dev/null || echo -e "${YELLOW}No .env.example found, using existing configuration.${NC}"
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${YELLOW}Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Stop any existing containers
echo -e "${YELLOW}Stopping any existing containers...${NC}"
docker-compose down

# Build the application
echo -e "${YELLOW}Building the application...${NC}"
docker-compose build

# Start the containers
echo -e "${YELLOW}Starting the containers...${NC}"
docker-compose up -d

# Wait for services to be ready
echo -e "${YELLOW}Waiting for services to be ready...${NC}"
sleep 5

# Check if containers are running
if [ "$(docker-compose ps -q | wc -l)" -eq 3 ]; then
    echo -e "${GREEN}All services are up and running!${NC}"
    echo -e "${GREEN}Application is available at: http://localhost:$(grep APP_PORT .env | cut -d= -f2)/api${NC}"
    echo -e "${GREEN}Swagger UI is available at: http://localhost:$(grep APP_PORT .env | cut -d= -f2)/api/swagger-ui.html${NC}"
    echo -e "${YELLOW}PostgreSQL is available at: localhost:$(grep POSTGRES_EXTERNAL_PORT .env | cut -d= -f2)${NC}"
    echo -e "${YELLOW}Redis is available at: localhost:$(grep REDIS_EXTERNAL_PORT .env | cut -d= -f2)${NC}"
else
    echo -e "${YELLOW}Some services failed to start. Check logs with: docker-compose logs${NC}"
fi

echo -e "${YELLOW}To stop the services, run: docker-compose down${NC}"
