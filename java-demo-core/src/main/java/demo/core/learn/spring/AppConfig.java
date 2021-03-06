package demo.core.learn.spring;

import demo.core.learn.spring.annotation.MyMapperScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * @author leonard
 * @create 2021-04-03 15:51
 */
@Configuration
@ComponentScan("demo.core.learn.spring")
@MyMapperScan(value = "demo.core.learn.spring.dao")
public class AppConfig {
}
