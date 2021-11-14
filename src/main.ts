import { app, BrowserWindow } from "electron"

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  win.loadFile("../assets/index.html")
})
