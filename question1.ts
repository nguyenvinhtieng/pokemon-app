const MAXIMUM_GROUP_SIZE = 3;

function shuffleArray<T>(array: T[]): T[] {
    let arrayLength = array.length;
    for (let i = 0; i < arrayLength; i++) {
        const j = Math.floor(Math.random() * arrayLength);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function divideIntoGroups<T>(characters: T[]): T[][] {
    const arrayLength = characters.length;
    if (characters.length === 0) return [];
    const shuffledCharacters = shuffleArray([...characters]);
    if (arrayLength <= MAXIMUM_GROUP_SIZE) return [[...shuffledCharacters]];

    const groupSize = Math.ceil(arrayLength / MAXIMUM_GROUP_SIZE);
    const groups: T[][] = [];

    for (let i = 0; i < groupSize; i++) {
        let childGroup: T[] = [];
        for (let j = 0; j < MAXIMUM_GROUP_SIZE; j++) {
            if (arrayLength <= i * MAXIMUM_GROUP_SIZE + j) break;
            childGroup.push(shuffledCharacters[i * MAXIMUM_GROUP_SIZE + j]);
        }
        groups.push(childGroup);
    }

    return groups;
}

const characters1: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const characters2: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
const groups1: string[][] = divideIntoGroups(characters1);
const groups2: string[][] = divideIntoGroups(characters2);
console.log(groups1);
console.log(groups2);