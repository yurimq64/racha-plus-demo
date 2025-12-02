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
        novoRacha.setEsporte(dto.esporte());
        novoRacha.setDono(criador);
        novoRacha.getElenco().add(criador);

        return rachaRepository.save(novoRacha);
    }

    public Set<Racha> listarMeusRachas(String emailUsuario) {
        Jogador jogador = jogadorRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Jogador não encontrado"));

        return jogador.getRachas();
    }

    public void adicionarJogador(Long rachaId, String emailNovoJogador, String emailLogado) {
        Racha racha = rachaRepository.findById(rachaId)
                .orElseThrow(() -> new RuntimeException("Racha não encontrado"));

        if (!emailLogado.equals(racha.getDono().getEmail())) {
            throw new RuntimeException("Apenas o dono do racha pode adicionar membros");
        }

        Jogador novoJogador = jogadorRepository.findByEmail(emailNovoJogador)
                .orElseThrow(() -> new RuntimeException("Jogador não encontrado"));

        if (racha.getElenco().contains(novoJogador)) {
            throw new RuntimeException("Este jogador já faz parte do racha");
        }

        racha.getElenco().add(novoJogador);
        rachaRepository.save(racha);
    }
}
