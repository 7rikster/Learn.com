import { Outlet } from "react-router-dom";


function StudentViewCommonLayout() {
    return ( 
        <div>
            common content
            <Outlet/>
        </div>
     );
}

export default StudentViewCommonLayout;