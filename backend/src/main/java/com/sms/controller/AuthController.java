package com.sms.controller;

import com.sms.dto.AuthRequest;
import com.sms.dto.JwtResponse;
import com.sms.dto.MessageResponse;
import com.sms.model.Role;
import com.sms.model.User;
import com.sms.repository.UserRepository;
import com.sms.security.jwt.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    // ✅ ROOT WELCOME (Public)
    @GetMapping("/")
    public ResponseEntity<String> welcome() {
        return ResponseEntity.ok("Student Management System API is Live! 🚀");
    }

    // ✅ LOGIN
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateJwtToken(authentication);

        // ✅ FIXED: Cast to your custom User model
        com.sms.model.User userDetails = (com.sms.model.User) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(), 
                userDetails.getUsername(),
                userDetails.getAuthorities().toString()
        ));
    }

    // ✅ REGISTER
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody AuthRequest signUpRequest) {

        // Check if username already exists
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        // Create new user
        User user = User.builder()
                .username(signUpRequest.getUsername())
                .password(encoder.encode(signUpRequest.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}