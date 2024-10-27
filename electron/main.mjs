import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import url from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function logDirectoryStructure(dir, level = 0) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    items.forEach(item => {
        console.log('  '.repeat(level) + (item.isDirectory() ? '📁' : '📄') + ' ' + item.name);
        if (item.isDirectory()) {
            logDirectoryStructure(path.join(dir, item.name), level + 1);
        }
    });
}

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: false
        },
    });

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '..', 'out', 'index.html'),
        protocol: 'file:',
        slashes: true
    });

    console.log(`Initial URL: ${startUrl}`);
    mainWindow.loadURL(startUrl);

    // In the createWindow function, after loading the initial URL
    mainWindow.webContents.executeJavaScript(fs.readFileSync(path.join(__dirname, 'link-handler.js'), 'utf8'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

// Update the navigateTo function
function navigateTo(pagePath) {
    let fullPath;
    if (pagePath === '' || pagePath === '/') {
        fullPath = path.join(__dirname, '..', 'out', 'index.html');
    } else {
        fullPath = path.join(__dirname, '..', 'out', pagePath, 'index.html');
    }
    console.log(`Attempting to navigate to: ${fullPath}`);
    if (fs.existsSync(fullPath)) {
        console.log(`File exists, loading: ${fullPath}`);
        return mainWindow.loadFile(fullPath);
    } else {
        console.error(`Page not found: ${fullPath}`);
        return mainWindow.loadFile(path.join(__dirname, '..', 'out', '404', 'index.html'));
    }
}

app.on('ready', () => {
    const outDir = path.join(__dirname, '..', 'out');
    console.log('Checking out directory structure:');
    logDirectoryStructure(outDir);
    
    createWindow();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});

// Add this IPC handler for navigation
ipcMain.handle('navigate', async (event, pagePath) => {
    return navigateTo(pagePath);
});

// Intercept all navigation events
app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        event.preventDefault();
        const pagePath = new URL(navigationUrl).pathname;
        navigateTo(pagePath);
    });
});
