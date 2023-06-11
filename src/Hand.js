// import Card from './Card';

// function Hand({ cards, playCard, playerNumber }) {
//     while (cards.length < 4) {
//         cards.push(null); // Add null entries to fill up to 4 cards
//     }

//     return (
//         <div className="hand">
//             {cards.map((card, index) => card ? (
//                 <Card
//                     key={index}
//                     card={card}
//                     onClick={() => playCard(playerNumber, index)}
//                 />
//             ) : (
//                 <div key={index} className="card empty-slot"></div>
//             ))}
//         </div>
//     );
// }

// export default Hand;
