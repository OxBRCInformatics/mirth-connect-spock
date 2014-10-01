package nhs.mirth;

/**
 * Collection of the available Mirth Connect Emulator JavaScript.
 * @author Ryan Brooks
 */
public enum EmulatorJSResource {
  MIRTH_CONNECT_CONSOLE('/emulator/mcConsole.js'),
  MIRTH_CONNECT_DATABASE('/emulator/mcDatabase.js'),
	MIRTH_CONNECT_ALERTER('/emulator/connect/alerter.js'),
	MIRTH_CONNECT_DATE_UTIL('/emulator/connect/dateUtil.js'),
	MIRTH_CONNECT_LOGGER('/emulator/connect/logger.js'),
	MIRTH_CONNECT_MAP('/emulator/connect/map.js'),
	MIRTH_CONNECT_MESSAGING('/emulator/connect/messaging.js'),
	MIRTH_CONNECT_ROUTING('/emulator/connect/router.js'),
	MIRTH_CONNECT_UTILS('/emulator/connect/utils.js'),
  MIRTH_CONNECT_FILE_UTIL('/emulator/connect/fileUtil.js')

    final String resourcePath

	EmulatorJSResource(String resourcePath) {
		this.resourcePath = resourcePath
    }


}
