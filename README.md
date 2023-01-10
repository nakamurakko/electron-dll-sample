# electron-dll-sample

## 確認済み開発環境

* Visual Studio Code
* Visual Studio 2022 または Build Tools for Visual Studio 2022
    * ワークロードは下記を選択する。
        * C++ によるデスクトップ開発
        * .NET デスクトップ ビルド ツール
    * 個別のコンポーネントで下記を選択する。
        * .NET Framework 4.6 Targeting Pack (**Edge.js.CSharp が参照しているため、 EXE 実行環境でも必要。**)
* Visual C++ 再頒布パッケージ
    * 必要か再確認が必要。
* Node.js 18.12.1
* Python 3.11.0

## 準備

`publish-dll.bat` を実行する。バッチの内容は下記の通り。

* SampleLib の発行を実行し、 electron-app\Libraries に DLL を出力する。
* `npm install -g node-gyp` を実行する。
* electron-app ディレクトリーで `npm install` を実行する。
* electron-app ディレクトリーで `npm run build-electron-edge-js` を実行する。
* electron-app\Libraries に生成された下記ファイルを、 electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1\runtimes\win\lib\netstandard1.3 ディレクトリーにを作成してコピーする。
    * System.Diagnostics.FileVersionInfo.dll (electron-app\Libraries\refs ディレクトリーに存在。)
    * System.Text.Encoding.CodePages.dll
    * Microsoft.DotNet.InternalAbstractions.dll
* electron-app\Libraries に生成された下記ファイルを、 electron-app\node_modules\electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1 ディレクトリーにコピーする。
    (SampleLib* はコピーしないため、 CopyExcludedFiles.txt (除外一覧)に記載。)

## 実行

* デバッグは、 electron-app ディレクトリーを Visual Studio Code で開いてデバッグを開始する。
* EXE を作成する場合は、
    * electron-app ディレクトリー以下で、 `npm run build-portable` を実行する。
    * electron-app\dist ディレクトリー以下にある EXE を実行する。

## SampleLib(DLL)の構成

* TargetFramework は netstandard2.0 を指定。
* 追加した NuGet パッケージは下記の通り。
    パッケージ名 | バージョン | 補足
    -------|-------|---
    Edge.js.CSharp | 1.2.0 |
    Microsoft.CodeAnalysis | 4.4.0 |
    Microsoft.DotNet.InternalAbstractions | 1.0.0 |
    Microsoft.NETCore.DotNetHost | 7.0.1 | edge-js で追加指定されている。
    Microsoft.NETCore.DotNetHostPolicy | 7.0.1 | edge-js で追加指定されている。
    System.Xml.XPath.XmlDocument | 4.3.0 |
