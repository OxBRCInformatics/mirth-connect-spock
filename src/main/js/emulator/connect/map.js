/**
 * Created by HizniS on 03/06/2014.
 */

/**
 * Emulation of the MC global map
 * @global {mcMapper} Emulation of the MC global map
 */
var globalMap = new mcMapper();
/**
 * Emulation of the MC channel map
 * @global {mcMapper} Emulation of the MC channel map
 */
var channelMap = new mcMapper();
/**
 * Emulation of the MC global channel map
 * @global {mcMapper} Emulation of the MC global channel map
 */
var globalChannelMap = new mcMapper();
/**
 * Emulation of the MC response map
 * @global {mcMapper} Emulation of the MC response map
 */
var responseMap = new mcMapper();
/**
 * Emulation of the MC connector map
 * @global {mcMapper} Emulation of the MC connector map
 */
var connectorMap = new mcMapper();

/**
 * @constructor Constructs a mcMapper Object that resembles MC variable maps
 */
function mcMapper() {
    this.map = [];
    /**
     * @function put
     * @param {string} key. Key value that will identify the mapper variable
     * @param {string,number,object} value. Primitive or Object to be held on map
     */
    this.put = function (key, value) {
        this.map.unshift(new this.keyValue(key, value));
    };

    /**
     * @function get
     * @param {string} key Key value that will identify the mapper variable
     * @returns The primitive or object held on the map against the key. Returns null if key not found on map.
     */
    this.get = function (key) {
        var foundValue = null;

        for (var index = 0; index < this.map.length; index++) {
            if (this.map[index].key === key) {
                foundValue = this.map[index].value;
            }
        }
        return foundValue;
    };
    /**
     * @constructor Constructs a keyValue data structure object
     * @param {string} key Key value that will identify the mapper variable
     * @returns
     */
    this.keyValue = function (key, value) {
        this.key = key;
        this.value = value;
    };
}