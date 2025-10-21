#!/bin/bash

# Pokémon Portfolio - Development Helper Script
# This script provides quick commands for common development tasks

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PROJECT_DIR="pokemon-portfolio"

echo -e "${BLUE}🎮 Pokémon Portfolio - Helper Script${NC}"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    if [ -d "$PROJECT_DIR" ]; then
        echo -e "${YELLOW}📁 Navigating to project directory...${NC}"
        cd $PROJECT_DIR
    else
        echo -e "${YELLOW}❌ Error: Not in project directory${NC}"
        exit 1
    fi
fi

# Display menu
echo -e "${GREEN}Available commands:${NC}"
echo "1. Install dependencies"
echo "2. Start development server"
echo "3. Build for production"
echo "4. Run tests"
echo "5. Lint code"
echo "6. Clean build artifacts"
echo "7. Full reset (clean + install)"
echo "8. Exit"
echo ""

read -p "Select an option (1-8): " choice

case $choice in
    1)
        echo -e "${BLUE}📦 Installing dependencies...${NC}"
        npm install
        echo -e "${GREEN}✅ Dependencies installed!${NC}"
        ;;
    2)
        echo -e "${BLUE}🚀 Starting development server...${NC}"
        echo -e "${GREEN}➜ Open http://localhost:4200 in your browser${NC}"
        npm start
        ;;
    3)
        echo -e "${BLUE}🏗️  Building for production...${NC}"
        npm run build
        echo -e "${GREEN}✅ Build complete! Output in dist/pokemon-portfolio/${NC}"
        ;;
    4)
        echo -e "${BLUE}🧪 Running tests...${NC}"
        npm test
        ;;
    5)
        echo -e "${BLUE}🔍 Linting code...${NC}"
        npm run lint || echo "Lint command not configured"
        ;;
    6)
        echo -e "${BLUE}🧹 Cleaning build artifacts...${NC}"
        rm -rf dist/
        rm -rf .angular/
        echo -e "${GREEN}✅ Clean complete!${NC}"
        ;;
    7)
        echo -e "${BLUE}🔄 Full reset...${NC}"
        rm -rf node_modules/
        rm -rf dist/
        rm -rf .angular/
        rm -f package-lock.json
        echo -e "${YELLOW}📦 Reinstalling dependencies...${NC}"
        npm install
        echo -e "${GREEN}✅ Reset complete!${NC}"
        ;;
    8)
        echo -e "${GREEN}👋 Goodbye!${NC}"
        exit 0
        ;;
    *)
        echo -e "${YELLOW}❌ Invalid option${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✨ Done!${NC}"
