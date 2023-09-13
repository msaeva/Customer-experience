import axios from "axios";
import {API_URL_FULL} from "../shared/constants";

export const getTestResultInformation = (customerId) => {
    return axios
        .get(`${API_URL_FULL}/test-results/customers/${customerId}`);
}