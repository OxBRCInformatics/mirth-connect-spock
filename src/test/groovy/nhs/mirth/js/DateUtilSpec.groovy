package nhs.mirth.js

import nhs.mirth.DateUtil
import nhs.mirth.MirthRhinoSpec

class DateUtilSpec extends MirthRhinoSpec {

    def "The DateUtil var needs to be a reference to the Mirth DateUtil Java class"() {
        expect:scope.get("DateUtil", scope).unwrap() == DateUtil.class
    }
}
