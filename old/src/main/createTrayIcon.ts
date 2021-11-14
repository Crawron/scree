import { app, Tray, Menu } from "electron"
export function createTrayIcon() {
  const trayIcon = new Tray("./assets/placeholderTray.png")

  trayIcon.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Exit",
        click: () => app.exit(),
      },
    ]),
  )
}
