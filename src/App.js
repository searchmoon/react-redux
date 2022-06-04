import './App.css';
import { useState } from "react";
import { createStore } from 'redux';
import {Provider, useSelector, useDispatch, connect } from 'react-redux';

function reducer(currentState, action){
  if(currentState === undefined){
    return {
      number: 1,
    }
  }
  const newState = {...currentState};
  if(action.type === 'PLUS'){
    newState.number++;
  }
  return newState;
}
const store = createStore(reducer);
function App() {
  const [number, setNumber] = useState(1);
  return (
    <div id="container">
      <h1>Root</h1>
      <div id="grid">
        <Provider store={store}>
          <Left1 number={number} />
          <Right1 
            onIncrease={() => {
              setNumber(number + 1);
            }}
          />
        </Provider>
      </div>
    </div>
  );
}

function Left1(props) {
  return (
    <div>
      <h1>Left1: </h1>
      <Left2  />
    </div>
  )
}
function Left2(props) {
  return (
    <div>
      <h1>Left2:</h1>
      <Left3  />
    </div>
  )
}
function Left3(props) {
  const number = useSelector(state => state.number);
  return (
    <div>
      <h1>Left3: {number}</h1>
    </div>
  )
}
function Right1(props) {
  return (
    <div>
      <h1>Right1</h1>
      <Right2 
        onIncrease={() => {
          props.onIncrease();
        }}/>
    </div>
  )
}
function Right2(props) {
  return (
    <div>
      <h1>Right2</h1>
      <Right3 
        onIncrease={() => {
          props.onIncrease();
        }} />
    </div>
  )
}
function Right3(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Right3</h1>
      <input type="button" value="+" onClick={() => {
        dispatch({ type: 'PLUS' });
      }}></input>
    </div>
  )
}

export default App;

