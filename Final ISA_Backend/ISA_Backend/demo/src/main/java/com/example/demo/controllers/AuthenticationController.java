package com.example.demo.controllers;

import com.example.demo.models.LoginResponseModel;
import com.example.demo.models.LoginUserModel;
import com.example.demo.models.RegisterUserModel;
import com.example.demo.models.UserModel;
import com.example.demo.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth/")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<UserModel> register(@RequestBody RegisterUserModel model) {
        return ResponseEntity.ok(authenticationService.signup(model));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseModel> authenticate(@RequestBody LoginUserModel model) {
        return ResponseEntity.ok(authenticationService.authenticate(model));
    }
}
