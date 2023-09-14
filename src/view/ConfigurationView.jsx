import {
    Background,
    Controls,
    MarkerType,
    MiniMap,
    Position,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState
} from "reactflow";

import './overview.css';
import 'reactflow/dist/style.css';
import {useCallback, useEffect, useState} from "react";
import {getQuestionnaire} from "../services/QuestionnaireService";
import {generateRandomString} from "../utils/utls";
import CustomQuestion from "../components/CustomQuestion";

export default function ConfigurationView() {

    const nodeTypes = {
        custom: CustomQuestion,
    };

    const [nodes, setNodes, onNodesChange] = useNodesState([]);

    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const minimapStyle = {
        height: 120,
    };

    useEffect(() => {
        const data = {
            customerId: 1,
            accountTradingType: 'CFD',
            category: 'Financial Details',
            version: 1,
            dealer: 'T212UK'
        }

        getQuestionnaire(data)
            .then((response) => {
                console.log(response.data.firstQuestionKey);

                const questions = response.data.questions;
                console.log(questions);
                const firstQuestion = questions.find(question => question.key === response.data.firstQuestionKey);
                console.log(firstQuestion);

                setNodes((previous) => [...previous, {
                    id: firstQuestion.id.toString(),
                    type: 'default',
                    data: {
                        label: firstQuestion.key,
                    },
                    position: {x: 0, y: 0},
                }])

                position(firstQuestion, questions, 1);


            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, []);

    const position = (parent, questions, verticalLevel = 0) => {
        const rowQuestionNodes = [], rowQuestionEdges = [];

        let horizontalSpacingIndex = 0;


        let answerKeys = [], index = 0;
        const foundQuestionsPerRow = new Set();
        for (const answer of parent.answers) {
            if (answer === null) continue;

            const question = questions.find(question => question.key === answer.nextQuestionKey) ?? null;
            index++;
            if (question === null) {
                // const node = {
                //     id: generateRandomString(10),
                //     type: 'default',
                //     data: {
                //         label: 'Termination',
                //     },
                //     position: {x: 450 * horizontalSpacingIndex, y: 125 * verticalLevel},
                // };
                //
                // rowQuestionEdges.push({
                //     id: parent.id + generateRandomString(15),
                //     source: parent.id.toString(),
                //     target: node.id,
                //     label: answer.key,
                //     markerEnd: {
                //         type: MarkerType.ArrowClosed,
                //     },
                // });
                //
                // rowQuestionNodes.push(node);
                // horizontalSpacingIndex++;
                continue;
            }

            answerKeys.push(answer.key.toString());

            if (index === parent.answers.length) {
                rowQuestionEdges.push({
                    id: parent.id + generateRandomString(10) + question.id,
                    source: parent.id.toString(),
                    target: question.id.toString(),
                    label: answerKeys.join(' --> '),
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                    },
                });
            }


            if (foundQuestionsPerRow.has(question.id)) {
                continue;
            }

            position(question, questions, verticalLevel + 1);
            foundQuestionsPerRow.add(question.id);
            rowQuestionNodes.push({
                id: question.id.toString(),
                type: 'custom', // custom
                data: {
                    properties: {question},
                    label: question.key,
                },
                position: {x: 450 * horizontalSpacingIndex, y: 125 * verticalLevel},
            });
            horizontalSpacingIndex++;
        }

        setNodes((previous) => [...previous, ...rowQuestionNodes]);
        setEdges((previous) => [...previous, ...rowQuestionEdges]);
    }
    const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);
    const onConnect = (params) => {
        const edge = {
            id: params.target + generateRandomString(10) + params.source,
            source: params.source,
            target: params.target,
            label: 'special label',
            markerEnd: {
                type: MarkerType.ArrowClosed,
            },
        }

        setEdges((previous) => [...previous, edge]);
        console.log(params)
    };

    return (
        <div style={{height: '100vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onInit={onInit}
                nodeTypes={nodeTypes}
                onConnect={onConnect}
                fitView
                attributionPosition="top-right"
            >
                <MiniMap style={minimapStyle} zoomable pannable/>
                <Controls/>
                <Background color="#aaa" gap={16}/>
            </ReactFlow>

        </div>
    )

}