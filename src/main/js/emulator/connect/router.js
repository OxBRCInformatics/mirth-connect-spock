/**
 * Created by HizniS on 04/06/2014.
 */

/**
 * Emulation of MC message router
 * @global {mcMessageRouter} Emulation of MC of MC message router
 */
var router = new mcMessageRouter();

/**
 * @constructor Constructs a mcMessageRouter Object that emulates the MC message router
 */
function mcMessageRouter() {

    /**
     * @function Pretends to route a message
     * @param {string} channelName. The name of the channel to route the message to
     * @param {string} message. The message to be routed.
     */
    this.routeMessage = function (channelName, message) {
        if (arguments.length > 2) {
            throw new Error("Use queue argument(boolean)for routeMessage is not supported in MC ver3.n");
        }
        ;
        print("[MESSAGE ROUTER DUMMY: Message routed to channel: " + channelName + "]");
    };

    /**
     * @function Pretends to route a message
     * @param {string} channelId. The Id of the channel to route the message to
     * @param {string} message. The message to be routed.
     */
    this.routeMessageByChannelId = function (channelId, message) {
        if (arguments.length > 2) {
            throw new Error("Use queue argument(boolean)for routeMessageByChannelId is not supported in MC ver3.n");
        }
        ;
        print("[MESSAGE ROUTER DUMMY: Message routed to channelId: " + channelId + "]");

    };
};
