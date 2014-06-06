/**
 * Created by HizniS on 04/06/2014.
 */

/**
 * Emulation of channelId
 * @global {string} Emulation of channelId
 */
var channelId = getGuid();

/**
 * Emulation MC channel utility
 * @global {mcAlerter} Emulation of MC of MC message router
 */
var ChannelUtil = new mcChannelUtililty();

/**
 * @function getGuid
 * @returns {string} Pseudo-random GUID style string
 */
function getGuid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
}

function mcChannelUtililty() {
    this.getDeployedChannelName = function (channelId) {
        return('DUMMY_CHANNEL');
    };
};