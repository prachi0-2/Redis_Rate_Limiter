package dev.simplesolution.Controller;

import com.sun.management.OperatingSystemMXBean;
import org.springframework.stereotype.Component;

import java.lang.management.ManagementFactory;

@Component
public class LoadMonitor {

    private final OperatingSystemMXBean osBean;

    public LoadMonitor() {
        this.osBean = (OperatingSystemMXBean) ManagementFactory.getOperatingSystemMXBean();
    }

    public double getCurrentCpuLoad() {
        double load = osBean.getSystemCpuLoad();  // 0.0 to 1.0
        return load < 0 ? 0 : load;
    }
}
