import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser';

const Answer = () => {

    const [question, setQuestion] = useState()
    const [answer, setAnswer] = useState()

    let id = useParams().id


    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                let response = await fetch(`https://api.stackexchange.com/2.3/questions/${id}?order=desc&sort=activity&site=stackoverflow`, {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                let responseData = await response.json()
                console.log(responseData)
                setQuestion(responseData)
            }
            catch (err) { }
        }
        fetchQuestion()

    }, [])

    useEffect(() => {
        const fetchAnswer = async () => {
            try {
                let response = await fetch(`https://api.stackexchange.com/2.3/questions/${id}/answers?order=desc&sort=activity&site=stackoverflow&filter=!nKzQURF6Y5`, {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                let responseData = await response.json()
                console.log(responseData)
                setAnswer(responseData)
            }
            catch (err) { }
        }
        fetchAnswer()

    }, [])


    return (
        <>
            <div className="container-fluid mt-3 p-0">
                <div className="row no-gutters">
                    <div className="col-sm-3"></div>
                    <div className="col-12 col-sm-6">
                        <div className="card">
                            <div className="column right">
                                <p className="question">
                                    {question && question.items[0].title}
                                </p>

                                {question && question.items[0].tags.map((t, index) =>
                                    <div className="tag_box" key={index}>
                                        {t}
                                    </div>
                                )}

                                <p className="time">
                                    <span>1 min ago</span>&nbsp;
                                    <span>{question && question.items[0].owner.display_name}</span>
                                </p>
                                <span style={{ fontWeight: "bold" }}>Answers</span>
                                <div>
                                    {answer && answer.items.map(a =>
                                        <div>
                                            {parse(a.body)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        </>
    )
}

export default Answer
