import React, { useState, useEffect } from 'react';
import Card from './Card';
import GameOverPopup from './GameOverPopUp';
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
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [balanceScale, setBalanceScale] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  







  
  


  



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

  useEffect(() => {
  // Check if game is over whenever balanceScale changes
  if (balanceScale <= -10) {
    setGameOver(true);
    setWinner(1);
  } else if (balanceScale >= 10) {
    setGameOver(true);
    setWinner(2);
  }
}, [balanceScale]);

const initializeDecks = (data, squirrelCards) => {
  console.log('Initializing decks...');
  console.log('Initial squirrelCards:', squirrelCards);
  const shuffledDeck = shuffleArray([...data]);
  console.log('Shuffled deck:', shuffledDeck);
  const sharedDeck = shuffledDeck.slice(0, data.length - 4);
  console.log('Shared deck:', sharedDeck);

  console.log('Squirrel deck:', squirrelCards);

  // Log the name property of the first squirrel card
  if (squirrelCards.length > 0) {
    console.log('Name of first squirrel card:', squirrelCards[0].name);
  }

  setPlayer1Deck([...sharedDeck]);
  setPlayer2Deck([...sharedDeck]);
  setSquirrelDeck([...squirrelCards]);

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
  
  
  

  
  
  const drawCard = (playerNumber, isSquirrel, forceDraw = false) => {
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
  
        if ((!hasDrawnCard || forceDraw) && playerHand.length < 20) {
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
        if (sacrificedCardsCount >= requiredSacrificeCount) {
          setSelectedCardIndex(cardIndex);
          console.log(`Player ${playerNumber} selected the card: ${selectedCard.name}`);
  
          // After selecting the card, if it's a 'Pack Rat', draw a card from the player's deck
          if (selectedCard.name === 'PackRat') {
            drawCard(playerNumber, false, true);  // The third argument 'true' forces a card draw
          }
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
  
  console.log('Before updating player board:', playerBoard);
setPlayerBoard(newBoard);
console.log('After updating player board:', playerBoard);

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



const endTurn = async () => {
  setIsPlayingCard(false);
  setTurnNumber((prevTurn) => {
    const newTurnNumber = prevTurn + 1;
    console.log(`Turn number: ${newTurnNumber}`);
    return newTurnNumber;
  });

  if (currentPlayer === 1) {
    setPlayer1HasDrawnCard(false);
    setTimeout(async () => {
      await handleAttack();
      console.log("Player 1's board:", player1Board);
      console.log("Player 2's board:", player2Board);
      setCurrentPlayer(2);
      console.log("Switching to Player 2's turn...");
    }, 0);
  } else if (currentPlayer === 2) {
    setPlayer2HasDrawnCard(false);
    setTimeout(async () => {
      await handleAttack();
      console.log("Player 1's board:", player1Board);
      console.log("Player 2's board:", player2Board);
      setCurrentPlayer(1);
      console.log("Switching to Player 1's turn...");
    }, 0);
  }
};


const attackEmptySlot = (card, currentPlayer, setBalanceScale, setGameOver, setWinner, prevBalance) => {
  console.log(`${card} is attacking player directly. Adjusting balance scale by ${card.attack}`);

  if (currentPlayer === 1) {
    // Player 1 is attacking, so we decrease the balance scale
    setBalanceScale((prevBalance) => prevBalance - card.attack);

    // Check if balance scale reaches -10 for Player 1
    if (prevBalance - card.attack <= -10) {
      setGameOver(true);
      setWinner(1);
      console.log('Player 1 wins!');
    }
  } else if (currentPlayer === 2) {
    // Player 2 is attacking, so we increase the balance scale
    setBalanceScale((prevBalance) => prevBalance + card.attack);

    // Check if balance scale reaches 10 for Player 2
    if (prevBalance + card.attack >= 10) {
      setGameOver(true);
      setWinner(2);
      console.log('Player 2 wins!');
    }
  }

  // Use the updated values of setGameOver and setWinner
  console.log('Is game over?', gameOver);
  console.log('Winner:', winner);
};






const porcupineDefense = (attackingCard, setAttackingBoard, index) => {
  console.log(`Porcupine card is being attacked. Dealing 1 damage to the attacking card.`);
  attackingCard.defense -= 1;
  console.log(`${attackingCard} defense is now ${attackingCard.defense}`);

  if (attackingCard.defense <= 0) {
    console.log(`${attackingCard} has been destroyed'`);
    attackingCard.isDestroyed = true;

    setAttackingBoard(prevAttackingBoard => {
      const updatedAttackingBoard = [...prevAttackingBoard];
      updatedAttackingBoard[index] = {...attackingCard};  // Don't set to null immediately, just mark the card as destroyed
      return updatedAttackingBoard;
    });
  } else {
    setAttackingBoard(prevAttackingBoard => {
      const updatedAttackingBoard = [...prevAttackingBoard];
      updatedAttackingBoard[index] = {...attackingCard};
      return updatedAttackingBoard;
    });
  }
};


const mantisAttack = (attackingCard, defendingBoard, index, currentPlayer, setBalanceScale, setAttackingBoard) => {
  const updatedDefendingBoard = [...defendingBoard];
  const leftIndex = index - 1;
  const rightIndex = index + 1;

  [leftIndex, rightIndex].forEach((targetIndex) => {
    if (targetIndex >= 0 && targetIndex < defendingBoard.length) {
      const targetDefendingCard = updatedDefendingBoard[targetIndex];
      if (targetDefendingCard) {
        if (targetDefendingCard.name === 'Porcupine') {
          porcupineDefense(attackingCard, setAttackingBoard, index);
        }
        targetDefendingCard.defense -= attackingCard.attack;
        if (targetDefendingCard.defense <= 0) {
          targetDefendingCard.isDestroyed = true;
          updatedDefendingBoard[targetIndex] = null;
        }
      } else {
        attackEmptySlot(attackingCard, currentPlayer, setBalanceScale, setGameOver, setWinner);
      }
    }
  });

  return updatedDefendingBoard;
};

const adderAttack = (defendingCard, index, updatedDefendingBoard) => {
  console.log('Adder card is attacking. Setting the defending card\'s defense to 0.');

  if (defendingCard) {
    defendingCard.defense = 0;
    defendingCard.isDestroyed = true;
    updatedDefendingBoard[index] = null;
  }

  return updatedDefendingBoard;
};




const attackPhase = async (
  attackingBoard,
  defendingBoard,
  setDefendingBoard,
  setAttackingBoard,
  setBalanceScale,
  setWinner
) => {
  let updatedDefendingBoard = [...defendingBoard];
  let updatedAttackingBoard = [...attackingBoard];

  for (let index = 0; index < attackingBoard.length; index++) {
    const attackingCard = attackingBoard[index];
    if (!attackingCard || attackingCard.isDestroyed) {
      console.log(`Slot at index ${index} has no card or the card has been destroyed. Moving to the next slot.`);
      continue;
    }

    console.log(`Card at index ${index} is attacking. Card details:`, attackingCard);

    // Mantis always attacks to left and right slots, no matter whether there's a defending card directly in front of it or not.
    if (attackingCard.name === 'Mantis') {
      updatedDefendingBoard = mantisAttack(attackingCard, updatedDefendingBoard, index, currentPlayer, setBalanceScale, setAttackingBoard);

      // Check if the mantis has been destroyed after the attack
      if (attackingCard.isDestroyed) {
        updatedAttackingBoard[index] = null;  // Remove the mantis from the attacking board
      }

      continue;
    }

    const defendingCard = updatedDefendingBoard[index];
    console.log('Defending card:', defendingCard);
    console.log('Updated defending board:', updatedDefendingBoard);

    if (!defendingCard) {
      console.log('No defending card to attack');
      attackEmptySlot(attackingCard, currentPlayer, setBalanceScale, setGameOver, setWinner);
    } else {
      const updatedAttackingCard = { ...attackingCard };
      let updatedDefendingCard = { ...defendingCard };
      
      if (defendingCard.name === 'Porcupine') {
        // Attacking a Porcupine card triggers its defense function
        porcupineDefense(attackingCard, setAttackingBoard, index);
        if (attackingCard.defense <= 0) {
          updatedAttackingBoard[index] = null; // Remove the attacking card from the board
        }
      }

      if (attackingCard.name === 'Adder') {
        updatedDefendingBoard = adderAttack(defendingCard, index, updatedDefendingBoard);
        continue;
      }
      
      updatedDefendingCard.defense -= attackingCard.attack;
      console.log(attackingCard);
      console.log(`After attack, defending card's defense is ${updatedDefendingCard.defense}`);

      if (updatedDefendingCard.defense <= 0) {
        console.log('Defending card has been destroyed');
        updatedDefendingCard.isDestroyed = true;
        updatedDefendingBoard[index] = null;
      } else {
        updatedDefendingBoard[index] = updatedDefendingCard;
      }

      console.log('Final updated attacking board:', updatedAttackingBoard);
      console.log('Final updated defending board:', updatedDefendingBoard);
    }
  }

  setAttackingBoard(updatedAttackingBoard);
  setDefendingBoard(updatedDefendingBoard);
};






const handleAttack = async () => {
  if (currentPlayer === 1) {
    console.log("Player 1 is attacking");
    console.log(`Balance before attack: ${balanceScale}`);
    await attackPhase(player1Board, player2Board, setPlayer2Board, setPlayer1Board, setBalanceScale, setGameOver, setWinner);
  } else {
    console.log("Player 2 is attacking");
    console.log(`Balance before attack: ${balanceScale}`);
    await attackPhase(player2Board, player1Board, setPlayer1Board, setPlayer2Board, setBalanceScale, setGameOver, setWinner);
  }
};

const playAgain = () => {
  // Reset the state variables to their initial values
  setGameOver(false);
  setWinner(null);
  setBalanceScale(0);
  // Add any additional state variables you need to reset

  // Reload the page to restart the game
  window.location.reload();
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
        {gameOver && (
      <GameOverPopup winner={winner} playAgain={playAgain} />
    )}
  </div>
    </div>
  </div>
);
            }

            export default Game;