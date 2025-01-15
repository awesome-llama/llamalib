:: Build sb3 files for all project folders

cd %~dp0

goboscript build -i "cmd"
goboscript build -i "CSKV"
goboscript build -i "geo2D"
goboscript build -i "LUTs"
goboscript build -i "PTE"
goboscript build -i "template"

pause