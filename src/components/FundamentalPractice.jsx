import '../App.css';

import {useState, useRef} from 'react'

const Fundamental = () => {
    const [count, setCount] = useState(0);
    const inputRef = useRef(null);
    const [todoList, setTodoList] = useState([]);
    const todoInputRef = useRef('');

    const addTodo = () => {
        if(todoInputRef.current.value !== '') {
            setTodoList([...todoList, todoInputRef.current.value]);
        } 
    }

    const removeTodo = () => {
        
    }

    const increment = () => setCount((countValue) => countValue + 1);
    const decrement = () => setCount((countValue) => countValue - 1);
    const setValue = () => {
        const value = parseInt(inputRef.current.value, 10);
        if (!isNaN(value)) {
            setCount(value);
        }
    };
    const reset = () => setCount(0);

    return (
        <div>
            <div>
                <h1>{count}</h1>
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
                <button onClick={reset}>Reset</button>
                <input ref={inputRef} name="number" type="text" placeholder="0" />
                <button onClick={setValue}>Set Value</button>
            </div>
            <div>
                <input ref={todoInputRef} name="todo" type="text" placeholder="Add item" />
                
                <button onClick={addTodo}>Add Todo List Item</button>
                <ul>
                    {todoList.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Fundamental;