package com.example.dalewbattlecardgame.repositorys;

import com.example.dalewbattlecardgame.models.SquirrelCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SquirrelCardRepository extends JpaRepository<SquirrelCard, Long> {
    // Fetch the squirrel card
    SquirrelCard findByName(String name);
}