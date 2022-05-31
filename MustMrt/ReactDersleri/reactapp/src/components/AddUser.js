import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from '../context';
var uniqid=require('uniqid');//direk uniqid() seklinde kullanarak uniq id uretir bize

const Animation=posed.div(
    {
        visible: {
            opacity:1,
            applyAtStart:{
                display:"block"
            }
        },
        hidden:{
            opacity:0,
            applyAtEnd:{
                display:"none"
            }
        }
    }
);//Animation icine artik css ozelliklerini normal bir js gibi verebiliyoruz

 class AddUser extends Component {
     state={
         visible:false,
         name:"",
         departmant:"",
         salary:""
     }

     changeVisibility=(e)=>{
         this.setState({
             visible:!this.state.visible
         })
     }

/* 
     changeName=(e)=>{
        this.setState({
        name:e.target.value
        })
    }
    changeDepartmant=(e)=>{
        this.setState({
            departmant:e.target.value
            })
   }
   changeSalary=(e)=>{
    this.setState({
        salary:e.target.value
        })
   }
*/

changeInput=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
}

addUser=(dispatch,e)=>{
    e.preventDefault();
    console.log("Test");
    const {name,departmant,salary}=this.state;
    const id=uniqid();
    //Shorthand property names kullanimi ile kullanabiliriz
    const newUser={
        id,
        name,
        departmant,
        salary
    }
    dispatch({type:"ADD_USER",payload:newUser})
    console.log("newUser ",newUser);
}


    render() {
        const {visible,name,salary,departmant}=this.state;
      return <UserConsumer>
          {
              value=>{
                  const {dispatch}=value;
                return (
                    <div className="col-md-8 mb-4">
                        <button onClick={this.changeVisibility} className="col-md-8 mb-4 btn btn-dark btn-block">{visible ? "Hide Form": "Show Form"}  </button>
                        <br/>
                        <Animation pose={visible ? "visible" : "hidden"} >
                        <div className="card">
                            <div className="card-header">
                            <h4>Add User Form</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.addUser.bind(this,dispatch)}>
                                    <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                type="text"
                                name="name"
                                id="id"
                                placeholder="Enter Name"
                                className="form-control"
                                value={name}
                                onChange={this.changeInput}
                                />
                                    </div>
                                    <div className="form-group">
                                <label htmlFor="departmant">Departmant</label>
                                <input
                                type="text"
                                name="departmant"
                                id="departmant"
                                placeholder="Enter Departmant"
                                className="form-control"
                                value={departmant}
                                onChange={this.changeInput}
                
                                />
                                    </div>
                                    <div className="form-group">
                                <label htmlFor="salary">Salary</label>
                                <input
                                type="text"
                                name="salary"
                                id="salary"
                                placeholder="Enter Salary"
                                className="form-control"
                                value={salary}
                                onChange={this.changeInput}
                
                                />
                             
                                    </div>
                                    <br/>  
                                    <button className="col-md-8 mb-4 btn btn-danger btn-block" type="submit">Add User</button>
                                  
                                </form>
                            </div>
                        </div>
                
                        </Animation>
                    </div>
                )
              }
          }

      </UserConsumer>
    }
}

export default AddUser;

