#!/bin/bash

# Colors
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
RED="\033[0;31m"
NC="\033[0m"

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE} Docker Full Cleanup Utility ${NC}"
echo -e "${BLUE}=======================================${NC}"

echo -e "${YELLOW}Stopping all containers...${NC}"
docker stop $(docker ps -aq) 2>/dev/null

echo -e "${YELLOW}Removing all containers...${NC}"
docker rm $(docker ps -aq) 2>/dev/null

echo -e "${YELLOW}Removing all images...${NC}"
docker rmi -f $(docker images -aq) 2>/dev/null

echo -e "${YELLOW}Pruning unused volumes...${NC}"
docker volume prune -af

echo -e "${GREEN}Docker cleanup complete ✔${NC}"

echo -e "${BLUE}=======================================${NC}"