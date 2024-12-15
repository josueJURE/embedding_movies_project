import React from 'react'

function Input() {

    function userInput(e: any) {
        return e.target.value
     
    }


  return (
    <input onChange={userInput}/>
  )
}

export default Input