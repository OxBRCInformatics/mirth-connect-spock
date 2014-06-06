package nhs.mirth

import spock.lang.Specification
import spock.lang.Shared
import java.text.SimpleDateFormat
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

    List<String> jsMocks = [
            "src/main/js/emulator/mcConsole.js",
            "src/main/js/emulator/mcDatabase.js",
            "src/main/js/emulator/connect/dateUtil.js"
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
        jsMocks.each {
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
     * 		"src/main/js/componentX/script.js"
     * @param fileName The name of the file to be loaded.
     */
    void loadJSIntoContext(String fileName) {
        File emulatorFile = fileName as File
        context.evaluateString(scope, emulatorFile.text, emulatorFile.name, 1, null)
    }
}
