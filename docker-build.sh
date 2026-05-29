#!/bin/bash

set -e

# Colors
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
RED="\033[0;31m"
NC="\033[0m"

DOCKER_USER="$1"
IMG_TAG="$2"

echo -e "${BLUE}=======================================${NC}"
echo -e "${BLUE} Docker Build & Push Script ${NC}"
echo -e "${BLUE}=======================================${NC}"

# Input check (prevents /portfolio:)
if [ -z "$DOCKER_USER" ] || [ -z "$IMG_TAG" ]; then
    echo -e "${RED}ERROR: Missing arguments${NC}"
    echo "Usage: ./docker-build.sh <docker_user> <tag>"
    exit 1
fi

echo -e "${YELLOW}[1/3] Logging into Docker...${NC}"
docker login

echo -e "${YELLOW}[2/3] Building image...${NC}"
docker buildx build \
    --platform linux/amd64 \
    -t "$DOCKER_USER/portfolio:$IMG_TAG" \
    --push .

echo -e "${YELLOW}[3/3] Push completed!${NC}"

echo -e "${GREEN}Image pushed successfully:${NC}"
echo -e "${GREEN}$DOCKER_USER/portfolio:$IMG_TAG${NC}"

echo -e "${BLUE}=======================================${NC}"
echo -e "${GREEN}Done.${NC}"
echo -e "${BLUE}=======================================${NC}"