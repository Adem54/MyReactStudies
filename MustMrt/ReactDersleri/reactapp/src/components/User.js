import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import UserConsumer from '../context'


 export default class User extends Component {
    state={isVisible:false}
     //Bu sekilde render fonksiyonu icinde return ile donerek bu islem yapilir ocmponentler icinde
     static defaultProps= {
        name:"Belli degil",
        departmant:"... developer",
        salary:"belli degil"
    }
 
     onClickEvent=(e)=>{
        this.setState({
            isVisible: !this.state.isVisible
        })
    }
    onDeleteUser=(dispatch,e)=>{
     
        const {id}=this.props;
        console.log("id: ", id);
        dispatch({type:"DELETE_USER", payload:id});
        console.log("dispatch: ", dispatch);
    }

    componentWillUnmount() {
        console.log("ComponentWillUnMount!");
    }
    
   
    render() {
       let {name,departmant,salary}=this.props;
       let {isVisible}=this.state;
       return (
           <UserConsumer>
               {
                   value=>{
                       const {dispatch}=value;
                       return (
                        <div className="cold-md-8 mb-4" style={ isVisible?{backgroundColor:"#62848d",color:"white"}:null} >
                           <div className="card" >
                               <div className="card-header d-flex justify-content-between">
                                   <h4 className="d-inline"  onClick={this.onClickEvent.bind(this,34)}>{name}</h4>
                                   <i onClick={this.onDeleteUser.bind(this,dispatch)}  className="far fa-trash-alt" style={{cursor:"pointer"}}></i>
                                   </div>     
                           </div>
                           {  
                           isVisible ?
                           <div className="card-body">
                           <p className="card-text">Salary:{salary}</p>
                           <p className="card-text">Departmant:{departmant}
                           </p> </div> : null
                        }
                         
                           </div>
                        
                    )
                       
                   }
               }
           </UserConsumer>
       )
       /*
        return (
            <div className="cold-md-8 mb-4">
               <div className="card">
                   <div className="card-header d-flex justify-content-between">
                       <h4 className="d-inline"  onClick={this.onClickEvent.bind(this,34)}>{name}</h4>
                       <i className="far fa-trash-alt" style={{cursor:"pointer"}}></i>
                       </div>     
               </div>
               {  
               isVisible ?
               <div className="card-body">
               <p className="card-text">Salary:{salary}</p>
               <p className="card-text">Departmant:{departmant}
               </p> </div> : null
            }
             
               </div>
        
         
        )
       */ 
    }
}
/*
User.propTypes={
    id:PropTypes.string.isRequired,//Burasi number olursa bizim yeni user eklerken urettigimiz uniqid string uretigi icin sorun yasariz ondan dolayi burayi string yapariz ayrica users lar icindeki id leri de o zaman string yapmak gerekir
    name:PropTypes.string.isRequired,
    department:PropTypes.string.isRequired,
    salary:PropTypes.number.isRequired
} 
User.defaultProps={
    name:"Belirsiz",
    departmant:"... developer",
    salary:"belirsiz"
}
*/



