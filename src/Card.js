function Card({ card }) {
  console.log('Card object:', card);
  console.log(`${card ? card.name : 'Empty Slot'} destroyed: ${card && card.destroyed}`);
  
  if (!card) {
    return (
      <div className="card empty-slot"></div>
    );
  }

  let imageUrl;

  if (card.name === 'Boulder') {
    imageUrl = process.env.PUBLIC_URL + '/Boulder.png';
  } else if (card.destroyed) {
    // Handle other destroyed card logic if needed
  } else if (card && card.type === 'Squirrel') {
    imageUrl = process.env.PUBLIC_URL + '/Squirrel.png';
  } else if (card && card.name === 'Wolf' && card.defense === 1) {
    imageUrl = process.env.PUBLIC_URL + `/${card.name}${card.defense}Defense.png`;
  } else if (card && card.name === 'Porcupine' && card.defense === 1) {
    imageUrl = process.env.PUBLIC_URL + '/Porcupine1Defense.png';
  } else if (card && card.name === 'Urayuli') {
    if (card.defense === 1) {
      imageUrl = process.env.PUBLIC_URL + '/Urayuli1Defense.png';
    } else if (card.defense >= 2 && card.defense <= 6) {
      imageUrl = process.env.PUBLIC_URL + `/Urayuli${card.defense}Defense.png`;
    } else {
      imageUrl = process.env.PUBLIC_URL + '/Urayuli.png';
    }
  } else if (card && card.name === 'Amalgam') {
    if (card.defense === 1) {
      imageUrl = process.env.PUBLIC_URL + '/Amalgam1Defense.png';
    } else if (card.defense >= 2 && card.defense <= 2) {
      imageUrl = process.env.PUBLIC_URL + `/Amalgam${card.defense}Defense.png`;
    } else {
      imageUrl = process.env.PUBLIC_URL + '/Amalgam.png';
    }
  } else if (card && card.name === 'PackRat') {
    if (card.defense === 1) {
      imageUrl = process.env.PUBLIC_URL + '/PackRat1Defense.png';
    } else if (card.defense >= 2 && card.defense <= 1) {
      imageUrl = process.env.PUBLIC_URL + `/PackRat${card.defense}Defense.png`;
    } else {
      imageUrl = process.env.PUBLIC_URL + '/PackRat.png';
    }
  } else if (card && card.name === 'Grizzly') {
    if (card.defense === 1) {
      imageUrl = process.env.PUBLIC_URL + '/Grizzly1Defense.png';
    } else if (card.defense >= 2 && card.defense <= 5) {
      imageUrl = process.env.PUBLIC_URL + `/Grizzly${card.defense}Defense.png`;
    } else {
      imageUrl = process.env.PUBLIC_URL + '/Grizzly.png';
    }
  } else if (card && card.name === 'RiverSnapper') {
    if (card.defense === 1) {
      imageUrl = process.env.PUBLIC_URL + '/RiverSnapper1Defense.png';
    } else if (card.defense >= 2 && card.defense <= 5) {
      imageUrl = process.env.PUBLIC_URL + `/RiverSnapper${card.defense}Defense.png`;
    } else {
      imageUrl = process.env.PUBLIC_URL + '/RiverSnapper.png';
    }
  } else if (card && card.name === 'DireWolf') {
    if (card.defense === 1) {
      imageUrl = process.env.PUBLIC_URL + '/DireWolf1Defense.png';
    } else if (card.defense >= 2 && card.defense <= 4) {
      imageUrl = process.env.PUBLIC_URL + `/DireWolf${card.defense}Defense.png`;
    } else {
      imageUrl = process.env.PUBLIC_URL + '/DireWolf.png';
    }
  } else {
    imageUrl = process.env.PUBLIC_URL + `/${card.name}.png`;
  }

  return (
    <div className={`card ${card.sacrificing ? 'sacrificing' : ''}`}>
      <img src={imageUrl} alt={card.name} />
      <div>{`${card.name} - ${card.attack}/${card.defense}`}</div>
    </div>
  );
}

export default Card;
