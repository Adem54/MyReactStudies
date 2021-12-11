import React, { Component } from 'react'

class Test extends Component {
    constructor(props){
         super(props);//super icine props u kullanmaliyiz yoksa this.props u kulanamayiz..burasi cok onemli super keywordu props paramtresi ile mutlaka kullanilmali eger constructor yazacaksak
         this.state={
             a:10
         }
         console.log("Constructor")
        
    }


shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    console.log(nextProps);
    console.log(nextState);
    return false;
}


componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate")
    console.log("oncekiProps: ",prevProps);
    console.log("OncekiState: ",prevState);
}


    componentDidMount() {
        console.log("ComponentDidMount")
        this.setState({
            a:50
        })
    }
    
    render() {
        console.log("Render!")
        return (
            <div>
                
            </div>
        )
    }
}


export default Test;