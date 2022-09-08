
export const makeFirstLettersUpper=(text:string)=>{
    const spliteWords=text.split(" ");
    let result="";
    for (const word of spliteWords) {
        result+=`${word[0].toUpperCase()}${word.substring(1)} `;
    }

    return result;
}

export const makeFirstLeterUpper=(word:string)=>{
    return word[0].toUpperCase()+word.substring(1);
}