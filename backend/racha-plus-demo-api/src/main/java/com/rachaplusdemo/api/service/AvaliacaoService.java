package com.rachaplusdemo.api.service;

import com.rachaplusdemo.api.model.Avaliacao;
import com.rachaplusdemo.api.model.Jogador;
import com.rachaplusdemo.api.repository.AvaliacaoRepository;
import com.rachaplusdemo.api.repository.JogadorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private JogadorRepository jogadorRepository;

    @Transactional
    public void avaliarJogador(Long rachaId, Long idAvaliado, Double novaNota, String emailAvaliador) {
        Jogador avaliador = jogadorRepository.findByEmail(emailAvaliador)
                .orElseThrow(() -> new RuntimeException("Avaliador não encontrado"));
        Jogador avaliado = jogadorRepository.findById(idAvaliado)
                .orElseThrow(() -> new RuntimeException("Jogador avaliado não encontrado."));

        if (avaliador.getId().equals(avaliado.getId())) {
            throw new RuntimeException("Você não pode avaliar a si mesmo!");
        }
        if (novaNota < 0 || novaNota > 5) {
            throw new RuntimeException("A nota deve ser entre 0 e 5.");
        }
        if (novaNota % 0.5 != 0) {
            throw new RuntimeException("A nota deve ser em incrementos de 0.5 (ex: 3.5, 4.0, 4.5).");
        }

        Avaliacao avaliacao = avaliacaoRepository.findByAvaliadorAndAvaliado(avaliador, avaliado)
                .orElse(new Avaliacao(avaliador, avaliado, novaNota));

        avaliacao.setNota(novaNota);
        avaliacaoRepository.save(avaliacao);

        atualizarMediaDoJogador(avaliado);
    }

    private void atualizarMediaDoJogador(Jogador avaliado) {
        List<Avaliacao> todasAvaliacoes = avaliacaoRepository.findByAvaliado(avaliado);

        if (todasAvaliacoes.isEmpty()) {
            avaliado.setRating(3.0);
        } else {
            double soma = todasAvaliacoes.stream().mapToDouble(Avaliacao::getNota).sum();
            double media = soma / todasAvaliacoes.size();

            avaliado.setRating(media);
        }

        jogadorRepository.save(avaliado);
    }
}
