import React, { useState } from 'react'
import { useEffect } from 'react'

const Testing = () => {
    const [noDepArray, setNoDepArray] = useState(0);
    const [emptyDepArray, setEmptyDepArray] = useState(0);
    const [argInDepArray, setArgInDepArray] = useState(0);

    // With no dependency array, runs after every effectTesting component render.
    // BECAUSE IT UPDATES STATE, INFINITE LOOP!
    // useEffect(() => {
    //     setNoDepArray(noDepArray + 1);
    //     console.log("Runs after every render");
    // });

    // With empty dependency array, runs only once on mount. 
    // Unless the component unmounts and remounts, it would run again on remount.
    useEffect(() => {
        setEmptyDepArray(emptyDepArray + 1);
        console.log("Runs only once on mount");
    }, []);

    // With argument in dependency array, it will run everytime
    // one of the arguments is updated.
    const [count, setCount] = useState(0);
    useEffect(() => {
        setArgInDepArray(argInDepArray + 1);
        console.log("Runs when 'count' changes:", {count});
    }, [count]);

    const increment = () => {
            setCount((countValue) => countValue + 1);
    };

    return (
        <div className='use-effect'>
            <h1>No Dependency Array useEffect</h1>
            <h1>{noDepArray}</h1>
            <h1>Empty Dependency Array useEffect</h1>
            <h1>{emptyDepArray}</h1>
            <h1>Argument in Dependency Array useEffect</h1>
            <h1>{argInDepArray}</h1>
            <h1>Count</h1>
            <h1>{count}</h1>
            <button onClick={increment}>+</button>
        </div>
    )


}

export default Testing;