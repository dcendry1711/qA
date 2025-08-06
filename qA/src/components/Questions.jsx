import { decode } from 'html-entities'
import { useState, useEffect } from 'react'

export function Questions(props){

    const [myAnswers, setMyAnswers] = useState([]) // tablica przechowująca moje odpowiedzi do pytań

      
    // Mechanizmy w komponencie

    const questions = props.data.map( (object,index) => {

        const decodedQuestion = decode(object.question) // odkodowanie treści pytań
        
        // utworzenie tablicy przechowującej błędne oraz poprawną odpowiedź oraz jej pomieszanie

        const allAnswers = shuffleAnswers([
            ...object.incorrect_answers,
            object.correct_answer
        ])

        //funkcja mieszająca kolejność odpowiedzi w tablicy

        function shuffleAnswers(arr){
            const copy = [...arr]
            for (let i = copy.length - 1 ; i > 0 ; i--){
                const rand = Math.floor(Math.random() * (i+1));
                [copy[i],copy[rand]] = [copy[rand],copy[i]] 
            }
            return copy
        }

        //funkcja zapisująca w tablicy myAnswers moje odpowiedzi do pytań

        function saveAnswer(ans){
            if (!myAnswers.includes(ans)){
            setMyAnswers(prevAns => [...prevAns, ans])
            }
        }

        //funkcja wyświetlająca odpowiedzi (pomieszane)

        function renderAnswers(){

            return allAnswers.map( (answer,index) => {

                const isMyAnsArrTure = myAnswers.length > 0 // sprawdzanie czy tablica odpowiedzi zawiera elementy
                const isMyAnsInArr = isMyAnsArrTure && myAnswers.includes(answer) // sprawdza czy odpowiedź została umieszczona w tablicy odpowiedzi myAnswers

                const decodedAnswer = decode(answer)

                return(
                    <button
                        onClick={()=>saveAnswer(decodedAnswer)} 
                        className="answer-btn" 
                        key={index}
                    >
                        {decodedAnswer}
                    </button>
                ) 
                
            })
            
        }

        // Zwrotka kontenera z pytaniem i dostępnymi odpowiedziami

        return(
            <section key={index} className="question-container">
                <h2 key={object.question} className="question-heading">{decodedQuestion}</h2>
                <div className="answers-container">
                    {renderAnswers()}
                </div>
            </section>
        )
    })

    // Zwrotka komponentu dla App

    return(
        <>
            {questions}
        </>
    )
}