import React from 'react'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { decreaseCounter } from '../redux/actions/counterActions';

 function DecreaseCounter(props) {
    return (
        <div>
            <button onClick={e=>{
                props.dispatch(decreaseCounter())
            }} > 
            1 azalt
            </button>
        </div>
    )
}

const  mapDispatchToProps=(dispatch)=>{
    return {actions:bindActionCreators(decreaseCounter,dispatch)}
}


export default connect(mapDispatchToProps)(DecreaseCounter);


/*
 <button onClick={e=>{
                props.dispatch(decreaseCounter())
            }} > 
            1 azalt
            </button>

 const  mapDispatchToProps=(dispatch)=>{actions:bindActionCreators(decreaseCounter,dispatch)}

export default connect(mapDispatchToProps)(DecreaseCounter);
*/