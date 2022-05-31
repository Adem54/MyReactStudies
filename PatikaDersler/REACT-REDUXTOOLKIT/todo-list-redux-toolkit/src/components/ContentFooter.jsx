import React from 'react'
import { useSelector } from 'react-redux';

const ContentFooter = () => {
	const items=useSelector((state)=>state.todos.items);
	console.log("items: ",items);
	const itemsLeft=items.filter(item=>!item.completed).length;
	const activeFilter=useSelector((state)=>state.todos.activeFilter);
  return (
//This footer should hidden by default and shown when there are todos

	<footer className="footer">
        {/* This should be `0 items left` by default  */}
		<span className="todo-count">
			<strong>{itemsLeft} </strong>
			  item{itemsLeft > 1 ? "s" : ""} left
		</span>
		<ul className="filters">
			<li>
				<a className={activeFilter==="all" ? "selected" : ""}>All</a>
			</li>
			<li>
				<a className={activeFilter==="active" ? "selected" : ""}>Active</a>
			</li>
			<li>
				<a className={activeFilter==="completed" ? "selected" : ""}>Completed</a>
			</li>
		</ul>

	{/*Hidden if no completed items are left ↓ */}
		<button className='clear-completed'>
			Clear completed
		</button>
	</footer>
  )
}

export default ContentFooter;