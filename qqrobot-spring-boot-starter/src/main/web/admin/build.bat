chcp 65001

rmdir /s /q ..\..\resources\web\admin
call npm run build:prod
move .\dist ..\..\resources\web\
cd ..\..\resources\web\
ren dist admin
git add admin
