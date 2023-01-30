// アプリケーションの寿命の制御と、ネイティブなブラウザウインドウを作成するモジュール
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

process.env.EDGE_USE_CORECLR = '1';
const edge = require('electron-edge-js');

const createWindow = () => {
  // ブラウザウインドウを作成します。
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // そしてアプリの index.html を読み込みます。
  mainWindow.loadFile('index.html');

  // メニューバーを非表示。
  mainWindow.setMenuBarVisibility(false);

  // デベロッパー ツールを開きます。
  // mainWindow.webContents.openDevTools()
};

// このメソッドは、Electron の初期化が完了し、
// ブラウザウインドウの作成準備ができたときに呼ばれます。
// 一部のAPIはこのイベントが発生した後にのみ利用できます。
app.whenReady()
  .then(() => {
    ipcMain.handle('dirName',
      () => {
        return new Promise((resolve, reject) => {
          resolve(__dirname);
        });
      }
    );

    ipcMain.handle('resourcesPath',
      () => {
        return new Promise((resolve, reject) => {
          resolve(process.resourcesPath);
        });
      }
    );

    createWindow();

    app.on('activate', () => {
      // macOS では、Dock アイコンのクリック時に他に開いているウインドウがない
      // 場合、アプリのウインドウを再作成するのが一般的です。
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

// macOS を除き、全ウインドウが閉じられたときに終了します。 ユーザーが
// Cmd + Q で明示的に終了するまで、アプリケーションとそのメニューバーを
// アクティブにするのが一般的です。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// このファイルでは、アプリ内のとある他のメインプロセスコードを
// インクルードできます。
// 別々のファイルに分割してここで require することもできます。

/**
 * Libraries ディレクトリーのパスを返す。
 *
 * @returns {string}
 */
function getLibraryPath() {
  let libraryPath = process.resourcesPath;
  if (process.env.DEBUG_MODE) {
    libraryPath = __dirname;
  }

  return path.join(libraryPath, 'Libraries');
}

ipcMain.handle('greeting',
  /**
   * 挨拶を返す。
   *
   * @param {Electron.IpcMainInvokeEvent} event イベントデータ。
   * @param {string} whoIs 挨拶する相手。
   * @returns {Promise<string>}
   */
  (event, whoIs) => {
    return new Promise((resolve, reject) => {
      const dllFilePath = path.join(getLibraryPath(), 'SampleLib.dll');

      // DLL のメソッドを参照する。
      const dllFunction = edge.func({
        assemblyFile: dllFilePath,
        typeName: 'SampleLib.Greeting',
        methodName: 'Reply'
      });

      // DLL のメソッドを実行する。
      dllFunction(whoIs, function (error, result) {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  });
