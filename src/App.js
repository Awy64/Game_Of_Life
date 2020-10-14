import React, {useState} from 'react';
import './App.css';
import Grid from "./components/Grid"

function App() {
  const [isON, setIsOn] = useState(false)
  const speed = 100
  const rows = 30
  const cols = 50
  let intervalId = 0
  const [gridFull, setGridFull] = useState(Array(rows).fill().map(() => Array(cols).fill(false)))
  const [generations, setGenerations] = useState(0)

  const selectBox = (row, col) => {
    let gridCopy = arrayClone(gridFull)
    gridCopy[row][col] = !gridCopy[row][col]
    setGridFull(gridCopy)
  }

  const playButton = () => {
    if (intervalId) clearInterval(intervalId)
    intervalId = setInterval(play, speed)
  }

  const stopButton = e => {
    clearInterval(intervalId)
  }

  const play = () => {
    let g = gridFull
    let g2 = arrayClone(gridFull)
    for (var i = 0; i < rows; i++){
      for (var j = 0; j < cols; j++){
        let count = 0 // will count how meny live tiles for given gridbox
        if (i > 0) if (g[i - 1][j]) count++ // top
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++ //top left
        if (i > 0 && j < cols - 1) if (g[i - 1][j + 1]) count++ // top right
        if (j < cols - 1) if (g[i][j + 1]) count++ //right
        if (j > 0) if (g[i][j - 1]) count++ //left
        if (i < rows - 1 ) if (g[i + 1][j]) count++ //bottom
        if (i < rows - 1 && j > 0) if (g[i + 1][j - 1]) count++ //bottom left
        if (i < rows - 1 && j < cols - 1) if (g[i + 1][j + 1]) count++ //bottom right
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false
        if (!g[i][j] && count === 3) g2[i][j] = true
      }
    }
    setGridFull(g2)
    setGenerations(generations => generations + 1)
    }
  

  return (
    <div className="App">
      <h1>The Game Of Life</h1>
      <button onClick={() => playButton()}>Start</button>
      <button onClick={() => stopButton()}>stop</button>
      <Grid
        cols={cols}
        gridFull={gridFull}
        rows={rows}
        selectBox={selectBox}
        />
      <h2>Generations: {generations}</h2>
    </div>
  );
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr))
}

export default App;
