package nhs.mirth

import groovy.xml.MarkupBuilder
import java.text.SimpleDateFormat

class HL7Util {
	/**
	 * Will create an XML String containing an HL7 fragment in a heirarcical format
	 * 
	 * @param segmentName name of the HL7 segment
	 * @param hl7Fields data fields within the HL7 fragment
	 * @return String containing XML representation of HL7
	 */
	static buildHL7Segment(segmentName, hl7Fields) {
		StringWriter sw = new StringWriter()
		def inputsb = new MarkupBuilder(sw)
		def count = 1
		inputsb."$segmentName"{
			hl7Fields.each {
				"${segmentName}.${count++}"(
					it
				)
			}
		}
		return sw.toString()
	}
	
	/**
	 * Will create an XML String containing an HL7 fragment without the heirarcical format
	 * This is only found in the PID segment (which is a special case)
	 *
	 * @param segmentName name of the HL7 segment
	 * @param hl7Fields data fields within the HL7 fragment
	 * @return String containing XML representation of HL7
	 */
	static buildHL7SegmentFlat(segmentName, hl7Fields) {
		StringWriter sw = new StringWriter()
		def inputsb = new MarkupBuilder(sw)
		hl7Fields.each {
			inputsb."$segmentName"{
				it
			}
		}		
		return sw.toString()
	}
	
	static stringifyXML(xml){
		return xml.replaceAll(/>(\n|\t|\s)*</, '><').replaceAll(/\n|\t/, ' ').replaceAll(/\s+/, ' ')
	}
	
	
	static isSafeDate(pattern, date) {
		def safe = false
		try {			
			if(date.length > 0 && date != '""')
			{
				//DateUtil.getDate(pattern,date);
				def formatter = new SimpleDateFormat(pattern)
				def parsedDate = formatter.parse(date);
				
				if (parsedDate != null)
					safe = true;
			}
		}
		catch (e)
		{
			safe = false;
		}
		finally
		{
			return safe;
		}
	}
}
