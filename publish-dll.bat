call dotnet publish SampleLib -p:PublishProfile=SampleLib\SampleLib\Properties\PublishProfiles\FolderProfile.pubxml

cd electron-app

call npm install -g node-gyp
call npm install
call npm run build-electron-edge-js

if not exist "node_modules\electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1\runtimes\win\lib\netstandard1.3" mkdir "node_modules\electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1\runtimes\win\lib\netstandard1.3"
copy /y Libraries\refs\System.Diagnostics.FileVersionInfo.dll "node_modules\electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1\runtimes\win\lib\netstandard1.3"
copy /y Libraries\System.Text.Encoding.CodePages.dll "node_modules\electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1\runtimes\win\lib\netstandard1.3"
copy /y Libraries\Microsoft.DotNet.InternalAbstractions.dll "node_modules\electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1\runtimes\win\lib\netstandard1.3"
xcopy /y Libraries\*.* "node_modules\electron-edge-js\lib\bootstrap\bin\Release\netcoreapp1.1" /EXCLUDE:CopyExcludedFiles.txt

pause
