package com.example.usermanagement.controller;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;

/**
 * Controller to redirect root context to Swagger UI
 */
@Controller
@Hidden
public class ApiDocController {

    @GetMapping("/")
    public RedirectView redirectToSwaggerUi() {
        return new RedirectView("/api/swagger-ui.html");
    }
}
