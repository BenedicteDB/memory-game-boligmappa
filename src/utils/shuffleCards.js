export const shuffleCards = (array) => {
  const duplicatedArray = [...array, ...array];

  const shuffledCards = duplicatedArray
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }));

  return shuffledCards;
};
