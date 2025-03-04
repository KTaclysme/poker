const RANK_VALUES: Record<string, number> = {
    "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
    "J": 11, "Q": 12, "K": 13, "A": 14
  };

// export function compareHands(hand1: string[], hand2: string[]): number {} 

function getHandStats(hand: string[]) {
const values = hand.map(card => card.slice(0, -1));
const suits = hand.map(card => card.slice(-1));

const valueCounts: Record<string, number> = {};
values.forEach(value => valueCounts[value] = (valueCounts[value] || 0) + 1);

return { values, suits, valueCounts };
}

console.log(getHandStats(["9H", "9D", "9S", "9C", "2H"]))