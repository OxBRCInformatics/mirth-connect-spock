package nhs.mirth.js

import nhs.mirth.MirthRhinoSpec
import org.mozilla.javascript.xmlimpl.XML
import spock.lang.Unroll

/**
 * Created by HizniS on 03/06/2014.
 */
class MessagingSpec extends MirthRhinoSpec {

    @Unroll
    def "Setting the inbound message (msg) object"() {
        setup:
        loadJSIntoContext("src/main/js/emulator/connect/messaging.js")
        when: "passed some input message data"
        context.evaluateString(scope, "message.setMsg('$inputData');", "messageFunctions", 1, null)
        then: "expect some XML to be returned"
        def inputMsg = scope.get("msg", scope)
        inputMsg.class.equals(XML)
        !inputMsg.toString().isEmpty()
        where:
        inputData << ["this is some dummy data", "<XML><FIELD1>This is some dummy text</FIELD1></XML>"]
    }

    @Unroll
    def "Setting the outbound message (tmp) object"() {
        setup:
        loadJSIntoContext("src/main/js/emulator/connect/messaging.js")
        when: "passed some output template data"
        context.evaluateString(scope, "message.setTmp('$outputData');", "messageFunctions", 1, null)
        then: "expect some XML to be returned"
        def templateMsg = scope.get("tmp", scope)
        templateMsg.class.equals(XML)
        !templateMsg.toString().isEmpty()
        where:
        outputData << ["this is some output data", "<XML><OUTFIELD1>This is some dummy output text</OUTFIELD1></XML>"]
    }

}
