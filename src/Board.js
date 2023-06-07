import Card from './Card';

function Board({ cards }) {
    return (
        <div className="board">
            {cards.map((card, index) => card ? (
                <Card key={index} card={card} />
            ) : (
                <div key={index} className="card empty-slot"></div>
            ))}
        </div>
    );
}

export default Board;
