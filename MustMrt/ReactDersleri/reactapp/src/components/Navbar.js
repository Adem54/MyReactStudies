import React from 'react';
import PropTypes from 'prop-types';
 const Navbar= (props)=><div><h3>
     {props.title}
     </h3></div>

     Navbar.propTypes={
         title : PropTypes.string.isRequired
     }
     Navbar.defaultProps={
        title : "Default User App"
    }
export default Navbar;