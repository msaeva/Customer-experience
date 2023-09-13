import React from "react";
import NavigationMenu from "../components/NavigationMenu";
import {Outlet} from "react-router-dom";


function RootLayout() {
    return (
        <div>
            <header>
                <NavigationMenu></NavigationMenu>
            </header>
            <main><Outlet/></main>
        </div>
    );
}

export default RootLayout;