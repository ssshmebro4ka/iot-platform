package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/iot")
public class DeviceController {

    private final DeviceRepository repository;

    public DeviceController(DeviceRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/data")
    public DeviceData receiveData(@RequestParam String deviceId, @RequestParam Double temperature) {
        DeviceData data = new DeviceData();
        data.setDeviceId(deviceId);
        data.setTemperature(temperature);
        data.setTimestamp(LocalDateTime.now());
        return repository.save(data);
    }

    @GetMapping("/data")
    public List<DeviceData> getAllData() {
        return repository.findAll();
    }
}