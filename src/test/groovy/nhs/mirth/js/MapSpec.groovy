package nhs.mirth.js

import nhs.mirth.EmulatorJSResource
import nhs.mirth.MirthRhinoSpec
import spock.lang.Ignore
import spock.lang.Unroll

/**
 * Created by HizniS on 03/06/2014.
 */

class MapSpec extends MirthRhinoSpec {

	@Override
	List<String> getJSMocks() {
		return [EmulatorJSResource.MIRTH_CONNECT_MAP.resourcePath]
	}

    @Unroll
    def "Checking that any value store on map "() {
        when: "passed some key/value info"
        context.evaluateString(scope, "channelMap.put('$key', '$value');", "mapFunctions", 1, null)

        then: "check if the value stored on the map at all"
        context.evaluateString(scope, "var mapSize = channelMap.map.length;", "mapFunctions", 1, null)
        scope.get("mapSize", scope) > 0

        where:
        key          | value
        "myKey"      | "myValue"
        "anotherKey" | "anotherValue"
    }

    @Unroll
    def "Checking that correct values store on map correctly"() {

        when: "passed some key/value info"
        context.evaluateString(scope, "channelMap.put('$key', '$value');", "mapFunctions", 1, null)

        then: "check if the value stored for a particular key is the same"
        context.evaluateString(scope, "var valueOnMap = channelMap.get('$key');", "mapFunctions", 1, null)
        scope.get("valueOnMap", scope).equals(value)

        where:
        key          | value
        "myKey"      | "myValue"
        "anotherKey" | "anotherValue"
    }

    //To check that the emulator exhibits the same behaviour as if this test were run on Connect
    @Unroll
    def "Attempt to retrieve a key/value pair that does not exist on the map"() {

        when: "passed some key/value info"
        context.evaluateString(scope, "var valueOnMap = channelMap.get('$key');", "mapFunctions", 1, null)

        then: "check if the value returned is null"
        scope.get("valueOnMap", scope).equals(null)

        where:
        key << ["myKey", "anotherKey"]
    }
}
