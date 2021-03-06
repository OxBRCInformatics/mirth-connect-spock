package nhs.mirth.js

import com.mirth.connect.server.userutil.DateUtil
import nhs.mirth.EmulatorJSResource
import nhs.mirth.MirthRhinoSpec

class DateUtilSpec extends MirthRhinoSpec {

    @Override
    List<String> getJSMocks() {
        return [EmulatorJSResource.MIRTH_CONNECT_DATE_UTIL.resourcePath]
    }

    def "The DateUtil var needs to be a reference to the Mirth DateUtil Java class"() {
        expect:scope.get("DateUtil", scope).unwrap() == DateUtil.class
    }
}
