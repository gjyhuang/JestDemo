import React from 'react'
import { add, subtract } from './calculations';

const Calculator = () => {
  const [num1, setNum1] = React.useState(0);
  const [num2, setNum2] = React.useState(0);
  const [result, setResult] = React.useState(0);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setResult(add(num1, num2));
  }

  return (
    <div id="calculator">
      <div className="header">Calculator</div>
      <div className="calculator-body">
        <form onSubmit={(evt) => handleSubmit(evt)}>
          <label>
            Add:
            <input
              type="text"
              id="num1"
              defaultValue={num1}
              onChange={e => setNum1(e.target.value)}
            />
            +
            <input
              type="text"
              id="num2"
              defaultValue={num2}
              onChange={e => setNum2(e.target.value)}
            />
          </label>
          <input type="Submit" value="=" readOnly={true} />
        </form>
        <div className="result">{result}</div>
      </div>
    </div>
  )
}

export default Calculator;
