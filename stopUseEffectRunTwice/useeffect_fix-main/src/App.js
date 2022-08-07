import { useEffect, useRef } from "react";

function App() {
  const effectRan = useRef(false)

  useEffect(() => {
    console.log('effect ran')

    // Variation #1
    /* if (effectRan.current === false) {
      const fetchUsers = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const json = await response.json()
        console.log(json)
      }

      fetchUsers()

      return () => {
        console.log('unmounted')
        effectRan.current = true
      }
    } */

    // Variation #2
    // updated from video to include development check
    //React encouring us to not to use http request such this, react encourage to use react-query or redux-rtk-query or others but not this.
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
      effectRan.current = true
    }
  }, [])

  //Normally when we put empty depeendency array in useEffect,we expect that useEffect run one time, but it works twice with react18
  //


  return <p></p>;
}

export default App;
