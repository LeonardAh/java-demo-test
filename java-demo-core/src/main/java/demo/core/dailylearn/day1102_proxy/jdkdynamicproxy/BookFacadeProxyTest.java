package demo.core.dailylearn.day1102_proxy.jdkdynamicproxy;

/**
 * Created by zhongya on 2017/11/3.
 */
public class BookFacadeProxyTest {
    public static void main(String[] args) {
        BookFacadeImpl bookFacadeImpl = new BookFacadeImpl();
        BookFacadeProxy bookFacadeProxy = new BookFacadeProxy();
        BookFacade bookFacade = (BookFacade) bookFacadeProxy.bind(bookFacadeImpl);
        bookFacade.addBook();
    }
}
