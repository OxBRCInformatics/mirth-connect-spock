package nhs.mirth.js

import nhs.mirth.EmulatorJSResource
import nhs.mirth.MirthRhinoSpec
import spock.lang.Unroll

/**
 * Created by HizniS on 03/06/2014.
 * References mcConsole.js - emulates the Mirth Connect console
 */
class LoggerSpec extends MirthRhinoSpec {

	@Override
	List<String> getJSMocks() {
		return [EmulatorJSResource.MIRTH_CONNECT_CONSOLE.resourcePath,
				EmulatorJSResource.MIRTH_CONNECT_LOGGER.resourcePath,
				EmulatorJSResource.MIRTH_CONNECT_DATE_UTIL.resourcePath]
	}

    @Unroll
    def "Check that call to logger produces output on console"() {
        when: "passed some logger message data"
        context.evaluateString(scope, "logger.info('$inputData');", "loggerFunctions", 1, null)

        then: "expect the same message to be output to console"
        context.evaluateString(scope, "var returnedConsoleOutput = MirthConnectConsole.getLastOutput();", "loggerFunctions", 1, null)
        //using contains since Connect adds an additional prefix onto any console output: [UTC datetime] debugLevel message
        scope.get("returnedConsoleOutput", scope).contains(inputData)

		where:
        inputData << ["this is some dummy data", "some more dummy data"]
    }
}
