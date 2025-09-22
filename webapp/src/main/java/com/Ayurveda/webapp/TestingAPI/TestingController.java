package com.Ayurveda.webapp.TestingAPI;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestingController {
    @GetMapping
    public String getHello(){
        return "hello";
    }

}
