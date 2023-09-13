import axios from "axios";
import {API_URL_FULL} from "../shared/constants";


export const getQuestionnaire = (data) => {
   return  axios
        .get(`${API_URL_FULL}/questionnaire`, {
            params: {
                customerId: data.customerId,
                accountTradingType:data.accountTradingType,
                category:data.category,
                version:data.version,
                dealer: data.dealer
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
        })
}


export const sendQuestionnaire = (data, customerId) => {
    return axios
        .post(`${API_URL_FULL}/customers/${customerId}?accountTradingType=CFD`, {
            ...data
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
}