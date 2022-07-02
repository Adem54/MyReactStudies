import React,{ useState } from 'react'
import './App.css'
import Content from './components/Content'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
<React.Fragment>
    <section className="todoapp">
 <Header/>
 <Content/>
    </section>
    <Footer/>
    </React.Fragment>
  )
}

export default App
