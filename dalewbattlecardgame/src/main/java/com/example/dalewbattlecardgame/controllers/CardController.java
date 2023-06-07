package com.example.dalewbattlecardgame.controllers;

import com.example.dalewbattlecardgame.models.Card;
import com.example.dalewbattlecardgame.models.SquirrelCard;
import com.example.dalewbattlecardgame.services.CardServices;
import com.example.dalewbattlecardgame.services.SquirrelCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cards")
@CrossOrigin(origins = "http://localhost:3000")
public class CardController {

    private final CardServices cardService;
    private final SquirrelCardService squirrelCardService;

    @Autowired
    public CardController(CardServices cardService, SquirrelCardService squirrelCardService) {
        this.cardService = cardService;
        this.squirrelCardService = squirrelCardService;
    }

    @GetMapping
    public List<Card> getCards() {
        return cardService.getCards();
    }

    @GetMapping("/squirrels") // Endpoint for getting squirrel cards
    public List<SquirrelCard> getSquirrelCards() {
        return squirrelCardService.getSquirrelCards();
    }
}
