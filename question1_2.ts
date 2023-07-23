"use strict";

function shuffleArray<T>(array: T[]): T[] {
    let arrayLength = array.length;
    for (let i = 0; i < arrayLength; i++) {
        const j = Math.floor(Math.random() * arrayLength); // get random index
        [array[i], array[j]] = [array[j], array[i]]; // swap element at index i and j
    }
    return array;
}

function divideIntoGroups<T>(characters: T[]): T[][] {
    const MAXIMUM_GROUP_SIZE: number = 3; // maximum group size
    const arrayLength = characters.length; // get lenght of array to be not call length function every time
    if (characters.length === 0) return []; // CASE: empty array  => return empty array

    const shuffledCharacters = shuffleArray([...characters]); // shuffle array to make sure that the result is random

    // VALIDATE CASE
    // GET GROUP ITEM SIZE
    let groupSizes: number[] = [];
    if(MAXIMUM_GROUP_SIZE > 1) {
        for(let i = 2; i <= MAXIMUM_GROUP_SIZE; i++) {
            groupSizes.push(arrayLength % i);
        }
    }
    // Choose the group size that has less remainders
    const minIndex = groupSizes.indexOf(Math.min(...groupSizes));
    const GROUP_ITEM_SIZE = minIndex + 2;

    // CALCULATE GROUP SIZE
    const groupSize = Math.ceil(arrayLength / GROUP_ITEM_SIZE);
    const groups: T[][] = [];

    for (let i = 0; i < groupSize; i++) {
        let childGroup: T[] = [];
        for (let j = 0; j < GROUP_ITEM_SIZE; j++) {
            // CASE: if the last group has less than GROUP_ITEM_SIZE elements
            if (arrayLength <= i * GROUP_ITEM_SIZE + j) break;
            
            childGroup.push(shuffledCharacters[i * GROUP_ITEM_SIZE + j]);
        }
        groups.push(childGroup);
    }

    return groups;
}

(function main() {
    const characters1: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const characters2: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const groups1: string[][] = divideIntoGroups(characters1);
    const groups2: string[][] = divideIntoGroups(characters2);
    console.log(groups1);
    console.log(groups2);
})();

