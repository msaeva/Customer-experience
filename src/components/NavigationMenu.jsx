import {NavLink} from "react-router-dom";
import '../css/naviagtion-menu.css'

function NavigationMenu() {
    return (
        <div className='main-content-wrapper'>
            <div className='logo'>
                <img src="/images/trading212-logo.png" alt='Logo'/>
            </div>
            <nav className="navigation-menu">
                <ul className="menu-list">
                    <li className="menu-item">
                        <NavLink to="/configuration">Configuration</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink to="/questions">Questions And Answers</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink className='nav-link' to="/simulation">Simulation Page</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink to="/test-results">Test Result</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavigationMenu;
