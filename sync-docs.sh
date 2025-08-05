#!/bin/bash
set -e

# NWSL Data Platform - Documentation Sync Script
# Syncs organized documentation from nwsl_data (source of truth) to nwsl_data_platform (MkDocs rendering)

NWSL_DATA_PATH="../nwsl_data"
CURRENT_PATH="."

echo "🔄 Syncing organized documentation from nwsl_data to nwsl_data_platform..."

# Check if nwsl_data project exists
if [ ! -d "$NWSL_DATA_PATH" ]; then
    echo "❌ Error: nwsl_data project not found at $NWSL_DATA_PATH"
    echo "   Expected path: /Users/thomasmcmillan/projects/nwsl_data"
    exit 1
fi

# Check if nwsl_data has docs directory
if [ ! -d "$NWSL_DATA_PATH/docs" ]; then
    echo "❌ Error: docs directory not found in nwsl_data project"
    exit 1
fi

# 1. Clean existing docs
echo "🧹 Cleaning existing documentation..."
rm -rf "$CURRENT_PATH/docs"
mkdir -p "$CURRENT_PATH/docs"

# 2. Sync only organized professional documentation sections
echo "📁 Syncing organized documentation sections..."

# Core organized sections
if [ -d "$NWSL_DATA_PATH/docs/about" ]; then
    cp -r "$NWSL_DATA_PATH/docs/about" "$CURRENT_PATH/docs/"
fi

if [ -d "$NWSL_DATA_PATH/docs/data" ]; then
    cp -r "$NWSL_DATA_PATH/docs/data" "$CURRENT_PATH/docs/"
fi

if [ -d "$NWSL_DATA_PATH/docs/platform" ]; then
    cp -r "$NWSL_DATA_PATH/docs/platform" "$CURRENT_PATH/docs/"
fi

if [ -d "$NWSL_DATA_PATH/docs/mcp" ]; then
    cp -r "$NWSL_DATA_PATH/docs/mcp" "$CURRENT_PATH/docs/"
fi

# Main index file
if [ -f "$NWSL_DATA_PATH/docs/index.md" ]; then
    cp "$NWSL_DATA_PATH/docs/index.md" "$CURRENT_PATH/docs/"
fi

# Skip disorganized files like:
# - *.sql files in root
# - system_prompt.md
# - scraping.md  
# - test_queries.md
# - teams_seasons.md
# - database_changes.md
# - mcp docs/ (unorganized OpenAI docs)

echo "⚙️  Preserving nwsl_data_platform MkDocs configuration..."
# (Our mkdocs.yml and custom CSS stay in this project)

# 3. Build documentation using our enhanced MkDocs Material config
echo "🔨 Building documentation with MkDocs Material..."
source venv/bin/activate && mkdocs build

echo "✅ Organized documentation sync completed successfully!"
echo "📖 Professional documentation available at: ./public/docs/"
echo ""
echo "Synced sections:"
echo "  ✓ about/ - Mission, methodology, and platform overview"
echo "  ✓ data/ - Database schema and data foundation" 
echo "  ✓ platform/ - NIR metrics and analytics capabilities"
echo "  ✓ mcp/ - Server architecture and tools reference"
echo "  ✓ index.md - Main landing page"
echo ""
echo "Workflow:"
echo "  1. Edit documentation in: ../nwsl_data/docs/"
echo "  2. Run: npm run docs:sync"
echo "  3. Professional documentation built to: ./public/docs/"