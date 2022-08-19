
export const limitedText=(info:string,limitNum:number)=>{
    const text=info.split(" ");
    
    let result="";
    for(let i=0; i<text.length; i++){
        if(i===limitNum){
            break;
        }
        if(i===(limitNum-1)){
            result+=`${text[i]} ...`;
        }else{
            result+=`${text[i]} `;
        }
    }

    return result;
}