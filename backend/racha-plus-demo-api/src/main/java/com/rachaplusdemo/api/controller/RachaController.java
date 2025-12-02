package com.rachaplusdemo.api.controller;

import com.rachaplusdemo.api.dto.RachaDto;
import com.rachaplusdemo.api.model.Racha;
import com.rachaplusdemo.api.service.RachaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/rachas")
public class RachaController {

    @Autowired
    private RachaService service;

    @PostMapping
    public ResponseEntity<Racha> criar(@RequestBody RachaDto dto) {
        String emailUsuarioLogado = SecurityContextHolder.getContext().getAuthentication().getName();

        Racha rachaCriado = service.criarRacha(dto, emailUsuarioLogado);

        return ResponseEntity.status(201).body(rachaCriado);
    }

    @GetMapping
    public ResponseEntity<Set<Racha>> listarMeusRachas() {
        String emailUsuarioLogado = SecurityContextHolder.getContext().getAuthentication().getName();

        Set<Racha> meusRachas = service.listarMeusRachas(emailUsuarioLogado);

        return ResponseEntity.ok(meusRachas);
    }
}
