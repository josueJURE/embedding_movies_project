import React, { useState } from 'react';
import './App.css';
import {Button} from "@/components/ui/button"
import { Input } from "@/components/ui/input"


function App() {
    const [inputValue, setInputValue] = useState("");
    const [text, setText] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }

    async function handleClick() {
        setText(inputValue);

        // Send text to the backend using fetch
        try {
            const response = await fetch('http://localhost:3000/send-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: inputValue }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error sending text to backend:', error);
        }
    }

    return (
        <>
    
              <div className="flex w-full max-w-sm items-center space-x-2">
            <Input onChange={handleChange} />
            <Button onClick={handleClick} variant={"default"} size={"sm"}>Click me</Button>
            <div>{text}</div>
            </div>
           
        </>
    );
}

export default App;
