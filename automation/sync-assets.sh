#!/bin/bash

set -e

# Colors
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
RED="\033[0;31m"
NC="\033[0m"

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

EC2_HOST="ubuntu@52.54.48.37"
KEY="$SCRIPT_DIR/portfolio-ec2.pem"

# rsync flags:
# -r recurse, -t preserve modification times, -v verbose, -z compress
# Set directories to 755 and files to 644.
DIR_FLAGS=(-rtvz --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r)

echo -e "${BLUE}EC2 Asset Sync${NC}"
echo

echo -e "${YELLOW}[1/6] Checking EC2 connection...${NC}"
if ! ssh -i "$KEY" -o ConnectTimeout=5 -o BatchMode=yes "$EC2_HOST" exit 2>/dev/null; then
    echo -e "${RED}ERROR: EC2 is not reachable. Please turn it on and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}EC2 is reachable.${NC}"
echo

echo -e "${YELLOW}[2/6] Syncing static files...${NC}"
rsync "${DIR_FLAGS[@]}" \
    -e "ssh -i $KEY" \
    "$PROJECT_ROOT/static/" \
    "$EC2_HOST:/home/ubuntu/portfolio/staticfiles/"

echo

echo -e "${YELLOW}[3/6] Syncing media files...${NC}"
rsync "${DIR_FLAGS[@]}" \
    -e "ssh -i $KEY" \
    "$PROJECT_ROOT/media/" \
    "$EC2_HOST:/home/ubuntu/portfolio/media/"

echo

echo -e "${YELLOW}[4/6] Syncing .env...${NC}"
rsync -vz \
    --chmod=Fu=rw,Fgo= \
    -e "ssh -i $KEY" \
    "$PROJECT_ROOT/.env" \
    "$EC2_HOST:/home/ubuntu/portfolio/.env"

echo

echo -e "${YELLOW}[5/6] Syncing docker-compose.yml...${NC}"
rsync -vz \
    --chmod=Fu=rw,Fgo=r \
    -e "ssh -i $KEY" \
    "$PROJECT_ROOT/docker-compose.yml" \
    "$EC2_HOST:/home/ubuntu/docker-compose.yml"

echo

echo -e "${YELLOW}[6/6] Syncing docker-clean.sh...${NC}"
rsync -vz \
    --chmod=Fu=rwx,Fgo=rx \
    -e "ssh -i $KEY" \
    "$SCRIPT_DIR/docker-clean.sh" \
    "$EC2_HOST:/home/ubuntu/docker-clean.sh"

echo
echo -e "${GREEN}✓ Asset sync completed successfully.${NC}"
