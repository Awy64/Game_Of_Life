import React, {useState} from 'react';
import './App.css';
import Grid from "./components/Grid"

function App() {
  const [generations, setGenerations] = useState(0)
  
  const speed = 100
  const rows = 30
  const cols = 50
const [gridFull, setGridFull] = useState(Array(rows).fill().map(() => cols).fill(false))

  return (
    <div className="App">
      <h1>The Game Of Life</h1>
      <Grid
        cols={cols}
        gridFull={gridFull}
        rows={rows}
        />
      <h2>Generations: {generations}</h2>
    </div>
  );
}

export default App;
