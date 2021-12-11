import React, { Component } from 'react'
import User from './User';
import UserConsumer  from '../context';
//Biz App. de state e yazdgimiz her bir user i burda render edecegiz..
class Users extends Component {
    render() {
        return (
           <UserConsumer>
               {//value this.users
                   value=>{//value bir arrow function, ve value parametre olarak geliyor UserConsumer icerisinde
                       const {users}=value;
                    
                       return (
                        <div>
                        {
                        users.map((user)=>{
                                return (
                                    <User 
                                    key={user.id}
                                    id={user.id}
                                    name={user.name}
                                    salary={user.salary}
                                    departmant={user.departmant}
                                    />
                                )
                            })
                        }
                        </div>
                       )
                   }
               }
           </UserConsumer>
        )  
    }
}

export default Users;