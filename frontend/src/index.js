import React from 'react'
//import { useState } from 'react';
import ReactDOM from 'react-dom/client'
import Categories  from './Categories'
const root = ReactDOM.createRoot(document.getElementById('root'))


function App() {
    return (
        <div>
            <h1>Expence App</h1>
            <Categories />
        </div>
    )
}


/*function App() {
    const [count, setCount] = useState(0);

    const handleUp = () => {
        setCount(count+1);
    }
    const handleDown = () => {
        setCount(count-1);
    }
    const  reset = () => {
        setCount(0);
    }


return(
    <div>
        <h2>Counter-{count}</h2>
        <button onClick={handleUp}>+1</button>
        <button onClick={handleDown} disabled= {count==0}>-1</button>
        <button onClick={reset}>Reset</button>

        <p>The count value is { count}  </p>
    </div>
)
} */

root.render(<App />)