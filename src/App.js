import './App.css';
import SimulationView from "./view/SimulationView";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TestView from "./view/TestView";
import ConfigurationView from "./view/ConfigurationView";
import QuestionnaireView from "./view/QuestionnaireView";
import RootLayout from "./layouts/RootLayout";
import NotificationContext from "./contexts/notification.context";
import {useState} from "react";

function App() {
    const [notification, setNotification] = useState({active: false, message: '', severity: 'success'});
    return (
        <BrowserRouter>
            <NotificationContext.Provider value={{notification, setNotification}}>
                <Routes>
                    <Route path='/' element={<RootLayout/>}>
                        <Route path='/simulation' element={<SimulationView/>}></Route>
                        <Route path='/configuration' element={<ConfigurationView/>}></Route>
                        <Route path='/test-results' element={<TestView/>}></Route>
                        <Route path='/questions' element={<QuestionnaireView/>}></Route>
                    </Route>
                </Routes>
            </NotificationContext.Provider>
        </BrowserRouter>
    );
}

export default App;
