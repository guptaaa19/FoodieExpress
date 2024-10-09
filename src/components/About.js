import User from "./User";
import UserClass from "./UserClass";

const About = () => {
    return(
        <div>
            <h1>This is my About page.</h1>
            <h2>This is my testimony of my react learning</h2>
            <User name = {"Phoenix_function "}/>
            <UserClass name = { "Phoenix_Class" } location = { "Banglore_Class" }/>
        </div>
    );
};

export default About;