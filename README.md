# NWSL Advanced Analytics Intelligence Platform

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![NextJS](https://img.shields.io/badge/Built_with-NextJS-blue)
![OpenAI API](https://img.shields.io/badge/Powered_by-OpenAI_API-orange)
![MkDocs Material](https://img.shields.io/badge/Docs-MkDocs_Material-blue)

Professional documentation and web platform for the NWSL Advanced Analytics Intelligence system. This repository handles documentation rendering and web interface for sophisticated soccer analytics powered by sabermetrics-inspired composite metrics.

## Architecture

- **Documentation**: Professional MkDocs Material rendering with OpenAI-inspired theme
- **Web Interface**: NextJS chat interface connected to NWSL MCP server
- **Analytics Integration**: Model Context Protocol (MCP) integration for advanced analytics
- **Single Source of Truth**: Documentation synced from `nwsl_data` project

## Features

- **Professional Documentation**: Enhanced MkDocs Material with custom OpenAI-inspired theme
- **NIR Composite Metrics**: Sophisticated performance analysis beyond traditional statistics  
- **MCP Server Integration**: 15+ analytics tools accessible via Model Context Protocol
- **AI Visualization**: Context-aware chart generation and intelligent data visualization
- **Comprehensive Coverage**: 13 seasons of NWSL data with 99.38% completeness

## Documentation System

### Development Workflow

1. **Documentation Source**: All content authored in `../nwsl_data/docs/` (single source of truth)
2. **Professional Rendering**: Enhanced MkDocs Material with OpenAI-inspired theme
3. **Sync Process**: `npm run docs:sync` copies content and builds documentation

### Documentation Commands

```bash
# Install documentation dependencies
npm run docs:install

# Sync documentation from nwsl_data and build
npm run docs:sync

# Development server (after sync)
npm run docs:dev

# Build documentation only
npm run docs:build
```

### Web Interface Setup

1. **Set OpenAI API key:**
   ```bash
   # Create .env file
   OPENAI_API_KEY=<your_api_key>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Available at [`http://localhost:3000`](http://localhost:3000)

4. **Access documentation:**
   ```bash
   npm run docs:dev
   ```
   Available at [`http://localhost:8000`](http://localhost:8000)

## Contributing

You are welcome to open issues or submit PRs to improve this app, however, please note that we may not review all suggestions.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
