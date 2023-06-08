function Card({ card }) {
  if (!card) {
    return (
      <div className="card empty-slot"></div>
    );
  }

  let imageUrl;

  if (card.isDestroyed) {
    imageUrl = process.env.PUBLIC_URL + '/Deck.png';
  } else if (card.type === 'Squirrel') {
    imageUrl = process.env.PUBLIC_URL + '/Squirrel.png';
  } else if (card.name === 'Wolf' && card.defense === 1) {
    imageUrl = process.env.PUBLIC_URL + `/${card.name}${card.defense}Defense.png`;
  } else if (card.name === 'Porcupine' && card.defense === 1) {
    imageUrl = process.env.PUBLIC_URL + '/Porcupine1Defense.png';
  } else if (card.name === 'Urayuli') {
    if (card.defense === 1) {
      imageUrl = process.env.PUBLIC_URL + '/Urayuli1Defense.png';
    } else if (card.defense >= 2 && card.defense <= 6) {
      imageUrl = process.env.PUBLIC_URL + `/Urayuli${card.defense}Defense.png`;
    } else {
      imageUrl = process.env.PUBLIC_URL + '/Urayuli.png';
    }
  } else {
    imageUrl = process.env.PUBLIC_URL + `/${card.name}.png`;
  }

  return (
    <div className={`card ${card.sacrificing ? 'sacrificing' : ''}`}>
      <img src={imageUrl} alt={card.name} />
      <div>{card.name} - {card.attack}/{card.defense}</div>
    </div>
  );
}

export default Card;

