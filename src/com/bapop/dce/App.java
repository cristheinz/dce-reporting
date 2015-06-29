package com.bapop.dce;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.net.MalformedURLException;
import java.net.Proxy;
import java.net.ProxySelector;
import java.net.URI;
import java.net.URL;
import java.util.Iterator;
import java.util.List;


//@Component
public class App {
	/*@Autowired
	private FaqstDAO dao;
	private void start(String[] args) {
        System.out.println("my beans method: ");
        dao.test();
    }*/
	
	
	public static void main(String[] args) throws Exception {
		App a=new App();
		a.text();
		
	}
	
	private void test() throws Exception{
		
		/*ApplicationContext context = new ClassPathXmlApplicationContext("classpath*:app-config.xml");
		
		System.out.println("aaaa: "+context.getBeanDefinitionCount()+context.getDisplayName());
		for(String s: context.getBeanDefinitionNames()){
			System.out.println(s);
		}
		App p = context.getBean(App.class);
		
		p.start(args);*/
		
		
		//new Mybean().test();
		
		//URL oracle = new URL("http://www.bancopopular.pt/");
		URL oracle = new URL("http://173.194.113.18");//this is google.com
		URI aaa= new URI("http://173.194.113.18");
        BufferedReader in = new BufferedReader(
        new InputStreamReader(aaa.toURL().openStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null)
            System.out.println(inputLine);
        in.close();
		
		
		try {

            System.setProperty("java.net.useSystemProxies","true");
            List l = ProxySelector.getDefault().select(
                        new URI("http://www.yahoo.com/"));

            for (Iterator iter = l.iterator(); iter.hasNext(); ) {

                Proxy proxy = (Proxy) iter.next();

                System.out.println("proxy hostname : " + proxy.type());

                InetSocketAddress addr = (InetSocketAddress)
                    proxy.address();

                if(addr == null) {

                    System.out.println("No Proxy");

                } else {

                    System.out.println("proxy hostname : " + 
                            addr.getHostName());

                    System.out.println("proxy port : " + 
                            addr.getPort());

                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }		
	}
	
	
	private void text(){
		
		int rid=4653;
		int r=550;
		int id=9000;
		
		int c=10;
		String s="";
		while(c<220) {
			String cell="F18r"+r+"c"+c;
			s="                <cell id=\""+rid+"\">\n"
					+"                    <property name=\"borderBottomStyle\">solid</property>\n"
					+"                    <property name=\"borderBottomWidth\">thin</property>\n"
					+"                    <property name=\"borderLeftStyle\">solid</property>\n"
					+"                    <property name=\"borderLeftWidth\">thin</property>\n"
					+"                    <property name=\"borderRightStyle\">solid</property>\n"
					+"                    <property name=\"borderRightWidth\">thin</property>\n"
					+"                    <property name=\"borderTopStyle\">solid</property>\n"
					+"                    <property name=\"borderTopWidth\">thin</property>\n";
			s+="                    <data id=\""+id+"\">\n"
					+"                        <structure name=\"numberFormat\">\n"
					+"                            <property name=\"category\">Fixed</property>\n"
					+"                            <property name=\"pattern\">#,##0.00{RoundingMode=HALF_UP}</property>\n"
					+"                        </structure>\n"
					+"                        <property name=\"textAlign\">right</property>\n"
					+"                        <property name=\"dataSet\">Data Set</property>\n"
					+"                        <list-property name=\"boundDataColumns\">\n"
					+"                            <structure>\n"
					+"                                <property name=\"name\">"+cell+"</property>\n"
					+"                                <text-property name=\"displayName\">"+cell+"</text-property>\n"
					+"                                <expression name=\"expression\" type=\"javascript\">dataSetRow[\""+cell+"\"]</expression>\n"
					+"                                <property name=\"dataType\">decimal</property>\n"
					+"                            </structure>\n"
					+"                        </list-property>\n"
					+"                        <property name=\"resultSetColumn\">"+cell+"</property>\n"
					+"                    </data>\n";
			s+="                </cell>";
			System.out.println(s);
			rid++;
			id++;
			c=c+10;
			if(c==200) rid=4821+((r/10)-31);
			if(c==210) rid=4760+((r/10)-31);
		}
		
	}
}