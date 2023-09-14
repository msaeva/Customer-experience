import './App.css';
import SimulationView from "./view/SimulationView";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TestResultView from "./view/TestResultView";
import ConfigurationView from "./view/ConfigurationView";
import QuestionnaireView from "./view/QuestionnaireView";
import RootLayout from "./layouts/RootLayout";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path='/' element={<RootLayout/>}>
                        <Route path='/simulation' element={<SimulationView/>}></Route>
                        <Route path='/configuration' element={<ConfigurationView/>}></Route>
                        <Route path='/test-results' element={<TestResultView/>}></Route>
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
        </BrowserRouter>
    );
}

export default App;
