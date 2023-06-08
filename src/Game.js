import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Game.css';



function Game() {
  const [cardsData, setCardsData] = useState([]);
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [player2Deck, setPlayer2Deck] = useState([]);
  const [player1Hand, setPlayer1Hand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);
  const [player1Board, setPlayer1Board] = useState(Array(4).fill(null));
  const [player2Board, setPlayer2Board] = useState(Array(4).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isPlayingCard, setIsPlayingCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [squirrelDeck, setSquirrelDeck] = useState([])
  const [player1HasDrawnCard, setPlayer1HasDrawnCard] = useState(false);
  const [player2HasDrawnCard, setPlayer2HasDrawnCard] = useState(false);
  const [turnNumber, setTurnNumber] = useState(1);
  const [sacrificedCards, setSacrificedCards] = useState([]);
  const [isCardDrawn, setIsCardDrawn] = useState(false);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const [isPlayer2Turn, setIsPlayer2Turn] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [balanceScale, setBalanceScale] = useState(0);
  







  
  


  



  useEffect(() => {
    const fetchData = async () => {
        try {
            const [regularCardsResponse, squirrelCardsResponse] = await Promise.all([
                fetch('http://localhost:8080/cards').then(response => response.json()),
                fetch('http://localhost:8080/cards/squirrels').then(response => response.json())
            ]);

            console.log('Fetched regular cards data:', regularCardsResponse);
            console.log('Fetched squirrel cards data:', squirrelCardsResponse);

            // Log the name property of the first squirrel card
            if (squirrelCardsResponse.length > 0) {
                console.log('Name of first squirrel card:', squirrelCardsResponse[0].name);
            }

            setCardsData(regularCardsResponse);
            initializeDecks(regularCardsResponse, squirrelCardsResponse);
        } catch (error) {
            console.error('Error fetching or initializing data:', error);
        }
    };

    fetchData();
}, []);

  

const initializeDecks = (data, squirrelCards) => {
  console.log('Initializing decks...');
  console.log('Initial squirrelCards:', squirrelCards);
  const shuffledDeck = shuffleArray(data.map(card => ({ ...card, sacrificing: false })));
  console.log('Deck after adding sacrificing state:', shuffledDeck);
  const sharedDeck = shuffledDeck.slice(0, data.length - 4);
  console.log('Shuffled deck:', shuffledDeck);
  console.log('Shared deck:', sharedDeck);

  const squirrelDeckWithSacrificingState = squirrelCards.map(card => ({ ...card }));
  console.log('Squirrel deck after adding sacrificing state:', squirrelDeckWithSacrificingState);

  // Log the name property of the first squirrel card
  if (squirrelDeckWithSacrificingState.length > 0) {
    console.log('Name of first squirrel card after adding sacrificing state:', squirrelDeckWithSacrificingState[0].name);
  }

  setPlayer1Deck([...sharedDeck]);
  setPlayer2Deck([...sharedDeck]);
  setSquirrelDeck([...squirrelDeckWithSacrificingState]);

  initializeHands([...sharedDeck]);
};



  
  const shuffleArray = array => {
    console.log('Shuffling array...');
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    console.log('Shuffled array:', shuffledArray);
    return shuffledArray;
  };
  
  const drawSpecificCard = (deck, prop, value) => {
    console.log('Drawing specific card...');
    for (let i = 0; i < deck.length; i++) {
      if (deck[i][prop] === value) {
        return deck.splice(i, 1)[0];
      }
    }
  };
  
  const drawRandomCards = (deck, numCards) => {
    console.log('Drawing random cards...');
    const shuffledDeck = shuffleArray(deck);
    let drawnCards = [];
  
    const cardWithSacrificeValueOne = drawSpecificCard(shuffledDeck, 'sacrificeCardsNeeded', 1);
    if (cardWithSacrificeValueOne) {
      drawnCards.push(cardWithSacrificeValueOne);
      numCards--;
    }
  
    drawnCards = [...drawnCards, ...shuffledDeck.slice(0, numCards)];
    console.log('Drawn cards:', drawnCards);
    return drawnCards;
  };
  
  const initializeHands = (sharedDeck) => {
    console.log('Initializing hands...');
  
    // First draw a card with sacrificeCardsNeeded value of 1.
    const cardWithSacrificeValueOne = drawSpecificCard(sharedDeck, 'sacrificecardsneeded', 1);
  
    // Then draw 2 more random cards.
    const player1RandomCards = drawRandomCards(sharedDeck, 2);
  
    const player1Hand = [
      cardWithSacrificeValueOne, 
      ...player1RandomCards,
      { ...squirrelDeck[0], type: 'Squirrel', sacrificing: false, attack: 0, defense: 1 },
    ];
  
    console.log('Player 1 hand after adding sacrificing state:', player1Hand);
  
    // Repeat for player 2.
    const cardWithSacrificeValueOneForPlayer2 = drawSpecificCard(sharedDeck, 'sacrificecardsneeded', 1);
    const player2RandomCards = drawRandomCards(sharedDeck, 2);
  
    const player2Hand = [
      cardWithSacrificeValueOneForPlayer2,
      ...player2RandomCards,
      { ...squirrelDeck[0], type: 'Squirrel', sacrificing: false, attack: 0, defense: 1 },
    ];
  
    console.log('Player 2 hand after adding sacrificing state:', player2Hand);
  
    setPlayer1Hand([...player1Hand]);
    setPlayer2Hand([...player2Hand]);
  
    setPlayer1HasDrawnCard(false);
    setPlayer2HasDrawnCard(false);
  };
  
  
  

  
  
  const drawCard = (playerNumber, isSquirrel) => {
    console.log(`Player ${playerNumber} is attempting to draw a card...`);
  
    const playerHand = playerNumber === 1 ? player1Hand : player2Hand;
    const setPlayerHand = playerNumber === 1 ? setPlayer1Hand : setPlayer2Hand;
    const hasDrawnCard = playerNumber === 1 ? player1HasDrawnCard : player2HasDrawnCard;
    const playerDeck = isSquirrel ? squirrelDeck : (playerNumber === 1 ? player1Deck : player2Deck);
    const setPlayerDeck = isSquirrel ? setSquirrelDeck : (playerNumber === 1 ? setPlayer1Deck : setPlayer2Deck);
  
    if (playerDeck.length > 0) {
      console.log('Deck has cards available.');
  
      if (playerNumber === currentPlayer) {
        if (playerNumber === 1 && turnNumber === 1) {
          console.log(`Player ${playerNumber} cannot draw cards on the first turn.`);
          return;
        }
  
        if (!hasDrawnCard && playerHand.length < 20) {
          console.log(`Player ${playerNumber} is drawing a card.`);
          const drawnCard = playerDeck[0];
          setPlayerHand(hand => [...hand, drawnCard]);
          setPlayerDeck(deck => deck.slice(1));
          setPlayer1HasDrawnCard(playerNumber === 1);
          setPlayer2HasDrawnCard(playerNumber === 2);
  
          // Start the draw animation
          setIsCardDrawn(true);
  
          // Add a delay before setting isCardDrawn back to false
          setTimeout(() => {
            setIsCardDrawn(false);
          }, 500);  // Adjust the timing based on your animation preference
  
        } else {
          console.log(`Player ${playerNumber} has already drawn a card this turn or hand is full.`);
        }
      } else {
        console.log(`It's not Player ${playerNumber}'s turn. Cannot draw a card.`);
      }
    } else {
      console.log('Deck is empty. Cannot draw a card.');
    }
  };
  




  
  

  
  

  



const playCard = (playerNumber, cardIndex) => {
  // Check if it's player's turn
  if (playerNumber !== currentPlayer) {
    console.error(`It's not Player ${playerNumber}'s turn.`);
    return;
  }

  const playerHand = playerNumber === 1 ? player1Hand : player2Hand;
  const selectedCard = playerHand[cardIndex];

  // Check if card is found in player's hand
  if (!selectedCard) {
    console.error(`No card found at index ${cardIndex} in Player ${playerNumber}'s hand.`);
    return;
  }

  // If the card is already selected, unselect it
  if (selectedCardIndex === cardIndex) {
    setSelectedCardIndex(null);
    console.log(`Player ${playerNumber} unselected the card.`);
  } else {
    // If the card is a squirrel card, it can be placed directly
    if (selectedCard.type === 'Squirrel' || selectedCard.name === 'Squirrel') {
      setSelectedCardIndex(cardIndex);
      console.log(`Player ${playerNumber} selected a Squirrel card.`);
    } else {
      const requiredSacrificeCount = selectedCard.sacrificecardsneeded;
      const sacrificedCardsCount = playerNumber === 1 ? player1Board.filter(card => card && card.sacrificing).length : player2Board.filter(card => card && card.sacrificing).length;

      // If the required number of cards have been sacrificed, card can be selected
      if (sacrificedCardsCount === requiredSacrificeCount) {
        setSelectedCardIndex(cardIndex);
        console.log(`Player ${playerNumber} selected the card: ${selectedCard.name}`);
      } else {
        console.log(`Player ${playerNumber} does not have the required number of sacrificed cards.`);
      }
    }
  }
};



   
const placeCardOnBoard = (slotIndex) => {
  if (selectedCardIndex === null) return;

  const player = currentPlayer;

  const playerBoard = player === 1 ? player1Board : player2Board;
  const playerHand = player === 1 ? player1Hand : player2Hand;
  const setPlayerBoard = player === 1 ? setPlayer1Board : setPlayer2Board;
  const setPlayerHand = player === 1 ? setPlayer1Hand : setPlayer2Hand;

  const selectedCardFromHand = playerHand[selectedCardIndex];
  console.log('Selected card from hand:', selectedCardFromHand);

  if (!selectedCardFromHand) {
    console.log('Selected card from hand is undefined.');
    return;
  }

  console.log(`Player ${player} is placing the card: ${selectedCardFromHand.name} on the board.`);

  const newBoard = [...playerBoard];
  newBoard[slotIndex] = { ...selectedCardFromHand, sacrificing: false };
  
  // Remove all the sacrificed cards from the board
  newBoard.forEach((card, index) => {
    if (card && card.sacrificing) {
      newBoard[index] = null;
    }
  });
  
  setPlayerBoard(newBoard);
  setPlayerHand((hand) => {
    const newHand = [...hand];
    newHand.splice(selectedCardIndex, 1);
    return newHand;
  });

  setSelectedCardIndex(null);
  setIsPlayingCard(true);
  setSacrificedCards([]);

  console.log('Placed card on the board.');
};



const handleSlotClick = (player, slotIndex) => {
  console.log('Slot clicked. Player:', player, ', Index:', slotIndex);

  // If the clicked player isn't the current player, return
  if (player !== currentPlayer) {
    console.log('Cannot place card on other player\'s board');
    return;
  }

  const playerBoard = player === 1 ? player1Board : player2Board;
  const setPlayerBoard = player === 1 ? setPlayer1Board : setPlayer2Board;

  if (selectedCardIndex !== null && (playerBoard[slotIndex] === null || playerBoard[slotIndex].sacrificing)) {
    placeCardOnBoard(slotIndex);
  } else if ((player === 1 && player1Board[slotIndex]) || (player === 2 && player2Board[slotIndex])) {
    const updatedBoard = [...playerBoard];
    const card = updatedBoard[slotIndex];

    if (card) {
      card.sacrificing = !card.sacrificing;
      console.log(`Card at slot index ${slotIndex} is now ${card.sacrificing ? 'sacrificing' : 'not sacrificing'}`);
      setPlayerBoard(updatedBoard);
    }
  } else if (!selectedCard) {
    console.log('No selected card.');
    setSelectedCard(null);
    setSacrificedCards([]);
  }
};



  const endTurn = () => {
    if (currentPlayer === 1) {
      setPlayer1HasDrawnCard(false); // Reset flag for player 1
      setIsPlayer1Turn(false); // Set player 1 turn animation flag to false
      setTimeout(() => {
        console.log("Switching to Player 2's turn...");
        setCurrentPlayer(2);
        setIsPlayer2Turn(true); // Set player 2 turn animation flag to true
      }, 0); // Switch to player 2 after a delay
    } else if (currentPlayer === 2) {
      setPlayer2HasDrawnCard(false); // Reset flag for player 2
      setIsPlayer2Turn(false); // Set player 2 turn animation flag to false
      setTimeout(() => {
        console.log("Switching to Player 1's turn...");
        setCurrentPlayer(1);
        setIsPlayer1Turn(true); // Set player 1 turn animation flag to true
      }, 0); // Switch to player 1 after a delay
    }
  
    setIsPlayingCard(false); // Reset the isPlayingCard state
    setTurnNumber((prevTurn) => {
      const newTurnNumber = prevTurn + 1;
      console.log(`Turn number: ${newTurnNumber}`);
      return newTurnNumber;
    }); // Increment the turn number
    handleAttack();
  };

  const delay = (duration) => new Promise((resolve) =>
  setTimeout(() => {
    resolve((oldState) => {
      // ... update state based on oldState ...
    });
  }, duration)
);

const attackPhase = async (attackingBoard, defendingBoard, setDefendingBoard, setAttackingBoard, setBalanceScale) => {
  let totalDamage = 0;
  let updatedDefendingBoard = [...defendingBoard];
  let updatedAttackingBoard = [...attackingBoard];

  console.log('Player is attacking');

  for (let index = 0; index < attackingBoard.length; index++) {
    const card = attackingBoard[index];
    if (!card || card.isDestroyed) {
      console.log(`Slot at index ${index} has no card or the card has been destroyed. Moving to the next slot.`);
      continue;
    }

    console.log(`Card at index ${index} is attacking. Card details:`, card);
    const opponentCard = updatedDefendingBoard[index];

    

    if (card.name === 'Mantis') {
      console.log('Mantis is attacking adjacent cards.');
      let leftCard = null;
      let rightCard = null;
    
      if (index > 0) {
        leftCard = defendingBoard[index - 1];
        if (leftCard) {
          console.log(`Mantis is attacking the left opponent card with name: ${leftCard.name}, defense: ${leftCard.defense}, attack: ${leftCard.attack}`);
          // Rest of the code for Mantis attack on the left card
        } else {
          console.log('No left opponent card to attack.');
        }
      }
    
      if (index < defendingBoard.length - 1) {
        rightCard = defendingBoard[index + 1];
        if (rightCard) {
          console.log(`Mantis is attacking the right opponent card with name: ${rightCard.name}, defense: ${rightCard.defense}, attack: ${rightCard.attack}`);
          // Rest of the code for Mantis attack on the right card
        } else {
          console.log('No right opponent card to attack.');
        }

      }

      // Attack left card if it exists
if (leftCard) {
  console.log(`Mantis is attacking the left opponent card with name: ${leftCard.name}, defense: ${leftCard.defense}, attack: ${leftCard.attack}`);
  const updatedLeftCard = { ...leftCard };
  updatedLeftCard.defense -= card.attack;
  console.log(`After Mantis attack, left opponent card's defense is ${updatedLeftCard.defense}`);
  if (updatedLeftCard.defense <= 0) {
    console.log('Left opponent card has been destroyed');
    updatedLeftCard.isDestroyed = true;
    updatedDefendingBoard[index - 1] = updatedLeftCard;

    await delay(2000);
    updatedDefendingBoard[index - 1] = null;
    setDefendingBoard([...updatedDefendingBoard]);
  } else {
    updatedDefendingBoard[index - 1] = updatedLeftCard;
    console.log(`Updated left opponent card details:`, updatedLeftCard); // Log the updated card details
  }

  // Add Porcupine logic here
  if (leftCard.name === 'Porcupine') {
    console.log('Left opponent card is a Porcupine. Dealing 1 damage to the attacking card');
    const updatedCard = { ...card };
    updatedCard.defense -= 1;
    console.log(`After Porcupine's defense, attacking card's defense is ${updatedCard.defense}`);
    if (updatedCard.defense <= 0) {
      console.log('Attacking card has been destroyed');
      updatedCard.isDestroyed = true;
      updatedAttackingBoard[index] = updatedCard;
  
      await delay(2000);
      updatedAttackingBoard[index] = null;
      setAttackingBoard([...updatedAttackingBoard]);
      continue; // Skip to next iteration if Mantis has been destroyed
    } else {
      updatedAttackingBoard[index] = updatedCard;
    }

    // Check for Porcupine's ability after taking damage from the defending card
    const updatedOpponentCardAfterAttack = { ...opponentCard };
    updatedOpponentCardAfterAttack.defense -= updatedCard.attack; // Subtract the updated attack value of the attacking card
    console.log(`After Porcupine's defense, opponent card's defense is ${updatedOpponentCardAfterAttack.defense}`);
    if (updatedOpponentCardAfterAttack.defense <= 0) {
      console.log('Opponent card has been destroyed');
      updatedOpponentCardAfterAttack.isDestroyed = true;
      updatedDefendingBoard[index] = updatedOpponentCardAfterAttack;

      await delay(2000);
      updatedDefendingBoard[index] = null;
      setDefendingBoard([...updatedDefendingBoard]);
    } else {
      updatedDefendingBoard[index] = updatedOpponentCardAfterAttack;
    }
  }
} else if (index !== 0) { // Only deal direct damage if the left slot isn't beyond the board (index -1)
  totalDamage += card.attack;
  console.log('No left opponent card to defend. Dealing direct damage to player.');
}

// Attack right card if it exists
if (rightCard) {
  console.log(`Mantis is attacking the right opponent card with name: ${rightCard.name}, defense: ${rightCard.defense}, attack: ${rightCard.attack}`);
  const updatedRightCard = { ...rightCard };
  updatedRightCard.defense -= card.attack;
  console.log(`After Mantis attack, right opponent card's defense is ${updatedRightCard.defense}`);
  if (updatedRightCard.defense <= 0) {
    console.log('Right opponent card has been destroyed');
    updatedRightCard.isDestroyed = true;
    updatedDefendingBoard[index + 1] = updatedRightCard;

    await delay(2000);
    updatedDefendingBoard[index + 1] = null;
    setDefendingBoard([...updatedDefendingBoard]);
  } else {
    updatedDefendingBoard[index + 1] = updatedRightCard;
    console.log(`Updated right opponent card details:`, updatedRightCard); // Log the updated card details
  }

  // Add Porcupine logic here
  if (rightCard.name === 'Porcupine') {
    console.log('Right opponent card is a Porcupine. Dealing 1 damage to the attacking card');
    const updatedCard = { ...card };
    updatedCard.defense -= 1;
    console.log(`After Porcupine's defense, attacking card's defense is ${updatedCard.defense}`);
    if (updatedCard.defense <= 0) {
      console.log('Attacking card has been destroyed');
      updatedCard.isDestroyed = true;
      updatedAttackingBoard[index] = updatedCard;

      await delay(2000);
      updatedAttackingBoard[index] = null;
      setAttackingBoard([...updatedAttackingBoard]);
      continue; // Skip to next iteration if Mantis has been destroyed
    } else {
      updatedAttackingBoard[index] = updatedCard;
    }



    // Check for Porcupine's ability after taking damage from the defending card
    const updatedOpponentCardAfterAttack = { ...opponentCard };
    updatedOpponentCardAfterAttack.defense -= updatedCard.attack; // Subtract the updated attack value of the attacking card
    console.log(`After Porcupine's defense, opponent card's defense is ${updatedOpponentCardAfterAttack.defense}`);
    if (updatedOpponentCardAfterAttack.defense <= 0) {
      console.log('Opponent card has been destroyed');
      updatedOpponentCardAfterAttack.isDestroyed = true;
      updatedDefendingBoard[index] = updatedOpponentCardAfterAttack;

      await delay(2000);
      updatedDefendingBoard[index] = null;
      setDefendingBoard([...updatedDefendingBoard]);
    } else {
      updatedDefendingBoard[index] = updatedOpponentCardAfterAttack;
    }
  }
} else if (index !== updatedDefendingBoard.length - 1) { // Only deal direct damage if the right slot isn't beyond the board (index +1)
  totalDamage += card.attack;
  console.log('No right opponent card to defend. Dealing direct damage to player.');
}


    } else {
      if (opponentCard) {
        console.log(`Opponent card at index ${index} is defending. Card details:`, opponentCard);

        const updatedOpponentCard = { ...opponentCard };
        updatedOpponentCard.defense -= card.attack;
        console.log(`After attack, opponent card's defense is ${updatedOpponentCard.defense}`);

        if (card.name === 'Adder') {
          console.log('Adder is attacking, it will instantly destroy the opponent card.');
          updatedOpponentCard.defense = 0;
        } else {
          updatedOpponentCard.defense -= card.attack;
        }

      

        // Code for the defending card's special ability
        if (opponentCard.name === 'Porcupine') {
          console.log('Opponent card is a Porcupine. Dealing 1 damage to the attacking card');
          const updatedCard = { ...card };
          updatedCard.defense -= 1;
          console.log(`After Porcupine's defense, attacking card's defense is ${updatedCard.defense}`);
          
          // Add condition to check if the attacking card is an "Adder"
          if (card.name === 'Adder') {
            console.log('Attacking card is an Adder. Destroying the Porcupine.');
            opponentCard.defense = -1; // Reduces the defense below 0, effectively destroying the Porcupine
          }
        
          if (updatedCard.defense <= 0) {
            console.log('Attacking card has been destroyed');
            updatedCard.isDestroyed = true;
            updatedAttackingBoard[index] = updatedCard;
        
            await delay(2000);
            updatedAttackingBoard[index] = null;
            setAttackingBoard([...updatedAttackingBoard]);
          } else {
            updatedAttackingBoard[index] = updatedCard;
          }

          // Check for Porcupine's ability after taking damage from the defending card
          const updatedOpponentCardAfterAttack = { ...opponentCard };
          updatedOpponentCardAfterAttack.defense -= updatedCard.attack; // Subtract the updated attack value of the attacking card
          if (updatedOpponentCardAfterAttack.defense <= 0) {
            console.log('Opponent card has been destroyed');
            updatedOpponentCardAfterAttack.isDestroyed = true;
            updatedDefendingBoard[index] = updatedOpponentCardAfterAttack;

            await delay(2000);
            updatedDefendingBoard[index] = null;
            setDefendingBoard([...updatedDefendingBoard]);
          } else {
            updatedDefendingBoard[index] = updatedOpponentCardAfterAttack;
          }
        } else {
          // If the defending card's defense has dropped to 0 or less, remove it from the board
          if (updatedOpponentCard.defense <= 0) {
            console.log('Opponent card has been destroyed');
            updatedOpponentCard.isDestroyed = true;
            updatedDefendingBoard[index] = updatedOpponentCard;

            await delay(2000);
            updatedDefendingBoard[index] = null;
            setDefendingBoard([...updatedDefendingBoard]);
          } else {
            updatedDefendingBoard[index] = updatedOpponentCard;
          }
        }

        
        
        
      } else {
        // There is no defending card
        console.log('No opponent card to defend. Adjusting scale.');
        totalDamage += card.attack;
        console.log('Total damage:', totalDamage);
  }
    }
  }

  console.log('Updating balance scale...');
  console.log(`Previous balance scale: ${balanceScale}`);
  console.log(`Total damage done: ${totalDamage}`);
  setBalanceScale(totalDamage);
  console.log('Balance scale updated.');

 


  setDefendingBoard(updatedDefendingBoard);
  setAttackingBoard(updatedAttackingBoard);
};




  

const handleAttack = async () => {
  if (currentPlayer === 1) {
    console.log("Player 1 is attacking");
    console.log(`Balance before attack: ${balanceScale}`);
    await attackPhase(player1Board, player2Board, setPlayer2Board, setPlayer1Board, (damage) => {
      console.log(`Increasing balance scale by ${damage}`);
      setBalanceScale((prevScale) => prevScale + damage); // Increase the balance scale by damage
    });
  } else {
    console.log("Player 2 is attacking");
    console.log(`Balance before attack: ${balanceScale}`);
    await attackPhase(player2Board, player1Board, setPlayer1Board, setPlayer2Board, (damage) => {
      console.log(`Decreasing balance scale by ${damage}`);
      setBalanceScale((prevScale) => prevScale - damage); // Decrease the balance scale by damage
    });
  }
};






















return (
  <div className="turn-info">
    <h4>{currentPlayer === 1 ? "Player 1's Turn" : "Player 2's Turn"}</h4>
    <h5>Turn: {turnNumber}</h5>
    <div className="game-box">
      <div className="container">
        <div className="player-stats">
          {/* Balance Scale */}
          <div className="balance-scale">
  <div className="balance-scale-bar"></div>
  <div 
    className={`balance-scale-fill ${balanceScale < 0 ? 'negative' : ''}`} 
    style={{ 
      width: `${Math.abs(balanceScale) * 10}%`, 
      right: balanceScale < 0 ? '50%' : 'auto',
      left: balanceScale >= 0 ? '50%' : 'auto'
    }}></div>
  <div className="balance-scale-text">{balanceScale}</div>
</div>








          <button className={`end-turn-button ${currentPlayer === 1 ? '' : 'disabled'}`} onClick={currentPlayer === 1 ? endTurn : null}>
            End Turn
          </button>
        </div>

        <div className="row-container">
          {/* Player 1 Deck */}
          <div className="deck" onClick={() => drawCard(1, false)}>
            <div className="deck-content">
              <img className={`deck-image ${isCardDrawn ? 'card-drawn' : ''}`} src="Deck.png" alt="Deck" />
              <p className="deck-count">{player1Deck.length}</p>
            </div>
          </div>
          {/* Player 1 Squirrel Deck */}
          <div className="deck squirrel-deck" onClick={() => drawCard(1, true)}>
  <img className="deck-image" src="SquirrelDeck.png" alt="Squirrel Deck" />
  <p className="squirrel-deck-count">{squirrelDeck.length}</p>
</div>
       





          {/* Player 1 Hand */}
          <div className={`hand ${currentPlayer === 1 ? '' : 'disabled'}`}>
            {player1Hand.map((card, index) => (
              <div
                key={index}
                onClick={() => playCard(1, index)}
                className={`hand-slot ${currentPlayer === 2 ? 'enemy-card' : ''} ${selectedCardIndex === index ? 'selected-card' : ''}`}
              >
                <Card card={card} />
              </div>
            ))}
          </div>
        </div>

        <div className="board">
          {/* Player 1 Board */}
          {player1Board.map((card, index) => (
            <div
              key={index}
              className={`board-slot ${currentPlayer === 2 ? 'card-bounce-down' : ''} ${currentPlayer === 1 ? 'shake' : ''} ${card && card.isDestroyed ? 'card-destroy' : ''}`}
              onClick={() => handleSlotClick(1, index)}
            >
              <Card card={card} />
            </div>
          ))}
        </div>

        <div className={`board ${currentPlayer === 2 ? '' : 'disabled'}`}>
          {/* Player 2 Board */}
          {player2Board.map((card, index) => (
            <div
              key={index}
              className={`board-slot ${currentPlayer === 1 ? 'card-bounce-up' : ''} ${currentPlayer === 2 ? 'shake' : ''} ${card && card.isDestroyed ? 'card-destroy' : ''}`}
              onClick={() => handleSlotClick(2, index)}
            >
              <Card card={card} />
            </div>
          ))}
        </div>

        <div className="row-container">
          {/* Player 2 Deck */}
          <div className="deck" onClick={() => drawCard(2, false)}>
            <div className="deck-content">
              <img className={`deck-image ${isCardDrawn ? 'card-drawn' : ''}`} src="Deck.png" alt="Deck" />
              <p className="deck-count">{player2Deck.length}</p>
            </div>
          </div>
          {/* Player 2 Squirrel Deck */}
<div className="deck squirrel-deck" onClick={() => drawCard(2, true)}>
  <img className="deck-image" src="SquirrelDeck.png" alt="Squirrel Deck" />
  <p className="squirrel-deck-count">{squirrelDeck.length}</p>
</div>

          {/* Player 2 Hand */}
          <div className={`hand ${currentPlayer === 2 ? '' : 'disabled'}`}>
            {player2Hand.map((card, index) => (
              <div
                key={index}
                onClick={() => playCard(2, index)}
                className={`hand-slot ${currentPlayer === 1 ? 'enemy-card' : ''} ${selectedCardIndex === index ? 'selected-card' : ''}`}
              >
                <Card card={card} />
              </div>
            ))}
          </div>
        </div>
        

        <div className="end-turn-container">
          <button className={`end-turn-button ${currentPlayer === 2 ? '' : 'disabled'}`} onClick={currentPlayer === 2 ? endTurn : null}>
            End Turn
          </button>
        </div>
      </div>
    </div>
  </div>
);
            }

            export default Game;