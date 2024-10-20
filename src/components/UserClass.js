import React from "react";

class UserClass extends React.Component{

    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            count : 0,
            count2 : 1,
        };
    }
    render(){

        const { name, location } = this.props;  // destructuring on the fly
        const {count } = this.state;

        return(
            <div className = "user-card">
                <h1>Count = {count}</h1>
            <h2>Name: { name }</h2> 
            {/* this: so that the prop can be accessed any where inside the class */}
            <h3>Location: { location }</h3>
            <h3>Contact: @fireyphoenix</h3>
        </div>
        );
    };
};

export default UserClass;