# electron-dll-sample

[Electron](https://www.electronjs.org/) のアプリから [electron-edge-js](https://github.com/agracio/electron-edge-js) を使用して、 C# の DLL を呼び出すサンプル。

## 確認済み開発環境

1. Visual Studio Code
1. Visual Studio 2022 または Build Tools for Visual Studio 2022
    * ワークロードは下記を選択する。
        * C++ によるデスクトップ開発
        * .NET デスクトップ ビルド ツール
1. Node.js 18.12.1
1. Python 3.11.0

## EXE の実行を確認した環境

1. Windows 10 (64ビット)、 Windows 11 (64ビット) で確認。
1. [Visual C++ 再頒布可能パッケージ](https://aka.ms/vs/17/release/vc_redist.x64.exe) (64ビット)
    * [再頒布可能パッケージの最新のサポートされているダウンロードをMicrosoft Visual C++する](https://learn.microsoft.com/ja-jp/cpp/windows/latest-supported-vc-redist?view=msvc-170) または <https://my.visualstudio.com/> からダウンロードする。
1. .NET Core 3.1 SDK (64ビット)
    * [.NET Core 3.1 のダウンロード](https://dotnet.microsoft.com/ja-jp/download/dotnet/3.1) からダウンロードする。
1. .NET Framework 4.6 Runtime が必要になる可能性あり。
    * Edge.js.CSharp の動作を見る限り使用している可能性はあるが、 Windows 10、 Windows 11 には .NET Framework 4、 .NET Framework 4.8 がデフォルトでインストールされているため、要否を判断できない。エラーが発生する環境があれば .NET Framework 4.6 Runtime をチェックする。

## 注意点

* System.Reflection.TypeExtensions.dll は Edge.js.CSharp が使用する古いバージョン(4.1.0 以下)で上書きする。そのため、**自作 DLL 側が .NET Core 3.1 など新しいバージョンの際に Reflection を使えない可能性がある。**
* electron-edge-js が使用する、古いバージョンを指定する必要がある NuGet パッケージは下記の通り。**最新バージョンを使用できない可能性がある。**
    * Microsoft.CodeAnalysis
    * Microsoft.DotNet.InternalAbstractions (非推奨、更新)
    * Microsoft.DotNet.PlatformAbstractions
    * Microsoft.Extensions.DependencyModel

* C:\Users\<実行中のユーザー>\.nuget ディレクトリーに存在すると、ビルドした EXE DLL が取り込まれていない状態でも .nuget にある DLL を参照してエラーにならないため、ビルド環境で EXE の実行を確認する場合は、 .nuget ディレクトリーを参照できない状態で確認する。
    (最終的にはビルド環境以外で確認した方が良い。)

## 準備

* 初回は `install-npm.bat` を実行する。バッチの内容は下記の通り。
    * `npm install -g node-gyp` を実行する。
    * electron-app ディレクトリーで `npm install` を実行する。
    * electron-app ディレクトリーで `npm run build-electron-edge-js` を実行する。
* 初回や DLL を修正した場合、 `publish-dll.bat` を実行する。バッチの内容は下記の通り。
    * SampleLib.dll の発行を実行し、 electron-app\Libraries に DLL を出力する。
        * electron-app\Libraries に生成された下記ファイルを、 electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1\runtimes\win\lib\netstandard1.3 ディレクトリーにを作成してコピーする。
            * System.Diagnostics.FileVersionInfo.dll (electron-app\Libraries\refs ディレクトリーに存在。)
            * System.Text.Encoding.CodePages.dll (electron-app\Libraries\refs ディレクトリーに存在。)
            * Microsoft.DotNet.InternalAbstractions.dll
        * electron-app\Libraries\refs に生成されたファイルを、 electron-app\node_modules\electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1 ディレクトリーにコピーする。
        * electron-app\Libraries に生成されたファイルを、 electron-app\node_modules\electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1 ディレクトリーにコピーする。
            (SampleLib* はコピーしないため、 CopyExcludedFiles.txt (除外一覧)に記載。)
    * EdgeJsCSharpSharedLib.dll の発行を実行し、 electron-app\SharedLibraries に DLL を出力する。
        * SharedLibraries\System.Reflection.TypeExtensions.dll を、 electron-app\node_modules\electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1 ディレクトリーにコピーする。
        * SharedLibraries\Edge.js.CSharp.dll を、 electron-app\node_modules\electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1 ディレクトリーにコピーする。
* EXE を作成する場合、 `build-executable.bat` を実行する。

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
    Microsoft.CodeAnalysis | 2.8.2 | 古いバージョンを指定する必要がある。
    Microsoft.CSharp | 4.5.0 |
    Microsoft.DotNet.InternalAbstractions | 1.0.0 | 非推奨
    Microsoft.DotNet.PlatformAbstractions | 2.1.0 | 古いバージョンを指定する必要がある。
    Microsoft.Extensions.DependencyModel | 2.1.0 | 古いバージョンを指定する必要がある。
    Microsoft.NETCore.DotNetHost | 7.0.2 | edge-js で指定あり。
    Microsoft.NETCore.DotNetHostPolicy | 7.0.2 | edge-js で指定あり。
    System.Collections.NonGeneric | 4.3.0 |
    System.Collections.Specialized | 4.3.0 |
    System.Data.Common | 4.3.0 |
    System.Xml.ReaderWriter | 4.3.1 |
    System.Xml.XmlSerializer | 4.3.0 |
    System.Xml.XPath.XmlDocument | 4.3.0 |

## EdgeJsCSharpSharedLib(DLL)の構成

* TargetFramework は .NET Standard 1.6 を指定。
    * edge-js の環境変数 `EDGE_USE_CORECLR` を指定した場合も、古い System.Reflection.TypeExtensions.dll (4.1.0 以下) を参照していて、それを使用するため。
    * System.Reflection.TypeExtensions.dll (4.1.0) は、他の DLL とバージョン不整合を起こして SampleLib には追加できないため、 EdgeJsCSharpSharedLib を用意して取り出す。
* 追加した NuGet パッケージは下記の通り。
    パッケージ名 | バージョン | 補足
    -------|-------|---
    Edge.js.CSharp | 1.2.0 |
