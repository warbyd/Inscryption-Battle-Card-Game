import Card from "./Card";

function Deck({ deck = [], onClick }) {
    console.log('Deck cards:', deck);
    return (
        <div className="deck" onClick={onClick}>
            Cards remaining: {deck.length}
            {deck.map(card => (
                <Card key={card.id} card={card} />
            ))}
        </div>
    );
}

export default Deck;