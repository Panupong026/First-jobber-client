import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Questionnaire.css'
import axios from 'axios';
import Result from '../Result/Result'

const determineTip = (answers) => {
    if (isCarAgeLessThan6Years(answers[0])) {
        return handleCarAgeLessThan6Years(answers);
    } else if (isCarAgeBetween6And10Years(answers[0])) {
        return handleCarAgeBetween6And10Years(answers);
    } else if (isCarAgeGreaterThan11Years(answers[0])) {
        return handleCarAgeGreaterThan11Years(answers);
    }
    return 'Invalid answer(s)';
}

const isCarAgeLessThan6Years = (carAge) => carAge === '0 - 5 years';
const isCarAgeBetween6And10Years = (carAge) => carAge === ' 6 - 10 years';
const isCarAgeGreaterThan11Years = (carAge) => carAge === ' 11 years ++';

const handleCarAgeLessThan6Years = (answers) => {
    if ((answers[4] === '0 - 3 days/week' && (answers[5] === '1 - 30 km' || answers[5] === '31 - 60 km')) ||
        (answers[4] === '4 - 5 days/week' && answers[5] === '1 - 30 km')) {
        return 'TIP Up to mile';
    } else {
        return 'TIP Premium'
    }
}

const handleCarAgeBetween6And10Years = (answers) => {
    if (answers[1] === '15,001 - 20,000 THB' || answers[1] === '20,001 THB ++') {
        return 'TIP Premium plus';
    } else if (answers[1] === '5,000 - 10,000 THB') {
        return 'TIP 2+';
    } else if (answers[1] === '10,001 - 15,000 THB') {
        if ((answers[4] === '0 - 3 days/week' && (answers[5] === '1 - 30 km' || answers[5] === '31 - 60 km')) ||
            (answers[4] === '4 - 5 days/week' && answers[5] === '1 - 30 km')) {
            return 'TIP Up to mile';
        } else {
            return 'TIP Premium';
        }
    }
}

const handleCarAgeGreaterThan11Years = (answers) => {
    if (answers[1] !== '5,000 - 10,000 THB') {
        return 'TIP 2+';
    } else {
        return 'TIP 3+';
    }
}


const Questionnaire = () => {
    const [questions] = useState([
        { id: 1, question: 'How old is your car?', options: ['0 - 5 years', ' 6 - 10 years', ' 11 years ++'] },
        { id: 2, question: 'How much is your budget limit?', options: ['5,000 - 10,000 THB', '10,001 - 15,000 THB', '15,001 - 20,000 THB', '20,001 THB ++'] },
        { id: 3, question: 'How old is the main driver?', options: ['20 - 30 years old', '31 - 40 years old', '41 - 50 years old', '51 - 60 years old', '61 years old ++'] },
        { id: 4, question: 'How long have you driven?', options: ['0 - 6 months', '6 - 12 months', '1 - 2 years', '2 years +'] },
        { id: 5, question: 'How often you drive in a week?', options: ['0 - 3 days/week', '4 - 5 days/week', '6 - 7 days/week'] },
        { id: 6, question: 'How far you drive in a week?', options: ['1 - 30 km', '31 - 60 km', '61 - 90 km', '91 - 120 km', '121 - 150 km', '151 - 180 km', '180 km++'] },
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = (option) => {
        setAnswers([...answers, option]);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    const tip = determineTip(answers)

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/insurances")
            .then((res) => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="questionnaire-page">
            {currentQuestion &&
                <Form onSubmit={handleAnswer}>
                    <Form.Group controlId="formQuestion">
                        <Form.Label>
                            <div className="questions">
                                {currentQuestion.question}
                            </div>
                        </Form.Label>
                        {
                            currentQuestion.options.map((option, index) => (
                                <div
                                    className="choice"
                                    key={index}
                                    onClick={() => handleAnswer(option)}>
                                    {option}
                                </div>
                            ))
                        }
                    </Form.Group>
                </Form>
            }
            {currentQuestionIndex === questions.length &&
                <Result
                    data={data}
                    tip={tip}
                />
            }
        </div>
    );
};

export default Questionnaire;

