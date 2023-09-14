import {useState} from "react";
import '../css/questionnaire-form.css'

export default function QuestionnaireForm({setSelectedData}) {
    const [data, setData] = useState({
        customerId: 1,
        accountTradingType: 'CFD',
        category: 'Financial Details',
        version: 1,
        dealer: 'T212UK'
    });

    const handleDataChange = () => {
       setSelectedData(data)
    };


    const handleCategoryChange = (e) => {
        setData({...data, category: e.target.value});
    };

    const handleAccountTypeChange = (e) => {
        setData({...data, accountTradingType: e.target.value});
    };


    const handleVersionChange = (e) => {
        setData({...data, version: e.target.value});
    }

    const handleDealerChange = (e) => {
        setData({...data, dealer: e.target.value});
    }

    return (
        <div className='search-container'>
            <div className='search-field'>
                <label htmlFor="category">Question Category:</label>
                <select className="search-input"
                    name="category"
                    id="category"
                    value={data.category}
                    onChange={handleCategoryChange}
                >
                    <option value="Financial Details">Financial Details</option>
                    <option value="Appropriateness Test">Appropriateness Test</option>
                </select>
            </div>
            <div className='search-field'>
                <label htmlFor="accountType">Account Type:</label>
                <select className="search-input"
                    name="accountType"
                    id="accountType"
                    value={data.accountTradingType}
                    onChange={handleAccountTypeChange}
                >
                    <option value="CFD">CFD</option>
                    <option value="Equity">EQUITY</option>
                </select>
            </div>
            <div className='search-field'>
                <label htmlFor="dealer">Dealer: </label>
                <select className="search-input"
                    name="dealer"
                    id="dealer"
                    value={data.dealer}
                    onChange={handleDealerChange}
                >
                    <option value="T212UK">T212UK</option>
                    <option value="T212CY">T212CY</option>
                </select>
            </div>
            <div className='search-field'>
                <label htmlFor="version">Version:</label>
                <select className="search-input"
                    name="version"
                    id="version"
                    value={data.version}
                    onChange={handleVersionChange}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
            <div className='search-field'>
                <button className='search-button' onClick={handleDataChange}>Search</button>
            </div>
        </div>
    );
}