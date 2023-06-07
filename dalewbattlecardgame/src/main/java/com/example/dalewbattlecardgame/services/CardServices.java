package com.example.dalewbattlecardgame.services;

import com.example.dalewbattlecardgame.models.Card;
import com.example.dalewbattlecardgame.repositorys.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardServices {

    private final CardRepository cardRepository;

    @Autowired
    public CardServices(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public List<Card> getCards() {
        return cardRepository.findAll();
    }
}
