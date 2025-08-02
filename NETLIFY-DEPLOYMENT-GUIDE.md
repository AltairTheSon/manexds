# 🚀 Netlify Deployment Guide

## 📋 **Overview**

This guide explains how to deploy the Angular Design System with Figma integration to Netlify using serverless functions.

## 🏗️ **Architecture**

### **Frontend (Angular)**
- **Build Output**: `dist/design-system`
- **Framework**: Angular 17
- **Routing**: Client-side routing with fallback to `index.html`

### **Backend (Serverless Functions)**
- **Location**: `netlify/functions/api.js`
- **Framework**: Express.js with serverless-http
- **API**: Direct Figma API integration

## 🔧 **Configuration Files**

### **1. netlify.toml**
```toml
[build]
  command = "npm run build"
  publish = "dist/design-system"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  node_bundler = "esbuild"
```

### **2. Environment Variables**
Set these in Netlify's environment variables:

```env
FIGMA_ACCESS_TOKEN=your_figma_access_token_here
FIGMA_FILE_ID=6zbyXDOYjJsJW52P6iZ3hL
NODE_ENV=production
```

## 🚀 **Deployment Steps**

### **1. Connect to Netlify**
1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Select the repository: `AltairTheSon/manexds`

### **2. Configure Build Settings**
- **Build command**: `npm run build`
- **Publish directory**: `dist/design-system`
- **Node version**: `18`

### **3. Set Environment Variables**
In Netlify dashboard → Site settings → Environment variables:

| Variable | Value |
|----------|-------|
| `FIGMA_ACCESS_TOKEN` | `figd_qsKCDVP7t2WhcgGHF98J9EQbtccvvg` |
| `FIGMA_FILE_ID` | `6zbyXDOYjJsJW52P6iZ3hL` |
| `NODE_ENV` | `production` |

### **4. Deploy**
1. Click "Deploy site"
2. Wait for build to complete
3. Check function logs for any errors

## 📊 **API Endpoints**

The serverless function provides these endpoints:

- `GET /.netlify/functions/api/health` - Health check
- `GET /.netlify/functions/api/api/mcp/figma/sync-status` - Sync status
- `GET /.netlify/functions/api/api/mcp/figma/files` - Figma files
- `GET /.netlify/functions/api/api/mcp/figma/enhanced/tokens` - Design tokens
- `GET /.netlify/functions/api/api/mcp/figma/enhanced/components` - Components
- `POST /.netlify/functions/api/api/mcp/figma/enhanced/sync` - Trigger sync

## 🔍 **Troubleshooting**

### **Build Errors**
1. **Budget exceeded**: Already fixed in `angular.json`
2. **Function timeout**: Increase timeout in Netlify settings
3. **Memory issues**: Increase memory allocation

### **Runtime Errors**
1. **CORS issues**: Check function CORS configuration
2. **API errors**: Verify Figma token and file ID
3. **Function not found**: Check redirects in `netlify.toml`

### **Common Issues**
1. **Environment variables not set**: Double-check in Netlify dashboard
2. **Function cold start**: First request may be slow
3. **API rate limits**: Monitor Figma API usage

## 📈 **Performance Optimization**

### **Function Optimization**
- Use connection pooling for API calls
- Implement caching for Figma data
- Optimize bundle size

### **Frontend Optimization**
- Enable Angular production mode
- Use lazy loading for routes
- Optimize images and assets

## 🔒 **Security**

### **Environment Variables**
- Never commit `.env` files
- Use Netlify's environment variable system
- Rotate Figma tokens regularly

### **API Security**
- Validate all inputs
- Implement rate limiting
- Use HTTPS for all requests

## 📝 **Monitoring**

### **Netlify Analytics**
- Monitor function invocations
- Track build times
- Monitor error rates

### **Function Logs**
- Check Netlify function logs
- Monitor API response times
- Track Figma API usage

## 🎯 **Success Criteria**

✅ **Build succeeds** without budget errors  
✅ **Functions deploy** successfully  
✅ **Environment variables** are set correctly  
✅ **API endpoints** respond properly  
✅ **Frontend loads** without errors  
✅ **Figma data** loads successfully  

## 🚀 **Next Steps**

1. **Deploy to Netlify** following this guide
2. **Test all endpoints** to ensure functionality
3. **Monitor performance** and optimize as needed
4. **Set up custom domain** if desired
5. **Configure CI/CD** for automatic deployments

## 📞 **Support**

If you encounter issues:
1. Check Netlify function logs
2. Verify environment variables
3. Test API endpoints manually
4. Review this guide for common solutions