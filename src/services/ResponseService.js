import axios from "axios";
import {API_URL_FULL} from "../shared/constants";

export const getResponses = (customerId, type) => {
    return axios
        .get(`${API_URL_FULL}/customers/${customerId}`, {
            params: {
                type: type,
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
        })
}

export const getCustomerIds = () => {
    return axios
        .get(`${API_URL_FULL}/test-results/customer-ids`);
}

export const confirmWarning = (data) => {
    return axios.put(`${API_URL_FULL}/customers/${data.customerId}/warning`, {
        accountTradingType: data.accountTradingType,
        category: data.category,
        dealer: data.dealer

    })
}