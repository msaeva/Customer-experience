import QuestionTable from "../components/QuestionTable";
import {useEffect, useState} from "react";
import {getQuestionnaire} from "../services/QuestionnaireService";
import QuestionnaireForm from "../components/QuestionnaireForm";

export default function QuestionnaireView() {
    const [questionnaire, setQuestionnaire] = useState({});

    const [selectedData, setSelectedData] = useState({
        customerId: 1,
        accountTradingType: 'CFD',
        category: 'Financial Details',
        version: 1,
        dealer: 'T212UK'
    });

    useEffect(() => {
        getQuestionnaire(selectedData)
            .then((response) => {
                console.log(response.data);
                setQuestionnaire(response.data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [selectedData]);

    return (
        <div>
            <QuestionnaireForm setSelectedData={setSelectedData}/>
            <QuestionTable questions={questionnaire.questions}/>
        </div>
    );
}