import './App.css';
import { Textfit } from "react-textfit";
import { BsBackspaceFill } from "react-icons/bs";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [displayNum, setDisplayNum] = useState("0");

  const computeAritmetic = () => {
    var stringMath = require('string-math');
    // replacing all "×" and "÷" with "*" and "/"
    var num;
    num = displayNum.replace("×", "*");
    num = num.replace("÷", "/");
    
    try {
      let result = stringMath(num);
      if (result === Infinity || result === -Infinity) {
        return "ERR";
      } else {
        // convert to string
        result = result.toString();
        return result;
      }
    } catch (error) {
      return "ERR";
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    if(e.target.innerText === "=") {
      if (displayNum === "ERR") {
        return;
      }
      const result = computeAritmetic();
      setDisplayNum(result);
      return;
    }
    if (displayNum === "ERR") {
      setDisplayNum("0");
    }
    // checking length of displayNum
    if (displayNum.length > 17) {
      return;
    }
    // operations
    if (e.target.innerText === "+" || e.target.innerText === "-" || e.target.innerText === "×" || e.target.innerText === "÷") {
      if (e.target.innerText === '-') {
        if (displayNum.charAt(displayNum.length - 1) === "+") {
          setDisplayNum(displayNum.slice(0, -1) + e.target.innerText);
        } else if (displayNum.charAt(displayNum.length - 1) === "."
        || displayNum.charAt(displayNum.length - 1) === "-") {
          return;
        } else {
          if (displayNum.length > 16) {
            return;
          }
          setDisplayNum(displayNum + e.target.innerText);
        }
      } else {
        if (displayNum.charAt(displayNum.length - 1) === "+"
        || displayNum.charAt(displayNum.length - 1) === "×" 
        || displayNum.charAt(displayNum.length - 1) === "÷") {
          setDisplayNum(displayNum.slice(0, -1) + e.target.innerText);
        } else if(displayNum.charAt(displayNum.length - 1) === "-") {
          if (displayNum.charAt(displayNum.length - 2) === "×"
          || displayNum.charAt(displayNum.length - 2) === "÷") {
            return;
          } else {
            setDisplayNum(displayNum.slice(0, -1) + e.target.innerText);
          }
        } else if(displayNum.charAt(displayNum.length - 1) === ".") {
          return;
        } else {
          if (displayNum.length > 16) {
            return;
          }
          setDisplayNum(displayNum + e.target.innerText);
        }
      }
    } 
    // decimal point
    else if(e.target.innerText === ".") {
      if (displayNum.charAt(displayNum.length - 1) === "+" 
      || displayNum.charAt(displayNum.length - 1) === "-"
      || displayNum.charAt(displayNum.length - 1) === "×"
      || displayNum.charAt(displayNum.length - 1) === "÷"
      || displayNum.charAt(displayNum.length - 1) === "."
      || displayNum.length > 16) {
        return;
      }
      let i = displayNum.length - 1;
      while (i > 0) {
        if (displayNum.charAt(i) === "+" 
        || displayNum.charAt(i) === "-" 
        || displayNum.charAt(i) === "×" 
        || displayNum.charAt(i) === "÷") {
          break;
        }
        if (displayNum.charAt(i) === "." ) {
          return;
        }
        i--;
      }
      setDisplayNum(displayNum + e.target.innerText);
    } 
    // equals
    else if(e.target.innerText === "=") {
      const result = computeAritmetic();
      setDisplayNum(result);
    }
    // digits
    else {
      if (displayNum === "0")
        setDisplayNum(e.target.innerText);
      else 
        setDisplayNum(displayNum + e.target.innerText);
    }
  }

  const handleBackspace = (e) => {
    e.preventDefault();
    if (displayNum === "ERR") {
      setDisplayNum("0");
      return;
    }
    if (displayNum.length > 1) {
      setDisplayNum(displayNum.slice(0, -1));
    } else {
      setDisplayNum("0");
    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="screen">
          <div className="output">
            <Textfit mode="single" max={60}>{displayNum}</Textfit>
          </div>
        </div>
        <div className="buttons">
          <div className="numbers">
            <div>
              <button onClick={(e) => handleClick(e)}>7</button>
              <button onClick={(e) => handleClick(e)}>8</button>
              <button onClick={(e) => handleClick(e)}>9</button>
            </div>
            <div>
              <button onClick={(e) => handleClick(e)}>4</button>
              <button onClick={(e) => handleClick(e)}>5</button>
              <button onClick={(e) => handleClick(e)}>6</button>
            </div>
            <div>
              <button onClick={(e) => handleClick(e)}>1</button>
              <button onClick={(e) => handleClick(e)}>2</button>
              <button onClick={(e) => handleClick(e)}>3</button>
            </div>
            <div>
              <button onClick={(e) => handleClick(e)}>0</button>
              <button onClick={(e) => handleClick(e)}>.</button>
              <button onClick={(e) => handleClick(e)}>=</button>
            </div>
          </div>
          <div className="operations">
            <div>
              <button onClick={(e) => handleBackspace(e)} style={{paddingTop: "10px"}}><BsBackspaceFill /></button>
            </div>
            <div>
              <button onClick={(e) => handleClick(e)}>+</button>
            </div>
            <div>
              <button onClick={(e) => handleClick(e)}>-</button>
            </div>
            <div>
              <button onClick={(e) => handleClick(e)}>×</button>
            </div>
            <div>
              <button onClick={(e) => handleClick(e)}>÷</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
