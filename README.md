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
- **Consolidated Workflow**: All documentation authored and published from this project

## Features

- **Professional Documentation**: Enhanced MkDocs Material with custom OpenAI-inspired theme
- **NIR Composite Metrics**: Sophisticated performance analysis beyond traditional statistics  
- **MCP Server Integration**: 15+ analytics tools accessible via Model Context Protocol
- **AI Visualization**: Context-aware chart generation and intelligent data visualization
- **Comprehensive Coverage**: 13 seasons of NWSL data with 99.38% completeness

## Documentation System

### GitHub Pages Deployment

Documentation is automatically deployed to `platform.nwsldata.com/docs/` via GitHub Pages.

**Simple Workflow:**
1. **Edit documentation** in `docs/` directory
2. **Commit and push** to main branch
3. **GitHub Actions automatically builds and deploys** the documentation

### Documentation Commands

```bash
# Install documentation dependencies (for local development)
npm run docs:install

# Local development server
npm run docs:dev

# Local build (for testing)
npm run docs:build
```

### Deployment

- **Automatic**: Push to main branch triggers deployment
- **Manual**: Use GitHub Actions "Deploy Documentation" workflow
- **Live Site**: https://platform.nwsldata.com/docs/

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
