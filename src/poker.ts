const RANK_VALUES: Record<string, number> = {
    "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
    "J": 11, "Q": 12, "K": 13, "A": 14
  };

export function compareHands(hand1: string[], hand2: string[]): number {
const hand1Rank = getHandRank(hand1);
const hand2Rank = getHandRank(hand2);

if (hand1Rank.rank > hand2Rank.rank) return 1;
if (hand1Rank.rank < hand2Rank.rank) return -1;


for (let i = 0; i < hand1Rank.sortedValues.length; i++) {
    if (hand1Rank.sortedValues[i] > hand2Rank.sortedValues[i]) return 1;
    if (hand1Rank.sortedValues[i] < hand2Rank.sortedValues[i]) return -1;
}

return 0; 
} 

export function getHandStats(hand: string[]) {
const values = hand.map(card => card.slice(0, -1));
const suits = hand.map(card => card.slice(-1));

const valueCounts: Record<string, number> = {};
values.forEach(value => valueCounts[value] = (valueCounts[value] || 0) + 1);

return { values, suits, valueCounts };
}

export function getHandRank(hand: string[]): { rank: number, sortedValues: number[] } {
    const { values, suits, valueCounts } = getHandStats(hand);
    const counts = Object.values(valueCounts).sort((a, b) => b - a);
    const isFlush = new Set(suits).size === 1;
  
    const sortedRanks = values.map(v => RANK_VALUES[v]).sort((a, b) => a - b);
    const isStraightHand = isStraight(sortedRanks);
  
    const sortedByFrequency = Object.entries(valueCounts)
      .map(([value, count]) => ({ value: RANK_VALUES[value], count }))
      .sort((a, b) => b.count - a.count || b.value - a.value)
      .map(v => v.value);
  
    if (isFlush && isStraightHand) return { rank: 9, sortedValues: sortedRanks.reverse() }; 
    if (counts[0] === 4) return { rank: 8, sortedValues: sortedByFrequency }; 
    if (counts[0] === 3 && counts[1] === 2) return { rank: 7, sortedValues: sortedByFrequency }; 
    if (isFlush) return { rank: 6, sortedValues: sortedRanks.reverse() }; 
    if (isStraightHand) return { rank: 5, sortedValues: sortedRanks.reverse() }; 
    if (counts[0] === 3) return { rank: 4, sortedValues: sortedByFrequency }; 
    if (counts[0] === 2 && counts[1] === 2) return { rank: 3, sortedValues: sortedByFrequency }; 
    if (counts[0] === 2) return { rank: 2, sortedValues: sortedByFrequency }; 
    return { rank: 1, sortedValues: sortedByFrequency }; 
  }

export function isStraight(sortedRanks: number[]): boolean {
return (
    sortedRanks.every((v, i, arr) => i === 0 || v === arr[i - 1] + 1) ||
    (sortedRanks.includes(14) && sortedRanks.slice(0, 4).join() === "2,3,4,5") 
);
}