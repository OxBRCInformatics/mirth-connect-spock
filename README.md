# Mirth Connect testing made easy with Spock

This library provides a suite of tools to make testing Mirth Connect channels much simpler. Get up and running quickly:
#####Gradle (build.gradle)
```groovy
dependencies{
	compile "uk.nhs.ouh.mirth:mirth-connect-spock:1.0.0"
}
```
##### Maven (pom.xml)
```xml
<dependencies>
	<dependency>
		<artifactId>mirth-connect-spock</artifactId>
		<groupId>uk.nhs.ouh.mirth</groupId>
		<version>1.0.0</version>
	</dependency>
</dependencies>
```


# To test a new Mirth Connect library

1. Create a Gradle project
2. Add this project as a dependency in your `build.gradle`
2. Add your JavaScript functions from Mirth Connect into `/src/main/js/`
3. Start writing your specification tests using Spock in `/src/test/groovy/`
4. TODO complete this bit, including MVN/Gradle reqs

# Testing Mirth Results components

Yeah, that's possible too. Unlike Mirth Connect, the Mirth Results domain classes aren't in the public domain, but once you've obtained a copy for MirthCorp you can just include the library in your Gradle project and it'll just work.

1. Create a `lib/` directory, and place the Mirth Results (or any other useful libraries **not** available through Maven) JAR file there
2. In the `dependencies` section of your `build.gradle` add `compile fileTree(dir: 'lib', include: '*.jar')`
3. Crack on! Use the standard Rhino method to access the Java class (e.g. `var myClassOfInterest = Packages.com.mirth.results.ClassOfInterest;`)

# Contributing

Pull requests, issues and abuse on Twitter are all welcome!

### Publishing
To publish this to Bintray you need to update the credentials in `build.gradle` and then run the following:

```bash
$ gradle build
$ gradle bintrayUpload
```

# License

This project is released under the MIT License (MIT)

Copyright (c) 2014 Ryan Brooks

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
