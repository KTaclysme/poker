import { compareHands } from "./poker";

describe("compareHands", () => {
  test("Doit détecter une Quinte Flush gagnante", () => {
    expect(compareHands(["AH", "KH", "QH", "JH", "10H"], ["9H", "8H", "7H", "6H", "5H"])).toBe(1);
  });

  test("Doit détecter un Carré gagnant", () => {
    expect(compareHands(["9H", "9D", "9S", "9C", "2H"], ["8H", "8D", "8S", "8C", "KH"])).toBe(1);
  });

  test("Doit détecter un Full House gagnant", () => {
    expect(compareHands(["3H", "3D", "3S", "5C", "5D"], ["2H", "2D", "2S", "6C", "6D"])).toBe(1);
  });

  test("Doit détecter une Couleur gagnante", () => {
    expect(compareHands(["AH", "JH", "8H", "6H", "4H"], ["KD", "QD", "JD", "10D", "8D"])).toBe(1);
  });

  test("Doit détecter une Quinte gagnante", () => {
    expect(compareHands(["10H", "9D", "8S", "7C", "6H"], ["7H", "6D", "5S", "4C", "3H"])).toBe(1);
  });

  test("Doit détecter un Brelan gagnant", () => {
    expect(compareHands(["5H", "5D", "5S", "9C", "2H"], ["4H", "4D", "4S", "10C", "3H"])).toBe(1);
  });

  test("Doit détecter une Double Paire gagnante", () => {
    expect(compareHands(["10H", "10D", "5S", "5C", "2H"], ["9H", "9D", "8S", "8C", "3H"])).toBe(1);
  });

  test("Doit détecter une Paire gagnante", () => {
    expect(compareHands(["8H", "8D", "5S", "3C", "2H"], ["7H", "7D", "6S", "4C", "3H"])).toBe(1);
  });

  test("Doit détecter une Carte Haute gagnante", () => {
    expect(compareHands(["AH", "KD", "9S", "7C", "5H"], ["KH", "QD", "10S", "8C", "6H"])).toBe(1);
  });

  test("Doit renvoyer 0 pour des mains identiques", () => {
    expect(compareHands(["AH", "KH", "QH", "JH", "10H"], ["AH", "KH", "QH", "JH", "10H"])).toBe(0);
  });

  test("Doit renvoyer -1 si la deuxième main gagne", () => {
    expect(compareHands(["2H", "3D", "4S", "5C", "6H"], ["10H", "JH", "QH", "KH", "AH"])).toBe(-1);
  });
});
