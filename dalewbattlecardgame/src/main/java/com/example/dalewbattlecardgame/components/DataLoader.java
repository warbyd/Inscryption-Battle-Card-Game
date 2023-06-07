package com.example.dalewbattlecardgame.components;

import com.example.dalewbattlecardgame.models.Card;
import com.example.dalewbattlecardgame.models.SquirrelCard;
import com.example.dalewbattlecardgame.repositorys.CardRepository;
import com.example.dalewbattlecardgame.repositorys.SquirrelCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final CardRepository cardRepository;
    private final SquirrelCardRepository squirrelCardRepository;

    @Autowired
    public DataLoader(CardRepository cardRepository, SquirrelCardRepository squirrelCardRepository) {
        this.cardRepository = cardRepository;
        this.squirrelCardRepository = squirrelCardRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        loadCards();
    }

    private void loadCards() {
        Card card1 = new Card("Wolf", 3, 2, 2, "", "https://static.wikia.nocookie.net/inscryption/images/c/c8/Wolf.png/revision/latest?cb=20211025015530", "Wolf1Defense.png", false);
        Card card2 = new Card("Adder", 1, 1, 2, "Instant Kill", "https://static.wikia.nocookie.net/inscryption/images/4/47/Adder_emission.png/revision/latest?cb=20211025011417", "", false);
        Card card3 = new Card("Porcupine", 1, 2, 1, "Thornmail", "https://static.wikia.nocookie.net/inscryption/images/1/1c/Porcupine.png/revision/latest?cb=20211025014329", "", false);
        Card card4 = new Card("Mantis", 1, 1, 1, "Double Attack", "https://static.wikia.nocookie.net/inscryption/images/4/48/Mantis.png/revision/latest?cb=20211025014303", "", false);
        Card card5 = new Card("Wolf", 3, 2, 2, "", "https://static.wikia.nocookie.net/inscryption/images/c/c8/Wolf.png/revision/latest?cb=20211025015530", "Wolf1Defense.png", false);
        Card card6 = new Card("Adder", 1, 1, 2, "Instant Kill", "https://static.wikia.nocookie.net/inscryption/images/4/47/Adder_emission.png/revision/latest?cb=20211025011417", "", false);
        Card card7 = new Card("Porcupine", 1, 2, 1, "Thornmail", "https://static.wikia.nocookie.net/inscryption/images/1/1c/Porcupine.png/revision/latest?cb=20211025014329", "", false);
        Card card8 = new Card("Mantis", 1, 1, 1, "Double Attack", "https://static.wikia.nocookie.net/inscryption/images/4/48/Mantis.png/revision/latest?cb=20211025014303", "", false);
        Card card9 = new Card("Wolf", 3, 2, 2, "", "https://static.wikia.nocookie.net/inscryption/images/c/c8/Wolf.png/revision/latest?cb=20211025015530", "Wolf1Defense.png", false);
        Card card10 = new Card("Adder", 1, 1, 2, "Instant Kill", "https://static.wikia.nocookie.net/inscryption/images/4/47/Adder_emission.png/revision/latest?cb=20211025011417", "", false);
        Card card11 = new Card("Porcupine", 1, 2, 1, "Thornmail", "https://static.wikia.nocookie.net/inscryption/images/1/1c/Porcupine.png/revision/latest?cb=20211025014329", "", false);
        Card card12 = new Card("Mantis", 1, 1, 1, "Double Attack", "https://static.wikia.nocookie.net/inscryption/images/4/48/Mantis.png/revision/latest?cb=20211025014303", "", false);
        Card card13 = new Card("Wolf", 3, 2, 2, "", "https://static.wikia.nocookie.net/inscryption/images/c/c8/Wolf.png/revision/latest?cb=20211025015530", "Wolf1Defense.png", false);
        Card card14 = new Card("Adder", 1, 1, 2, "Instant Kill", "https://static.wikia.nocookie.net/inscryption/images/4/47/Adder_emission.png/revision/latest?cb=20211025011417", "", false);
        Card card15 = new Card("Porcupine", 1, 2, 1, "Thornmail", "https://static.wikia.nocookie.net/inscryption/images/1/1c/Porcupine.png/revision/latest?cb=20211025014329", "", false);
        Card card16 = new Card("Mantis", 1, 1, 1, "Double Attack", "https://static.wikia.nocookie.net/inscryption/images/4/48/Mantis.png/revision/latest?cb=20211025014303", "", false);

        SquirrelCard squirrelCard1 = new SquirrelCard("Squirrel", 0, 1, 0, "Sacrifice", "https://static.wikia.nocookie.net/inscryption/images/4/41/Squirrel.png/revision/latest?cb=20220116183903", "");
        SquirrelCard squirrelCard2 = new SquirrelCard("Squirrel", 0, 1, 0, "Sacrifice", "https://static.wikia.nocookie.net/inscryption/images/4/41/Squirrel.png/revision/latest?cb=20220116183903", "");
        SquirrelCard squirrelCard3 = new SquirrelCard("Squirrel", 0, 1, 0, "Sacrifice", "https://static.wikia.nocookie.net/inscryption/images/4/41/Squirrel.png/revision/latest?cb=20220116183903", "");
        SquirrelCard squirrelCard4 = new SquirrelCard("Squirrel", 0, 1, 0, "Sacrifice", "https://static.wikia.nocookie.net/inscryption/images/4/41/Squirrel.png/revision/latest?cb=20220116183903", "");
        SquirrelCard squirrelCard5 = new SquirrelCard("Squirrel", 0, 1, 0, "Sacrifice", "https://static.wikia.nocookie.net/inscryption/images/4/41/Squirrel.png/revision/latest?cb=20220116183903", "");
        SquirrelCard squirrelCard6 = new SquirrelCard("Squirrel", 0, 1, 0, "Sacrifice", "https://static.wikia.nocookie.net/inscryption/images/4/41/Squirrel.png/revision/latest?cb=20220116183903", "");
        SquirrelCard squirrelCard7 = new SquirrelCard("Squirrel", 0, 1, 0, "Sacrifice", "https://static.wikia.nocookie.net/inscryption/images/4/41/Squirrel.png/revision/latest?cb=20220116183903", "");
        SquirrelCard squirrelCard8 = new SquirrelCard("Squirrel", 0, 1, 0, "Sacrifice", "https://static.wikia.nocookie.net/inscryption/images/4/41/Squirrel.png/revision/latest?cb=20220116183903", "");
        SquirrelCard squirrelCard9 = new SquirrelCard("Squirrel", 0, 1, 0, "Sacrifice", "https://static.wikia.nocookie.net/inscryption/images/4/41/Squirrel.png/revision/latest?cb=20220116183903", "");

        cardRepository.save(card1);
        cardRepository.save(card2);
        cardRepository.save(card3);
        cardRepository.save(card4);
        cardRepository.save(card5);
        cardRepository.save(card6);
        cardRepository.save(card7);
        cardRepository.save(card8);
        cardRepository.save(card9);
        cardRepository.save(card10);
        cardRepository.save(card11);
        cardRepository.save(card12);
        cardRepository.save(card13);
        cardRepository.save(card14);
        cardRepository.save(card15);
        cardRepository.save(card16);

        // Save squirrel card to the squirrelCardRepository
        squirrelCardRepository.save(squirrelCard1);
        squirrelCardRepository.save(squirrelCard2);
        squirrelCardRepository.save(squirrelCard3);
        squirrelCardRepository.save(squirrelCard4);
        squirrelCardRepository.save(squirrelCard5);
        squirrelCardRepository.save(squirrelCard6);
        squirrelCardRepository.save(squirrelCard7);
        squirrelCardRepository.save(squirrelCard8);
        squirrelCardRepository.save(squirrelCard9);

    }
}
