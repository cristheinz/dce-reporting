package com.bapop.dce.util;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
 
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;
import org.springframework.stereotype.Component;

@Component
public class JsonTimeSerializer extends JsonSerializer<Date>{
	//private static final SimpleDateFormat dateFormat = new SimpleDateFormat("MM-dd-yyyy");
	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss.SSS");
	 
    @Override
    public void serialize(Date date, JsonGenerator gen, SerializerProvider provider)
            throws IOException, JsonProcessingException {
 
        String formattedDate = dateFormat.format(date);
 
        gen.writeString(formattedDate);
    }

}
