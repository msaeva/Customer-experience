import React from "react";
import NavigationMenu from "../components/NavigationMenu";
import {Outlet} from "react-router-dom";


function RootLayout() {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: 'auto 1fr'}}>
            <header>
                <NavigationMenu></NavigationMenu>
            </header>
            <main style={{ minHeight: '100%' }}>
                <Outlet/>
            </main>
        </div>
    );
}

export default RootLayout;