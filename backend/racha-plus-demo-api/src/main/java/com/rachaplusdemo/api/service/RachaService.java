package com.rachaplusdemo.api.service;

import com.rachaplusdemo.api.dto.RachaDto;
import com.rachaplusdemo.api.model.Jogador;
import com.rachaplusdemo.api.model.Racha;
import com.rachaplusdemo.api.repository.JogadorRepository;
import com.rachaplusdemo.api.repository.RachaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class RachaService {

    @Autowired
    private RachaRepository rachaRepository;

    @Autowired
    private JogadorRepository jogadorRepository;

    public Racha criarRacha(RachaDto dto, String emailCriador) {
        Jogador criador = jogadorRepository.findByEmail(emailCriador)
                .orElseThrow(() -> new RuntimeException("Jogador não encontrado"));
        Racha novoRacha = new Racha();
        novoRacha.setNome(dto.nome());
        novoRacha.getElenco().add(criador);

        return rachaRepository.save(novoRacha);
    }

    public Set<Racha> listarMeusRachas(String emailUsuario) {
        Jogador jogador = jogadorRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Jogador não encontrado"));

        return jogador.getRachas();
    }
}
