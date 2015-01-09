package com.bapop.dce;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
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

}