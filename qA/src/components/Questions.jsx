import {decode} from 'html-entities'

export function Questions(props){

    // Mechanizmy w komponencie

    const questions = props.data.map( (object,index) => {

        const decodedQuestion = decode(object.question) // odkodowanie treści pytań
        
        // utworzenie tablicy przechowującej błędne oraz poprawną odpowiedź

        const allAnswers = [
            ...object.incorrect_answers,
            object.correct_answer
        ]

        //funkcja mieszająca kolejność odpowiedzi w tablicy

        function shuffleAnswers(arr){
            const arrToShuffle = arr
            for (let i = allAnswers.length - 1 ; i > 0 ; i--){
                const rand = Math.floor(Math.random() * (i+1));
                [arr[i],arr[rand]] = [arr[rand],arr[i]] 
            }
            return arrToShuffle
        }

        //funkcja wyświetlająca odpowiedzi (pomieszane)

        function renderAnswers(){
            const shuffledArray = shuffleAnswers(allAnswers)
            return shuffledArray.map( (answer,index) => {

                const decodedAnswers = decode(answer)

                return(
                    <button 
                        className="answer-btn" 
                        key={index}
                    >
                        {decodedAnswers}
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