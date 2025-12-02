package com.rachaplusdemo.api.repository;

import com.rachaplusdemo.api.model.Avaliacao;
import com.rachaplusdemo.api.model.Jogador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    Optional<Avaliacao> findByAvaliadorAndAvaliado(Jogador avaliador, Jogador avaliado);

    List<Avaliacao> findByAvaliado(Jogador avaliado);
}
