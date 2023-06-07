package com.example.dalewbattlecardgame.services;

import com.example.dalewbattlecardgame.models.SquirrelCard;
import com.example.dalewbattlecardgame.repositorys.SquirrelCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SquirrelCardService {
    private final SquirrelCardRepository squirrelCardRepository;

    @Autowired
    public SquirrelCardService(SquirrelCardRepository squirrelCardRepository) {
        this.squirrelCardRepository = squirrelCardRepository;
    }

    public List<SquirrelCard> getSquirrelCards() {
        return squirrelCardRepository.findAll();
    }

    // Add any additional service methods for squirrel cards here

}
