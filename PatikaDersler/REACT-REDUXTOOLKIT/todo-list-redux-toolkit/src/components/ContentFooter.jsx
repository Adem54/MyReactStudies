import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { changeActiveFilter,selectActiveFilter} from "../redux/todos/todosSlice";

const ContentFooter = () => {
  const items = useSelector((state) => state.todos.items);

  const itemsLeft = items.filter((item) => !item.completed).length;
  const activeFilter = useSelector(selectActiveFilter);
 
  
  console.log("activeFilter: ",activeFilter);
  const dispatch = useDispatch();

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
          <a className={activeFilter === "all" ? "selected" : ""}
		  onClick={()=>dispatch(changeActiveFilter("all"))}
		  >All</a>
        </li>
        <li>
			{/* active demek completed olmayanlar demektir */}
          <a
            className={activeFilter === "active" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("active"))}
          >
            Active
          </a>
        </li>
        <li>
          <a className={activeFilter === "completed" ? "selected" : ""}
		  onClick={()=>dispatch(changeActiveFilter("completed"))}
		  >
            Completed
          </a>
        </li>
      </ul>

      {/*Hidden if no completed items are left ↓ */}
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default ContentFooter;
