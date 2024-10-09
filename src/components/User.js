import { useState } from "react";

const User = ( {name} ) =>{
    const [count] = useState(0);
    return(
        <div className = "user-card">
            <h1>Count = 0</h1>
            <h2>Name: {name}</h2>
            <h3>Location: Dumbledore's Office</h3>
            <h3>Contact: @fireyphoenix</h3>
        </div>
    );
};

export default User;