import './App.css';
import SimulationView from "./view/SimulationView";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TestView from "./view/TestView";
import ConfigurationView from "./view/ConfigurationView";
import QuestionnaireView from "./view/QuestionnaireView";
import RootLayout from "./layouts/RootLayout";
import NotificationContext from "./contexts/notification.context";
import {useState} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <ToastContainer />
            </NotificationContext.Provider>
        </BrowserRouter>
    );
}

export default App;
