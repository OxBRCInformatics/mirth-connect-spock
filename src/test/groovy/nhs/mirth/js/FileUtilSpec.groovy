package nhs.mirth.js

import com.mirth.connect.server.userutil.FileUtil
import nhs.mirth.EmulatorJSResource
import nhs.mirth.MirthRhinoSpec

/**
 * Created by HizniS on 01/10/2014.
 */
class FileUtilSpec extends MirthRhinoSpec {

    @Override
    List<String> getJSMocks() {
        return [EmulatorJSResource.MIRTH_CONNECT_FILE_UTIL.resourcePath]
    }

    def "The FileUtil var needs to be a reference to the Mirth FileUtil Java class"() {
        expect:scope.get("FileUtil", scope).unwrap() == FileUtil.class
    }
}