import {getQuestionnaire, sendQuestionnaire} from "../services/QuestionnaireService";
import {useContext, useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import '../css/questionnaire-assessment.css'
import {QUESTIONS_VERSION} from "../shared/constants";
import NotificationContext from "../contexts/notification.context";
import {confirmWarning} from "../services/ResponseService";
import SimulationInput from "../components/SimulationInput";
import {toast} from "react-toastify";

export default function SimulationView() {
    const {notification, setNotification} = useContext(NotificationContext);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [questionnaire, setQuestionnaire] = useState({});
    const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(null);

    const [selectedSwiperQuestions, setSelectedSwiperQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const selectedSwiperQuestionsReference = useRef(selectedSwiperQuestions);
    const [knowledgeQuestions, setKnowledgeQuestions] = useState([]);

    // const data = {customerId: 1, accountTradingType: 'CFD', category: 'Financial Details', version: 1, dealer: ''}
    const [selectedData, setSelectedData] = useState({
        customerId: getRandomCustomerId(),
        accountTradingType: 'CFD',
        category: 'Financial Details',
        version: 1,
        dealer: 'T212UK'
    });

    function getRandomCustomerId() {
        return Math.floor(Math.random() * 10000) + 1;
    }

    useEffect(() => {

        // 'info' | 'success' | 'warning' | 'error' | 'default';
        toast('🦄 Wow so easy!', { type: "error" });

        getQuestionnaire(selectedData)
            .then((response) => {
                setQuestionnaire(response.data);
                const firstQuestion = response.data.questions.find(question => question.key === response.data.firstQuestionKey);
                setSelectedSwiperQuestions([firstQuestion]);
                setCurrentSelectedAnswer(null);

                if (response.data.category === 'Appropriateness Test') {
                    console.log(response.data.questions.filter(question => question.subType === 'Knowledge'));
                    setKnowledgeQuestions(response.data.questions.filter(question => question.subType === 'Knowledge'));
                }

                console.log('Questionnaire Data:', response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })

    }, [selectedData]);


    useEffect(() => {
        if (swiperInstance !== null && selectedSwiperQuestionsReference.current.length < selectedSwiperQuestions.length)
            moveToNextSwiperSlide();

        selectedSwiperQuestionsReference.current = selectedSwiperQuestions;
    }, [selectedSwiperQuestions]);

    const finishQuestionnaireAssessment = async () => {
        try {
            const data = prepareQuestionnaireAssessmentData();
            const response = await sendQuestionnaire(data, selectedData.customerId);

            if (questionnaire.category === 'Appropriateness Test') {
                setSelectedSwiperQuestions(knowledgeQuestions);
            }

            // TODO depending of the question category additional request should be send
            if (questionnaire.category === 'Financial Details' && response.data.status === 'OK') {

                // TODO new request for the next questions / notification
                setNotification({
                    active: true,
                    message: "Successful submitted answers for Financial Details",
                    severity: 'success'
                })
                setSelectedData({...selectedData, category: 'Appropriateness Test'})
                console.log('after set notification');
            } else if (questionnaire.category === 'Appropriateness Test' && response.data.status === 'OK') {
                setNotification({
                    active: true,
                    message: "Pass",
                    severity: 'success'
                })

                console.log("Pass")
            } else if (questionnaire.category === 'Appropriateness Test' &&
                (response.data.status === 'Strong Warning' || response.data.status === 'Soft Warning')) {

                console.log("inside confirm")
                setNotification({
                    active: true,
                    message: "Successful submitted answers for Appropriateness Test.",
                    severity: 'success'
                })

                confirmWarning(selectedData)
                    .then((response) => {
                        setNotification({
                            active: true,
                            message: "Successful submitted answers for Appropriateness Test." + response.data.status,
                            severity: 'success'
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                // TODO notification and send confirmation request to the back-end
            } else if (questionnaire.category === 'Appropriateness Test' &&
                response.data.status === 'Fail') {
                console.log("fail")
                // TODO
            } else if (questionnaire.category === 'Appropriateness Test' &&
                response.data.status === 'Fail-CoolDown') {
                console.log("Fail with cool down");
            }

            // TODO should get the result total points and outcome

        } catch (error) {
            console.log(error);
        }
    }

    const prepareQuestionnaireAssessmentData = () => {
        const answers = [...selectedAnswers, currentSelectedAnswer];
        const nestQuestion = questionnaire.questions.find(question => question.key === currentSelectedAnswer.nextQuestionKey);
        const questions = [...selectedSwiperQuestions, nestQuestion];

        return {
            category: questionnaire.category,
            version: QUESTIONS_VERSION,
            questions: questions.filter(question => !!question)
                .map((question, index) => {
                    return {
                        questionKey: question.key,
                        questionVersion: question.version,
                        answerKey: answers[index].key
                    }
                })
        }
    }

    const pushQuestionAnswerPair = () => {

        let nestQuestion = null;
        if (currentSelectedAnswer.nextQuestionKey === null) {
            console.log('inside knowledgeQuestions', knowledgeQuestions);
            nestQuestion = knowledgeQuestions.shift();
            setKnowledgeQuestions([...knowledgeQuestions]);
            console.log(nestQuestion);
        } else {
            nestQuestion = questionnaire.questions.find(question => question.key === currentSelectedAnswer.nextQuestionKey);
        }
        setSelectedSwiperQuestions((previous) => [...previous, nestQuestion]);
        setSelectedAnswers((previous) => [...previous, currentSelectedAnswer]);
    }
    const popQuestionAnswerPair = () => {
        selectedSwiperQuestions.pop();
        setSelectedSwiperQuestions(() => [...selectedSwiperQuestions]);

        selectedAnswers.pop();
        setSelectedAnswers((previous) => [...selectedAnswers]);
    }
    const moveToNextSwiperSlide = () => {
        swiperInstance.allowSlideNext = true;
        swiperInstance.slideNext();
        swiperInstance.allowSlideNext = false;
        setCurrentSelectedAnswer(null);
    }

    const handleDataChange = (selectedData) => {
        const data = {
            customerId: 1,
            accountTradingType: selectedData.accountTradingType,
            category: selectedData.category,
            version: selectedData.version,
            dealer: selectedData.dealer
        };
        setSelectedData(data);
    };

    const renderDecisionQuestionnaireBtn = (question) => {
        let buttonText = 'Next';
        let buttonExecuteFn = pushQuestionAnswerPair;

        if(currentSelectedAnswer?.nextQuestionKey === null) {
            if(questionnaire.category === 'Financial Details' || (question.subType === 'Knowledge' && knowledgeQuestions.length === 0)) {
                buttonText = 'Finish';
                buttonExecuteFn = finishQuestionnaireAssessment;
            }
        }

        return (
            <button
                className={`questionnaire-assessment-next-btn`}
                disabled={currentSelectedAnswer === null}
                onClick={() => buttonExecuteFn()}>
                { buttonText }
            </button>
        );
    }

    return (
        <div>
            <div>
                <SimulationInput onDataChange={handleDataChange}/>
            </div>
            <div className='questionnaire-assessment-view-wrapper'>
                <p>{questionnaire.category}</p>
                {/*<p>{questionnaire.questions.type}</p>*/}
                {/*<p>{questionnaire.questions.subtype}</p>*/}
                <div className='questionnaire-assessment-view-container'>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        allowSlideNext={false}
                        allowSlidePrev={false}
                        onInit={(swiper) => setSwiperInstance(swiper)}
                    >
                        {
                            selectedSwiperQuestions.map((question) => {
                                return <SwiperSlide key={question.id}>
                                    <div>
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <button
                                                disabled={selectedSwiperQuestions.length <= 1}
                                                className={`questionnaire-assessment-next-btn`}
                                                onClick={() => popQuestionAnswerPair()}> Previous
                                            </button>
                                            <h5 className="question-title"> {question.text} </h5>
                                            <div className="question-answers">
                                                {
                                                    question.answers.map((answer) => {
                                                        return (
                                                            <button
                                                                className={`questionnaire-assessment-select-btn 
                                                                        ${answer === currentSelectedAnswer ? 'active' : ''}`}
                                                                key={answer.questionId + answer.key.replaceAll(' ', '')}
                                                                onClick={() => setCurrentSelectedAnswer(answer)}> {answer.key}
                                                            </button>
                                                        )
                                                    })
                                                }
                                            </div>
                                            { renderDecisionQuestionnaireBtn(question) }
                                        </div>
                                    </div>
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    )
}