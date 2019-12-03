Copy-Item -Force -Path "./fix_atom.xml" -Destination "./node_modules/hexo-generator-feed/atom.xml"
hexo clean
hexo g
git add -A
[string]$d = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m $d
git push
Write-Host "`n================ PUSH WORK over ================"

