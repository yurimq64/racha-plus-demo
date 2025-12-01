package com.rachaplusdemo.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rachaplusdemo.api.enums.Esporte;
import jakarta.persistence.*;
import lombok.*;

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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Esporte esporte;

    @ManyToOne
    @JoinColumn(name = "dono_id", nullable = false)
    private Jogador dono;

    @ManyToMany
    @JoinTable(
            name = "racha_elenco",
            joinColumns = @JoinColumn(name = "racha_id"),
            inverseJoinColumns = @JoinColumn(name = "jogador_id")
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private Set<Jogador> elenco = new HashSet<>();
}