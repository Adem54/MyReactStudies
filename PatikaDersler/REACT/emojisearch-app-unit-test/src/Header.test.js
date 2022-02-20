import React from "react";
import '@testing-library/jest-dom'
import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";


import Header from "./Header";

describe("Emoji Search Tests", ()=>{
    let header,img1,img2;

    beforeEach(()=>{
        render(<Header/>);
        header=screen.getByText("Emoji Search");
        img1=screen.getByAltText("img1");
        img2=screen.getByAltText("img2");
      
    })

    test("check header is in project", ()=>{
        expect(header).toBeInTheDocument();
        expect(img1).toBeInTheDocument();
        expect(img2).toBeInTheDocument();
    })

    
})

/*
Başlık kısmının başarılı bir şekilde render edildiğini kontrol edecek olan test kodunu yazın.

*/

