import * as React from "react";
import { render } from "react-dom";

import { Container, Provider } from "constate";

interface CounterContainerState {
  count: number;
}

interface CounterContainerActions {
  increment: () => void;
  decrement: () => void;
}

type CounterContainerRenderProps = CounterContainerState &
  CounterContainerActions;

const CounterContainer = (props: any) => {
  const initialState: CounterContainerState = {
    count: 0
  };

  const actions: CounterContainerActions = {
    increment: () => (state: CounterContainerState) => ({
      count: state.count + 1
    }),
    decrement: () => (state: CounterContainerState) => ({
      count: state.count - 1
    })
  };

  return (
    <Container
      initialState={initialState}
      actions={actions}
      context="one"
      {...props}
    />
  );
};

const App = () => {
  return (
    <Provider devtools={true}>
      <div className="App">
        <h1>Constate Typescript Example</h1>
        <hr />
        <h2>Default Counter Container</h2>
        <CounterContainer>
          {({ count, increment, decrement }: CounterContainerRenderProps) => {
            return (
              <div>
                <div>{count}</div>
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
              </div>
            );
          }}
        </CounterContainer>
        <hr />
        <h2>Shared Counter Container</h2>
        <CounterContainer context="nooop">
          {({ count, increment, decrement }: CounterContainerRenderProps) => {
            return (
              <div>
                <div>{count}</div>
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
              </div>
            );
          }}
        </CounterContainer>
        <br />
        and
        <br />
        <CounterContainer context="nooop">
          {({ count, increment, decrement }: CounterContainerRenderProps) => {
            return (
              <div>
                <div>{count}</div>
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
              </div>
            );
          }}
        </CounterContainer>
      </div>
    </Provider>
  );
};

render(<App />, document.getElementById("root"));
