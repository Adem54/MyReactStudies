import React from 'react'
import ContentFooter from './ContentFooter'
import TodoList from './TodoList'

const Content = () => {
  return (
      <React.Fragment>
    <section className='main'>
    <input className='toggle-all' type="checkbox"/>
    <label htmlFor="toggle-all">
        Mark all as complete
    </label>

   <TodoList/>
  
</section>
<ContentFooter/>

</React.Fragment>
  )
}

export default Content