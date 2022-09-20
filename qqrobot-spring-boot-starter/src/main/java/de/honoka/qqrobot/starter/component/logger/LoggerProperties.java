package de.honoka.qqrobot.starter.component.logger;

import de.honoka.sdk.util.file.FileUtils;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties("honoka.qqrobot.logger")
public class LoggerProperties {

    private Class<?> databaseDriver = org.h2.Driver.class;

    private String jdbcUrl = "jdbc:h2:" + FileUtils.getClasspath() +
            "\\qqrobot\\log";
}
