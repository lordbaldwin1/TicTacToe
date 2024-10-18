import React, { useState } from 'react';
import '../App.css';

function HandleInput({ input, setInput }) {
    return (
        <input type='text' value={input} onChange={(e) => setInput(e.target.value)}
            placeholder='Add a new item.'
        />
    )
}

function HandleSearch({ search, setSearch}) {
    return (
        <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search items'
        />
    )
}

// Handling states
function List () {
    const [todo, setTodo] = useState([]);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('');

    function handleAdd() {
        if (input.trim() === '') {
            return;
        } else {
            setTodo([...todo, input]);
            setInput('');
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        handleAdd();
    }

    function handleRemove(index) {
        setTodo(todo.filter((_, todoIndex) => todoIndex !== index));
    }

    const filteredTodo = search.trim()
        ? todo.filter((item) => item.toLowerCase().includes(search.toLowerCase()))
        : todo;

    return (
        <div className='list-input'>
            <h1>Hello!</h1>

            <form onSubmit={handleSubmit}>
                <HandleInput input={input} setInput={setInput} />
                <button onClick={handleAdd}>Add</button>
            </form>

            <HandleSearch search={search} setSearch={setSearch} />

            <ul>
                {filteredTodo.map((item, index) => (
                    <li key={index}>
                        {item} {/* Display the to-do item */}

                        <button onClick={() => handleRemove(index)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default List;