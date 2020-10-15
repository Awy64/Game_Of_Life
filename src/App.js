import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import Grid from "./components/Grid"

function App() {
  const rows = 30
  const cols = 50
  const [gridFull, setGridFull] = useState(Array(rows).fill().map(() => Array(cols).fill(false)))
  const [generations, setGenerations] = useState(0)

  const [running, setRunning] = useState(false)
  const [speed, setSpeed] = useState(100)
  const [formData, setFormData] = useState({speed: 100})

  const selectBox = (row, col) => {
    if (running){
      return
    }
    let gridCopy = arrayClone(gridFull)
    gridCopy[row][col] = !gridCopy[row][col]
    setGridFull(gridCopy)
  }

  const playButton = () => {
    setRunning(!running)
  }

  const clearButton = () => {
    setGridFull(Array(rows).fill().map(() => Array(cols).fill(false)))
    setGenerations(0)
  }


  const randomButton = () => {
    seed()
  }

  const seed = () => {
    let gridCopy = arrayClone(gridFull)
    for (let i = 0; i < rows; i++){
      for (let j = 0; j < cols; j++){
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true
        }
      }
    }
    setGridFull(gridCopy)
  }
  const step = () => {
    let g = gridFull
    let g2 = arrayClone(gridFull) // my buffer
    
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
    
    setGenerations(g => g + 1)
    setGridFull(g2)
    return
  }
  
  
  const play = async () => {
    if (!running){
      return
    }
    let g = gridFull
    let g2 = arrayClone(gridFull) // my buffer
    
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
    
    setGenerations(g => g + 1)
    setGridFull(g2)
    return
  }
    
  useEffect(() => {
    if (running) {
      setTimeout(() => play(), speed)
    }else{
      return
    }
  }, [gridFull, running])

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <div className="App">
      <h1>Conways Game Of Life</h1>
      <div className="center">
        <button onClick={playButton}>
        {running ? "stop" : "start"}
        </button>
      
      <button disabled={running} onClick={clearButton}>clear</button>
      <button disabled={running} onClick={randomButton}>Random</button>
      <button disabled={running} onClick={() => step()}>step</button>
      <button onClick={() => setSpeed(formData.speed)}>Set Speed(milsec)</button>
      <input name="speed" value={formData.speed} onChange={e => handleChange(e)}/>
      </div>
      
      <Grid
        cols={cols}
        gridFull={gridFull}
        rows={rows}
        selectBox={selectBox}
        />
      <h2>Generations: {generations}</h2>
      <div className="center">
      <h3>Rules</h3>
      <p>1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.</p>
      <p>2. Any live cell with two or three live neighbours lives on to the next generation.</p>
      <p>3. Any live cell with more than three live neighbours dies, as if by overpopulation.</p>
      <p>4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</p>
      </div>
    </div>
  );
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr))
}

export default App;
