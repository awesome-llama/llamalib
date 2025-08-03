:: Build sb3 files for all project folders

cd %~dp0

goboscript build "cmd"
goboscript build "CSKV"
goboscript build "geo2D"
goboscript build "LUTs"
goboscript build "PTE"
goboscript build "template"

pause