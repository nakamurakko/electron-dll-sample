@REM DLL を発行する。
call dotnet publish SampleLib -p:PublishProfile=SampleLib\SampleLib\Properties\PublishProfiles\FolderProfile.pubxml


@REM electron-edge-js が参照する場所に Runtime をコピーする。
set EdgeJSDir="node_modules\electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1"

cd electron-app

if not exist %EdgeJSDir%"\runtimes\win\lib\netstandard1.3" mkdir %EdgeJSDir%"\runtimes\win\lib\netstandard1.3"

copy /y Libraries\refs\System.Diagnostics.FileVersionInfo.dll %EdgeJSDir%"\runtimes\win\lib\netstandard1.3"
copy /y Libraries\refs\System.Text.Encoding.CodePages.dll     %EdgeJSDir%"\runtimes\win\lib\netstandard1.3"
copy /y Libraries\Microsoft.DotNet.InternalAbstractions.dll   %EdgeJSDir%"\runtimes\win\lib\netstandard1.3"

copy /y Libraries\refs\*.* %EdgeJSDir%
xcopy /y Libraries\*.*     %EdgeJSDir% /EXCLUDE:CopyExcludedFiles.txt

pause
