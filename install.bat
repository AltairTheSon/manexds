@echo off
echo Installing Angular Design System dependencies...
echo.

echo Installing npm packages...
npm install

echo.
echo Installing Angular CLI globally (if not already installed)...
npm install -g @angular/cli

echo.
echo Setting up the project...
echo.

echo Creating necessary directories...
if not exist "src\assets" mkdir "src\assets"
if not exist "src\design-system\directives" mkdir "src\design-system\directives"
if not exist "src\design-system\pipes" mkdir "src\design-system\pipes"

echo.
echo Angular Design System setup complete!
echo.
echo To start development:
echo   npm start
echo.
echo To build the design system library:
echo   npm run build:lib
echo.
echo To run Storybook:
echo   npm run storybook
echo.
pause 