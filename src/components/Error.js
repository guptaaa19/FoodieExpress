// this is our custom created error page.

import { useRouteError } from "react-router-dom";
import { errorimg } from "../utils/Constants";

const Error = () => {
    const err = useRouteError();
    console.log(err);
    return(
        <div>
            <img src={errorimg} />
        {/* <h1>Oops!!!</h1>
        <h2>Something wwent wrong!!</h2> */}
        <h2>{err.status}: {err.statusText}</h2>
        </div>
    );
};

export default Error;