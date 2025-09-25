import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/QuestionTracker/Sidebar";


function QuestionTracker() {
    

    return (
        <div className="flex flex-col w-full h-full gap-2 overflow-hidden border-t md:gap-0 lg:flex-row md:px-0">
            <Sidebar />
            <Outlet/>
        </div>
    );
}

export default QuestionTracker;
