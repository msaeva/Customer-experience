import {useEffect, useState} from "react";
import {getCustomerIds, getResponses} from "../services/ResponseService";
import TestResult from "../components/TestResult";

export default function TestView() {
    const [testResults, setTestResults] = useState([]);
    const [type, setType] = useState(null);
    const [customerIds, setCustomerIds] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

    useEffect(() => {
        getCustomerIds()
            .then((response) => {
                console.log(response.data);
                setCustomerIds(response.data);
                setSelectedCustomerId(response.data[2])
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        console.log(selectedCustomerId)
        if (selectedCustomerId !== null) {
            getResponses(selectedCustomerId, type)
                .then((response) => {
                    setTestResults(response.data);
                    console.log('Responses Data:', response.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [selectedCustomerId, type]);


    const handleCustomerIdChange = (event) => {
        console.log(event.target.value)
        setSelectedCustomerId(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    return (
        <div>
            <div className='search-result-container'>
                <div>
                    <label>Select Customer ID:</label>
                    <select onChange={handleCustomerIdChange}>
                        <option value="">{selectedCustomerId}</option>
                        {customerIds.map((customerId) => (
                            <option key={customerId} value={customerId}>
                                {customerId}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="category">Question Type:</label>
                    <select
                        name="type"
                        id="type"
                        value=""
                        onChange={handleTypeChange}
                    >
                        <option value="" disabled>Select type</option>
                        <option value="Financial Details">Financial Details</option>
                        <option value="Appropriateness Test">Appropriateness Test</option>
                    </select>
                </div>
            </div>
            <TestResult tests={testResults}></TestResult>
        </div>
    )
}