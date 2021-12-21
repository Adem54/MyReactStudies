import React from 'react'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {increaseByTwoCounter} from '../redux/actions/counterActions';

 function IncreaseByTwoCounter(props) {
    console.log(props.actions);
    return (
        <div>
            <button onClick={e=>props.dispatch(increaseByTwoCounter())}  >  2 arttir!</button>
        </div>
    )
}


const mapDispatchToProps=(dispatch)=>
{
  return  {actions:bindActionCreators(IncreaseByTwoCounter,dispatch)};
}

export default connect(mapDispatchToProps)(IncreaseByTwoCounter);