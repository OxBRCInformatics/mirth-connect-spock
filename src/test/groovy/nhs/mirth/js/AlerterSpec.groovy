package nhs.mirth.js

import nhs.mirth.EmulatorJSResource
import nhs.mirth.MirthRhinoSpec
import spock.lang.Ignore
import spock.lang.Unroll

/**
 * Created by HizniS on 03/06/2014.
 */

class AlerterSpec extends MirthRhinoSpec {

	@Override
	List<String> getJSMocks() {
		return [
				EmulatorJSResource.MIRTH_CONNECT_MESSAGING.resourcePath,
				EmulatorJSResource.MIRTH_CONNECT_ALERTER.resourcePath
		]
	}

    @Ignore
    def "Testing the alerting mechanism returns XML which is then routed by the Alerting Channel"() {

        when: "an alert is fired"
        // context.evaluateString(scope, "message.setMsg('$inputData');", "messageFunctions", 1, null)
        then: "expect some XML to be returned"
        //def inputMsg = scope.get("msg", scope)
        //inputMsg.class.equals(XML)
        //!inputMsg.toString().isEmpty()
        //where:
        //inputData << ["this is some dummy data", "<XML><FIELD1>This is some dummy text</FIELD1></XML>"]
    }
}
