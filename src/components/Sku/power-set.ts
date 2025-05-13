export default function bwPowerSet<T>(originalSet: T[]): T[][] {
  const subSets: T[][] = [];
  const numberOfCombinations = 2 ** originalSet.length;

  for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
    const subSet: T[] = [];

    for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
      if (combinationIndex & (1 << setElementIndex)) {
        subSet.push(originalSet[setElementIndex]);
      }
    }

    subSets.push(subSet);
  }

  return subSets;
}