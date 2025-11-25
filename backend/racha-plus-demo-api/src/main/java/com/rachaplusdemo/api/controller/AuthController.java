package com.rachaplusdemo.api.controller;

import com.rachaplusdemo.api.dto.CadastroJogadorDto;
import com.rachaplusdemo.api.dto.JogadorResponseDto;
import com.rachaplusdemo.api.service.JogadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JogadorService jogadorService;

    // Endpoint: POST /auth/cadastro
    @PostMapping("/cadastro")
    public ResponseEntity<JogadorResponseDto> cadastrar(@RequestBody CadastroJogadorDto dto) {
        // Chama o serviço para salvar
        JogadorResponseDto novoJogador = jogadorService.cadastrar(dto);

        // Retorna HTTP 201 (Created) e o JSON do jogador criado
        return ResponseEntity.status(HttpStatus.CREATED).body(novoJogador);
    }
}
