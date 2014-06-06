/**
 * Created by HizniS on 02/06/2014.
 */

/**
 * Emulation of the MC msg XML object
 * @global Emulation of the MC msg XML object
 */
var msg = new XML("");
/**
 * Emulation of the MC tmp XML object
 * @global Emulation of the MC tmp XML object
 */
var tmp = new XML("");

/**
 * Available in order to allow easy creation of emulated 'tmp' and 'msg' objects
 * @global {mcMessage} Available in order to allow easy creation of emulated 'tmp' and 'msg' objects
 */
var message = new mcMessage();

function mcMessage() {
    /**
     * @function setTmp
     * @param {string, xml} message. The source of the template, either a string or xml document
     */
    this.setTmp = function (message) {
        tmp = makeMessage(message);
    };

    /**
     * @function setMsg
     * @param {string, xml} message. The source of the message either, a string or xml document
     */
    this.setMsg = function (message) {
        msg = makeMessage(message);
    };

    /**
     * @function Build a message XML document
     * @param {string, xml} message. The source for the message as a string or XML document
     * @returns {xml} The XML message document
     */
    function makeMessage(message) {
        if (typeof message === "xml") {
            return message;
        }
        else if (typeof message === "string") {
            return new XML(message);
        }
        else {
            throw new Error("mcMessage - Argument must be of type 'xml' or type 'string' but was of type " + typeof message);
        }
    }
}