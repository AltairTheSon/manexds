# Design System

A modern design system built with Angular that syncs with Figma and displays design tokens, components, and pages.

## 🚀 Features

- **Real-time Figma Sync** - Connect to your Figma file and sync design tokens, components, and pages
- **Server-side Architecture** - No localStorage limitations, handles large datasets efficiently
- **Search & Pagination** - Find and browse through thousands of design elements
- **Responsive Design** - Works on desktop and mobile devices
- **Clean UI** - Modern, professional interface for design system management

## 📊 Current Data

- **10,938 Design Tokens** - Colors, spacing, typography, and more
- **736 Components** - UI components from your Figma file
- **4 Pages** - Page layouts and templates

## 🛠️ Tech Stack

- **Frontend**: Angular 15+
- **Backend**: Node.js + Express
- **API**: Figma REST API
- **Styling**: SCSS
- **State Management**: RxJS

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Angular App   │    │  Node.js Server │    │   Figma API     │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Data Source) │
│                 │    │                 │    │                 │
│ • Display Data  │    │ • API Endpoints │    │ • Design Tokens │
│ • Search/Filter │    │ • Data Storage  │    │ • Components    │
│ • Pagination    │    │ • Sync Logic    │    │ • Pages         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

### 2. Configure Figma

Edit `server/.env`:
```env
FIGMA_ACCESS_TOKEN=your_figma_token_here
FIGMA_FILE_ID=your_figma_file_id_here
PORT=3200
```

### 3. Start Servers

```bash
# Start backend server (in server directory)
cd server
node mcp-figma-server.js

# Start frontend server (in root directory)
npm start
```

### 4. Access the Application

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3200

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── design-system/          # Main design system component
│   │   ├── sync-status/            # Figma sync status
│   │   └── figma-connector/        # Legacy connector
│   ├── services/
│   │   └── figma-server.service.ts # Server communication
│   └── app.component.*             # Main app component
server/
├── mcp-figma-server.js            # Backend server
├── config.js                      # Server configuration
├── .env                          # Environment variables
└── storage/                      # Data storage
```

## 🔧 API Endpoints

- `GET /api/mcp/figma/sync-status` - Get sync status
- `POST /api/mcp/figma/sync` - Start sync
- `GET /api/mcp/figma/tokens` - Get design tokens
- `GET /api/mcp/figma/components` - Get components
- `GET /api/mcp/figma/pages` - Get pages

## 🎨 Design System Features

### Design Tokens
- Colors, spacing, typography, shadows
- Visual preview with color swatches
- Search and filter capabilities

### Components
- UI components from Figma
- Component variants and properties
- Grid layout with previews

### Pages
- Page layouts and templates
- Responsive design considerations
- Navigation structure

## 🔄 Sync Process

1. **Manual Sync** - Click "Sync Now" button
2. **Real-time Status** - See sync progress and status
3. **Data Validation** - Automatic error handling
4. **Caching** - Local storage for performance

## 📱 Responsive Design

- **Desktop**: Full grid layout with sidebars
- **Tablet**: Adaptive grid with touch-friendly controls
- **Mobile**: Single column layout with optimized navigation

## 🛡️ Error Handling

- **Network Errors** - Graceful fallbacks
- **API Limits** - Rate limiting and retries
- **Data Validation** - Type checking and sanitization
- **User Feedback** - Clear error messages

## 🔮 Future Enhancements

- [ ] Component preview generation
- [ ] Export to CSS/SCSS
- [ ] Version control integration
- [ ] Team collaboration features
- [ ] Advanced filtering options
- [ ] Component documentation generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details 