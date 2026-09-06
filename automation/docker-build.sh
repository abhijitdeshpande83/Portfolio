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

# Project root = parent directory of automation/
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}Docker Build & Push${NC}"
echo

# Input check
if [ -z "$DOCKER_USER" ] || [ -z "$IMG_TAG" ]; then
    echo -e "${RED}ERROR: Missing arguments${NC}"
    echo "Usage: ./automation/docker-build.sh <docker_user> <tag>"
    exit 1
fi

echo -e "${YELLOW}[1/3] Logging into Docker...${NC}"
docker login

echo
echo -e "${YELLOW}[2/3] Building and pushing image...${NC}"
docker buildx build \
    --platform linux/amd64 \
    -t "$DOCKER_USER/portfolio:$IMG_TAG" \
    --push "$PROJECT_ROOT"

echo
echo -e "${YELLOW}[3/3] Push completed!${NC}"

echo -e "${GREEN}Image pushed successfully:${NC}"
echo -e "${GREEN}$DOCKER_USER/portfolio:$IMG_TAG${NC}"

echo
echo -e "${GREEN}Done.${NC}"
