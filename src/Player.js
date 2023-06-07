import Deck from './Deck';
import Hand from './Hand';
import Board from './Board';

function Player({ playerNumber, deck, hand, board, drawCard, playCard }) {
    console.log(hand); // Log the hand array to the console

    return (
        <div className="player">
            <h2>Player {playerNumber}</h2>
            <Deck deck={deck} onClick={() => drawCard(playerNumber)} />
            <Hand cards={hand} playCard={playCard} playerNumber={playerNumber}/>
            <Board board={board} />
        </div>
    );
}

export default Player;
