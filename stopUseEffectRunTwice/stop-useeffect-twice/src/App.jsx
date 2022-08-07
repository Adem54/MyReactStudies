import { useEffect, useRef, useState } from 'react'
import './App.css'
import MyComponent from './MyComponent'

function App() {
  const effectRan = useRef(false)
  useEffect(() => {
    console.log('effect ran')
    console.log('effect ran: ',effectRan)

    // Solution #1
    // We use ofthen our get request in the useEffect, we attempt to this scenario
     if (effectRan.current === false) {
      const fetchUsers = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const json = await response.json()
        console.log(json)
      }

      fetchUsers()

      //  Clean up function-it removes the compoent
      return () => {
        console.log('unmounted')
        effectRan.current = true//We only got one fetch response because of we use effectRan.current
      }
    } 



//  Variation #2
//    updated from video to include development check
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const fetchUsers = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const json = await response.json()
        console.log(json)
      }

      fetchUsers()
    }

         return () => {
        console.log('unmounted')
        effectRan.current = true//We only got one fetch response because of we use effectRan.current
      }
  }, [])

/*
1-Component mounts-> effects run -> creates listener
2-Component unmounts-> clean up -> remove listener
3Compnents mounts-> effect runs -> creates listener

*/

//DIFFERENT SOLUTION
  useEffect(() => {
     const listener=() => console.log("Hello world");
     document.addEventListener('click', listener );
    //if you use addEventlistener you should always clean it up
    return()=>{
      //clean-up function to delete one of mounts becase, this creates 2 eventlistener
      //We have to remove one event-listener
      document.removeEventListener("click",listener)
    }
  }, []);
  /*
  Kisacasi bizim calisan fonksiyonu eger ortadan kaldirma gibi bir durumuzu var ise onu ortadan kaldirarak 2. kez calismasini engelleybiliyoruz bu sekilde
  useRef islemin e hic girmeden...Ama baska turlu bir islem yapma durmumuz da ise
  */

const shouldLog=useRef(true);
useEffect(()=>{
  if(shouldLog.current){
    shouldLog.current=false;
    console.log("Hello my friend");
  }
},[])

/*
the console log in the useEffect works twice because of the strict mode react 18, if we remove the strict mode in main.jsx or index.jsx, it will run only once
But to solve this with strict mode we can use,  const shouldLog=useRef(true);
 if(shouldLog.current){
    shouldLog.current=false;
    console.log("Hello my friend");
  }
  This method we can use only when we do not need to clean up function
*/

  return (
    <div className="App">
    </div>
  )
}

export default App

/*
In StrictMode, starting from React 18, in development mode, the effects will be mounted, unmounted, and mounted again.
This happens only in development mode, not in production mode.
This was added to help React in the future to introduce a feature where it can add or remove a section of the UI while preserving the state. For example, while switching between tabs, preserving the state of the previous tab helps in preventing unnecessary execution of effects like API calls.

We can confirm the behavior by adding a cleanup function to the useEffect hook:
If you have read the previous section, this is not really an issue. Hence it doesn't need any fixing.

*/
