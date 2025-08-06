import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Questions } from './components/Questions'

export function App() {

  const [isGameStarted, setIsGameStarted] = useState(false) // stan gry -> czy rozpoczęta?
  const [data, setData] = useState([]) // tablica do przechowywania danych pobranych z API
  const [loadingGame, setLoadingGame] = useState() //state monitorujący czy gra się wczytuje

  /*Funkcja obsługująca rozpoczęcie gry - zmiana stanu isGameStarted na 'TRUE' */

  function startGame(){
    setIsGameStarted(true)
  }

  /*useEffect obsługujący pobranie danych z API */

  useEffect(() => {
    setLoadingGame(true)
    if (isGameStarted) {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy')
      .then(res => res.json())
      .then(resp => setData(resp.results))
    setLoadingGame(false)
  }},[isGameStarted])
  

  return (
    <main>
      { !isGameStarted && <Header startGame = {startGame}/> }
      { !loadingGame && <Questions data = {data}/>}
    </main>
  )
}

/* 
Co do zrobienia następnie:
- zablokować mechanizm mieszania kolejności odpowiedzi po wyborze i zapisie odpowiedzi w tablicy ---> DO ZROBIENIA!
- zmiana stylowania przycisku, gdy zostanie zaznaczony, wyłączenie pozostałych przycisków odpowiedzi dla danego pytania
- warunkowe wyświetlanie przycisku sprawdzenia odpowiedzi (dopiero jak zostaną udzielone wszystkie odpowiedzi)
- sprawdzenie ile udzielonych odpowiedzi jest poprawnych
- wyświetlenie informacji o poprawnej ilości udzielonych odpowiedzi
- oznaczenie błędnych oraz prawidłowych odpowiedzi
- możliwość wygenerowania nowej listy pytań
*/


