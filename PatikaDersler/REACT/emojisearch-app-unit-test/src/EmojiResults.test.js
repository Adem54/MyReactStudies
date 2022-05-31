import React from "react";
import '@testing-library/jest-dom'
import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";



import EmojiResultRow from "./EmojiResults";

describe("Emoji Search Tests", ()=>{
  let text;
    beforeEach(()=>{
        render(<EmojiResultRow  key={emojiData.title}
          symbol={emojiData.symbol}
          title={emojiData.title} />);
    text=screen.getAllByRole("listItem");
     
      console.log("items: ",items);
    })

    test("check emoji lists", ()=>{
       expect(text.length).toEqual(20);
     
        
 
    })

    
})

// Uygulama ilk açıldığında emoji listesinin başarılı bir şekilde render edildiğini kontrol edecek olan test kodunu yazın.-Emoji listesi icindeki eleman sayisini cek ederiz birde emoji listesindeki elementler screen de gozukuyor mu bunu cek ederiz...

