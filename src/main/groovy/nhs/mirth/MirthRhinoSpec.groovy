package nhs.mirth

import spock.lang.Specification
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

/**
 * Superclass for Spock specification tests containing helper code to make tests lightweight.
 *
 * Sets up a Rhino JavaScript context and loads the emulation tools.
 *
 * @author Ryan Brooks <ryan.brooks@ndm.ox.ac.uk>
 *
 */
abstract class MirthRhinoSpec extends Specification {


    Context context
    Scriptable scope

    List<String> defaultJSMocks = [
			EmulatorJSResource.MIRTH_CONNECT_CONSOLE.resourcePath,
			EmulatorJSResource.MIRTH_CONNECT_DATABASE.resourcePath,
			EmulatorJSResource.MIRTH_CONNECT_DATE_UTIL.resourcePath
    ]

    /**
     * Setup, prior to every spec test
     */
    void setup() {

        context = Context.enter()

        // Set version to JavaScript1.2 so that we get object-literal style
        // printing instead of "[object Object]"
        context.setLanguageVersion(Context.VERSION_1_8)

        // Initialize the standard objects (Object, Function, etc.)
        // This must be done before scripts can be executed.
        scope = context.initStandardObjects()

        /**
         * Load the emulation scripts
         */
        getJSMocks().each {
            loadJSIntoContext(it)
        }
    }

    /**
     * Teardown method, run after each test. This just ensures we've left the Rhino context.
     */
    void cleanup() {
        Context.exit();
    }

    /**
     * Load a JavaScript file into the Rhino engine. For resources held within the project you will probably want a filename like:
     * 		"/script.js" when it is stored in "/src/main/resources/script/js"
     * @param fileName The name of the file to be loaded.
     */
	void loadJSIntoContext(String fileName) {
		String incomingJS = this.class.getResource(fileName).text
		context.evaluateString(scope, incomingJS, fileName, 1, null)
	}

	/**
	 * Load a JavaScript emulator library into the context.
	 * @param resource the resource to load
	 */
	void loadJSIntoContext(EmulatorJSResource resource) {
		String incomingJS = this.class.getResource(resource.resourcePath).text
		context.evaluateString(scope, incomingJS, resource.resourcePath, 1, null)
	}

    List<String> getJSMocks() {
        return defaultJSMocks
    }
}
