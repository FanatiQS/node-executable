## Introduction
This is an example of a way to make an executable javascript file that works on both *nix systems as well as windows.

In *nix systems, a file can be executable by putting a shebang or hashbang at the start of it. This feature has been supported in NodeJS since version 12.

Windows does not work like this and instead relies on the file extension when executing the file.
This is where my little hack comes into play.

## Usage
1. Insert this chunk of code at the very top of your script.
```
#!/usr/bin/env node
"\"#"/*
Write-Host "`e[F" -noNewLine
node $MyInvocation.MyCommand.Path
exit
*/
```
2. Rename the file so it has a `.ps1` file extension
3. Run the file

## How it works
It runs the script with node on *nix while it starts of in powershell on windows and then moves over to node with the help of some powershell code.

When excuted on *nix, it is going to look at the shebang/hashbang and does not care about the file extension. The shebang/hashbang tells it to execute the script through NodeJS.

When executed on windows, it sees the `.ps1` file extension and executes the script through powershell.

We now have two languages executing the same file, so lets go through the code and see what the two languages see.

### Line 1
##### Powershell
This line is just a comment.
##### Javascript
Ignored as this is the fist line and it is a shabang/hashbang.

### Line 2
##### Powershell
A string to be printed containing a single backslash `\` and then a comment for the remainder of the line `#"/*`.
###### Javascript
A string containing an escaped quotation mark and a hash sign `\"#`. After after that the start of a multiline comment.

### Line 3 - 5
##### Powershell
It starts of by removing the printed backslash from line 2.
Then this file is run through NodeJS.
After node script has finished, powershell exits.
##### Javascript
This is still just a multiline comment.

### Line 6
##### Powershell
Has already exited and will never get down here.
##### Javascript
Ends the multiline comment to continue on with the rest of the javascript code.
