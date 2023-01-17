set RootDir=%~dp0

@REM DLL を発行する。
cd %RootDir%"EdgeJsCSharpSharedLib"
call dotnet publish EdgeJsCSharpSharedLib -p:PublishProfile=EdgeJsCSharpSharedLib\Properties\PublishProfiles\FolderProfile.pubxml
cd %RootDir%"SampleLib"
call dotnet publish SampleLib             -p:PublishProfile=SampleLib\Properties\PublishProfiles\FolderProfile.pubxml

@REM electron-edge-js が参照する場所に Runtime をコピーする。
cd %RootDir%"electron-app"

set EdgeJSDir="node_modules\electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1"

if not exist %EdgeJSDir%"\runtimes\win\lib\netstandard1.3" mkdir %EdgeJSDir%"\runtimes\win\lib\netstandard1.3"

copy /y Libraries\refs\System.Diagnostics.FileVersionInfo.dll %EdgeJSDir%"\runtimes\win\lib\netstandard1.3"
copy /y Libraries\refs\System.Text.Encoding.CodePages.dll     %EdgeJSDir%"\runtimes\win\lib\netstandard1.3"
copy /y Libraries\Microsoft.DotNet.InternalAbstractions.dll   %EdgeJSDir%"\runtimes\win\lib\netstandard1.3"

copy /y Libraries\refs\*.* %EdgeJSDir%
xcopy /y Libraries\*.*     %EdgeJSDir% /EXCLUDE:CopyExcludedFiles.txt

copy /y SharedLibraries\System.Reflection.TypeExtensions.dll %EdgeJSDir%
copy /y SharedLibraries\Edge.js.CSharp.dll                   %EdgeJSDir%

pause
