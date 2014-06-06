var MirthConnectConsole = new mcConsole();

/**
 * Emulation of the MC Console 
 * @author Hizni Salih
 * @global {mcConsole} Emulation of the MC Console. Provides us a means by which to use the console
 *						and inspect the output that has been passed to it within our testing framework.
 *                        Referenced by mcEm.js
 *                       Refactored mcEm.js - now is referenced by logger.js
 */
function mcConsole(){

	var console = [];

	/**
	* @description puts a line onto the console
	*/
	this.addOutput = function(consoleText) {
		console.push(consoleText);
	}

	/**
	* @description returns the just the last line output to the console
	*/	
	this.getLastOutput = function(){
		return console[console.length - 1];
	}

	/**
	* @description 	returns all the console output
	*/	
	this.getAllOutput = function(){
		var consoleText = '';
		for(var i = 0; i < console.length; i++){
			consoleText += console[i] + "\r\n";
		}
		return consoleText;
	}
}