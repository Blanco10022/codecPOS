import { contextBridge, ipcRenderer, shell } from 'electron';

// Expose protected APIs to renderer
contextBridge.exposeInMainWorld('posAPI', {
  // File system operations
  readFile: (relativePath) => ipcRenderer.invoke('read-local-file', relativePath),
  writeFile: (relativePath, data) => ipcRenderer.invoke('write-local-file', { relativePath, data }),
  
  // File dialogs
  showOpenDialog: () => ipcRenderer.invoke('show-open-dialog'),
  showSaveDialog: () => ipcRenderer.invoke('show-save-dialog'),
  
  // Database operations
  dbQuery: (query, params) => ipcRenderer.invoke('db-query', { query, params }),
  
  // Printing
  printReceipt: (receiptData) => ipcRenderer.invoke('print-receipt', receiptData),
  
  // Navigation (within the app)
  navigateTo: (path) => {
    const cleanPath = path.replace(/[^a-zA-Z0-9-_/]/g, '');
    return ipcRenderer.invoke('navigate', cleanPath);
  },
  
  openExternal: (url) => shell.openExternal(url)
});
