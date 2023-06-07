package com.example.dalewbattlecardgame.repositorys;

import com.example.dalewbattlecardgame.models.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {

}
