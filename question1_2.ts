"use strict";

function shuffleArray<T>(array: T[]): T[] {
    let arrayLength: number = array.length;
    for (let i = 0; i < arrayLength; i++) {
        const j: number = Math.floor(Math.random() * arrayLength);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function divideIntoGroups<T>(characters: T[]): T[][] {
    const MAXIMUM_GROUP_SIZE: number = 3; // maximum group size
    const arrayLength: number = characters.length; // get lenght of array to be not call length function every time
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
    let remainders: number = 0;
    let minIndex: number = -1;
    let maxValue: number = 0;
    let maxIndex: number = -1;

    for (let i = 0; i < groupSizes.length; i++) {
        if (groupSizes[i] == 0) {
            minIndex = i;
        }
        if(groupSizes[i] >= maxValue) {
            maxValue = groupSizes[i];
            maxIndex = i;
        }
    }

    if(minIndex != -1) {
        remainders = minIndex;
    } else {
        remainders = maxIndex;
    }


    // get last index of min value

    const GROUP_ITEM_SIZE: number = remainders + 2;

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
    const characters2: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    const groups1: string[][] = divideIntoGroups(characters1);
    const groups2: string[][] = divideIntoGroups(characters2);
    console.log(groups1);
    console.log(groups2);
})();

