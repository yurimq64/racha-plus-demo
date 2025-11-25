package com.rachaplusdemo.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "racha")
public class Racha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @ManyToMany
    @JoinTable(
            name = "racha_elenco",
            joinColumns = @JoinColumn(name = "racha_id"),
            inverseJoinColumns = @JoinColumn(name = "jogador_id")
    )
    private Set<Jogador> elenco = new HashSet<>();
}