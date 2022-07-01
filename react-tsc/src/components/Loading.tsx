import React, {FunctionComponent} from "react";

interface ILoadingProps {
    loading:boolean;
    children: React.ReactNode; //added type for children
}
/*
The Loading component tries to access the children property on the props object,
 but has not defined a type for it in the ILoadingProps type alias.
To solve the error, type the children property as React.ReactNode.
Now we are able to access the children property in the Loading component 
and we are also able to pass a children prop to it in our App component.
If you didn't intend to pass children to the Loading component, you should
 use the component as <Loading myProp="some value" /> and not <Loading>Some children</Loading>.
*/
//Eger loading true ise loading yazdiaracak, false ise children ne ise onu yazdiracak
const Loading:FunctionComponent<ILoadingProps> = (props) => {
   
   const {loading}=props;
    if(loading){
        return <>Loading....</>;//component dondurup burda bitirecegiz
    }
  return <>{props.children}</>
}

export default Loading