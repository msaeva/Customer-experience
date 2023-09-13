import {useState} from "react";
import '../css/simulation-input.css'

export default function SimulationInput({onDataChange}) {
    const [selectedData, setSelectedData] = useState({
        customerId: 1,
        accountTradingType: 'CFD',
        category: 'Financial Details',
        version: 1,
        dealer: 'T212UK'
    });

    const handleDataChange = () => {
        onDataChange(selectedData);
    };

    const handleAccountTypeChange = (e) => {
        setSelectedData({...selectedData, accountTradingType: e.target.value});
    };


    const handleVersionChange = (e) => {
        setSelectedData({...selectedData, version: e.target.value});
    }

    const handleDealerChange = (e) => {
        setSelectedData({...selectedData, dealer: e.target.value});
    }

    return (
        <div className='search-container'>
            <div>
                <label htmlFor="accountType">Account Type:</label>
                <select
                    name="accountType"
                    id="accountType"
                    value={selectedData.accountTradingType}
                    onChange={handleAccountTypeChange}
                >
                    <option value="CFD">CFD</option>
                    <option value="Equity">EQUITY</option>
                </select>
            </div>
            <div>
                <label htmlFor="dealer">Dealer: </label>
                <select
                    name="dealer"
                    id="dealer"
                    value={selectedData.dealer}
                    onChange={handleDealerChange}
                >
                    <option value="T212UK">T212UK</option>
                    <option value="T212CY">T212CY</option>
                </select>
            </div>
            <div>
                <label htmlFor="version">Version:</label>
                <select
                    name="version"
                    id="version"
                    value={selectedData.version}
                    onChange={handleVersionChange}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
            <div>
                <button className='search-button' onClick={handleDataChange}>Search</button>
            </div>
        </div>
    );
}