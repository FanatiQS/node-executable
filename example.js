#!/usr/bin/env node
"\"#",`
Write-Host "\`e[A\`e[2D" -noNewLine
node $MyInvocation.MyCommand.Path
exit
`



console.log("This is printed from JavaScript");
