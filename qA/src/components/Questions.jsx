import { decode } from 'html-entities'
import { useState, useEffect } from 'react'
import clsx from 'clsx'

export function Questions(props) {

    const [myAnswers, setMyAnswers] = useState([]) // moje odpowiedzi
    const [shuffledData, setShuffledData] = useState([]) // dane z przetasowanymi odpowiedziami

    // Tasowanie odpowiedzi tylko raz przy załadowaniu danych
    useEffect(() => {
        const shuffled = props.data.map((object) => {
            const answers = shuffleAnswers([
                ...object.incorrect_answers,
                object.correct_answer
            ])
            return {
                ...object,
                shuffledAnswers: answers
            }
        })
        setShuffledData(shuffled)
    }, [props.data])

    // Funkcja mieszająca tablicę
    function shuffleAnswers(arr) {
        const copy = [...arr]
        for (let i = copy.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1))
            ;[copy[i], copy[rand]] = [copy[rand], copy[i]]
        }
        return copy
    }

    function saveAnswer(ans) {
        if (!myAnswers.includes(ans)) {
            setMyAnswers((prevAns) => [...prevAns, ans])
        }
    }

    // Render pytań i odpowiedzi
    const questions = shuffledData.map((object, index) => {

        const decodedQuestion = decode(object.question)

        function renderAnswers() {
            return object.shuffledAnswers.map((answer, idx) => {

                const decodedAnswer = decode(answer)
                const ansIsSelected = myAnswers.includes(decodedAnswer)
                
                return (
                    <button
                        onClick={() => saveAnswer(decodedAnswer)}
                        className={clsx("answer-btn", myAnswers.length > 0 && ansIsSelected && 'selected', myAnswers.length > 0 && !ansIsSelected && 'disabled')}
                        key={idx}
                    >
                        {decodedAnswer}
                    </button>
                )
            })
        }

        return (
            <section key={index} className="question-container">
                <h2 className="question-heading">{decodedQuestion}</h2>
                <div className="answers-container">{renderAnswers()}</div>
            </section>
        )
    })

    return <>{questions}</>
}
