const { app, BrowserWindow } = require('electron')

app.commandLine.appendSwitch('--disable-software-rasterizer')

app.whenReady().then(() => {
  const infoType = process.argv.pop()
  const w = new BrowserWindow({ show: false })
  w.webContents.once('did-finish-load', () => {
    app.getGPUInfo(infoType).then(
      (gpuInfo) => {
        console.log(JSON.stringify(gpuInfo))
        app.exit(0)
      },
      (error) => {
        console.error(error)
        app.exit(1)
      }
    )
  })
  w.loadURL('data:text/html;<canvas></canvas>')
})
