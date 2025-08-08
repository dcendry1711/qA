import { decode } from 'html-entities'
import { useState, useEffect } from 'react'
import clsx from 'clsx'

export function Questions(props) {

    const [allData, setAllData] = useState([])
    const [myAnswers, setMyAnswers] = useState([])
    const [finalResult, setFinalResult] = useState()
    
    const correctAnswers = allData.map( qob => {
        return qob.correct_answer
    })

    function showResult(){
        let result = 0
        for (let i = 0 ; i < myAnswers.length ; i++){
            if(correctAnswers.includes(myAnswers[i])){
                result++
            }
        }
        setFinalResult(result)
    }

    /*
        useEffect - dla każdego obiektu tworzy właściwość "possibleAnswers" zawierającą możliwe odpowiedzi (questionAnswers). Wszystko jest przechowane w tablicy avAns, która jest przekazana do state "allANs" 
        do tego w trakcie tworzenia tablicy ze wszystkimi odpowiedziami następuje ich pomieszanie za pomocą funkcji shuffleAnswers
    */

    useEffect(()=>{
        const avAns = props.data.map( q => {
            const questionAnswers = shuffleAnswers([...q.incorrect_answers, q.correct_answer])
        return {
            ...q,
            possibleAnswers: questionAnswers
        }
        })
        setAllData(avAns)
    },[props.data])


    //funkcja do mieszania odpowiedzi w obiekcie

    function shuffleAnswers(arr){
        const copy = [...arr]
        for (let i = copy.length - 1 ; i > 0 ; i--){
            const j = Math.floor(Math.random() * (i+1));
            [copy[i],copy[j]] = [copy[j],copy[i]]
        }
        return copy
    }

    //Odkodowanie odpowiedzi i wyświetlenie pytań w komponencie

    const question = allData.map( object => {

        const decodedQuestion = decode(object.question)

        function addAnswerToArr(answer){
             if(!myAnswers.includes(answer)){
                 setMyAnswers(prev => [...prev,answer])
             }
        }

        return(
            <section key={decodedQuestion} className="single-question">
                <h2>{decodedQuestion}</h2>
                <div className="answers-container">
                    {object.possibleAnswers.map(ans => {

                        // stylowanie warunkowe odpowiedzi i ogólne warunki dla odpowiedzi

                        const decodeAnswer = decode(ans)
                        const ansIsSelected = myAnswers.length > 0 && myAnswers.includes(ans)
                        const classNameBtn = clsx('single-button', ansIsSelected && 'selected')

                        return(
                            <button 
                                onClick={() => addAnswerToArr(ans)} 
                                className={classNameBtn} 
                                key={ans}>
                                    {decodeAnswer}
                            </button>
                        )
                    })}
                </div>
            </section>
        )
    })

    //Zwracane elementy z powyższego kodu do APP

    return(
        <>
            {question}
            {myAnswers.length === 5 && <button onClick={showResult} className="check-ans-btn">Check My Answers</button>}
            {finalResult && 
                <section>
                    <p>Your result: {finalResult}/{myAnswers.length} correct</p> 
                        <br></br>
                    <p>Correct answers: {correctAnswers.map(ans => {return ans}).join('/ ')}</p>
                </section>
            }
        </>
    )
}