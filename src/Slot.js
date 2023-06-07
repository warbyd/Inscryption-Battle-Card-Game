import Card from "./Card";

function Slot({ card }) {
    return (
        <div className="slot">
            {card ? <Card card={card} /> : 'Empty slot'}
        </div>
    );
}

export default Slot;
