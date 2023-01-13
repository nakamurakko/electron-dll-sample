# electron-dll-sample

## 確認済み開発環境

* Visual Studio Code
* Visual Studio 2022 または Build Tools for Visual Studio 2022
    * ワークロードは下記を選択する。
        * C++ によるデスクトップ開発
        * .NET デスクトップ ビルド ツール
    * 個別のコンポーネントで下記を選択する。
        * .NET Framework 4.6 Targeting Pack (**調査中。Edge.js.CSharp が参照しているため、 EXE 実行環境でも必要。**)
* Visual C++ 再頒布パッケージ
    * 必要か再確認が必要。
* Node.js 18.12.1
* Python 3.11.0

## 準備

* 以下、初回に `install-npm.bat` を実行する。バッチの内容は下記の通り。
    * `npm install -g node-gyp` を実行する。
    * electron-app ディレクトリーで `npm install` を実行する。
    * electron-app ディレクトリーで `npm run build-electron-edge-js` を実行する。
* 以下、初回や DLL を修正した場合に `publish-dll.bat` を実行する。バッチの内容は下記の通り。
    * SampleLib の発行を実行し、 electron-app\Libraries に DLL を出力する。
    * electron-app\Libraries に生成された下記ファイルを、 electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1\runtimes\win\lib\netstandard1.3 ディレクトリーにを作成してコピーする。
        * System.Diagnostics.FileVersionInfo.dll (electron-app\Libraries\refs ディレクトリーに存在。)
        * System.Text.Encoding.CodePages.dll (electron-app\Libraries\refs ディレクトリーに存在。)
        * Microsoft.DotNet.InternalAbstractions.dll
    * electron-app\Libraries\refs に生成された下記ファイルを、 electron-app\node_modules\electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1 ディレクトリーにコピーする。
    * electron-app\Libraries に生成された下記ファイルを、 electron-app\node_modules\electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1 ディレクトリーにコピーする。
        (SampleLib* はコピーしないため、 CopyExcludedFiles.txt (除外一覧)に記載。)

## 実行

* デバッグは、 electron-app ディレクトリーを Visual Studio Code で開いてデバッグを開始する。
* EXE を作成する場合は、
    * electron-app ディレクトリー以下で、 `npm run build-portable` を実行する。
    * electron-app\dist ディレクトリー以下にある EXE を実行する。

## SampleLib(DLL)の構成

* TargetFramework は .NET Core 3.1 を指定。
* 追加した NuGet パッケージは下記の通り。
    パッケージ名 | バージョン | 補足
    -------|-------|---
    Edge.js.CSharp | 1.2.0 |
    Microsoft.CodeAnalysis | 2.8.2 |
    Microsoft.CSharp | 4.5.0 |
    Microsoft.DotNet.InternalAbstractions | 1.0.0 |
    Microsoft.DotNet.PlatformAbstractions | 2.1.0 |
    Microsoft.Extensions.DependencyModel | 2.1.0 |
    Microsoft.NETCore.DotNetHost | 7.0.1 | edge-js で指定あり。
    Microsoft.NETCore.DotNetHostPolicy | 7.0.1 | edge-js で指定あり。
    System.Collections.NonGeneric | 4.3.0 |
    System.Collections.Specialized | 4.3.0 |
    System.Data.Common | 4.3.0 |
    System.Reflection.TypeExtensions | 4.4.0 |
    System.Xml.ReaderWriter | 4.3.1 |
    System.Xml.XmlSerializer | 4.3.0 |
    System.Xml.XPath.XmlDocument | 4.3.0 |
