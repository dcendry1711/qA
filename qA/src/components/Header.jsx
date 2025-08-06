export function Header(props){
    return(
        <header>
            <h1 className="game-title">Quizzical</h1>
            <p className="title-paragraph">Ready for some questions?</p>
            <button onClick={props.startGame} className="start-game-btn">Start game</button>
        </header>
    )
}