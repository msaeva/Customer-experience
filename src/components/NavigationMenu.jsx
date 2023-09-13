import {Link, NavLink} from "react-router-dom";
import '../css/naviagtion-menu.css'

function NavigationMenu() {
    return (
        <nav className="navigation-menu">
            <ul className="menu-list">
                <li className="menu-item">
                    <NavLink to="/simulation"
                          activeClassName="active">Simulation Page</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="/questions"
                          activeClassName="active">Questions And Answers</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="/configuration"
                          activeClassName="active">Configuration</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="/test-results"
                             activeClassName="active">Test Result</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationMenu;
