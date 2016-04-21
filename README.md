# bx-debugger
A NodeJS BatchX debugger.

## About
This will accept a transpiled .bat file and read errors that have been placed there by BatchX. The warnings will be gathered and then outputted in a formatted .html file for easy reading.

## Running
One must first have NodeJS v5 or above installed to the computer and PATH. Then, open a command terminal and do:

		> node main.js [filename] [strict]
		[filename] : name of file (e.g: "myfile.bat")
		[strict] : strict mode, to enable: "strict" or "true"
		[clear] : instead of entering in the filename, one can enter in "clear", which will clean the ./html folder
							e.g: > node main.js clear

Strict mode will enable additional debugging information, but this feature is not yet available.

## Other
### Debugging the Debugger
As with any program, there are errors with this one. Mostly they can be easily avoided. Although there are nearly infinite ways
to mess up a program, this particular one is not complex; if you have the correct filename written in and enough arguments supplied
it should not break.

### Why use NodeJS?
There is something inherently appealing about writing backend JavaScript.

### HTML Output
For easy viewing, a stylized version of the debugging report is available in the "html" folder and is named "output-[file]-[time].html". The output
file name uses the current UTC time to avoid collisions.
