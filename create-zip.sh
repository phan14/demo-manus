#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create a zip file of the entire project
echo -e "${YELLOW}Creating zip file of the project...${NC}"

# Navigate to the project root directory
cd /home/ubuntu

# Create zip file
zip -r user-management-system.zip user-access-management-system/

echo -e "${GREEN}Project has been zipped successfully!${NC}"
echo -e "${GREEN}You can download the zip file from: /home/ubuntu/user-management-system.zip${NC}"
