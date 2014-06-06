/**
 * Created by HizniS on 03/06/2014.
 */

/**
 * Emulation of the MC logger object. An instance of mcLogger
 * @global {mcLogger} Emulation of the MC logger object. An instance of mcLogger
 */
var logger = new mcLogger();
var MirthConnectConsole = new mcConsole();
/**
 * @constructor Constructs a mcLogger Object that resembles MC 'logger'
 */
function mcLogger() {
    /**
     * @function info
     * @param {any} value. Values to be 'logged'
     */
    this.info = function (value) {
        MirthConnectConsole.addOutput("[" + DateUtil.getCurrentDate("yyyy-MM-dd HH:mm:ss") + ".000] INFO " + concatArguments(arguments));
    };

    /**
     * @function error
     * @param {any} value. Values to be 'logged'
     */
    this.warn = function (value) {
        MirthConnectConsole.addOutput("[" + DateUtil.getCurrentDate("yyyy-MM-dd HH:mm:ss") + ".000] WARN " + concatArguments(arguments));
    };


    /**
     * @function error
     * @param {any} value. Values to be 'logged'
     */
    this.error = function (value) {
        MirthConnectConsole.addOutput("[" + DateUtil.getCurrentDate("yyyy-MM-dd HH:mm:ss") + ".000] ERROR " + concatArguments(arguments));
    };

    /**
     * @function Builds the log string from a functions arguments
     * @param {arguments} args. The argument list to be processed
     * @returns {string} The concatenated argument list
     */
    function concatArguments(args) {
        var returnString = "";

        for (var index = 0; index < args.length; index++) {
            returnString += args[index];
        }
        return returnString;
    }
}
