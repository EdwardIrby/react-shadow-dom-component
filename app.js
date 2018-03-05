import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { ShadowDom } from './src/ShadowDom.js';
import { Text } from './src/Text.js';
import { css } from './src/css.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.value,
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { value } = e.target;
    this.setState({ value })
  }
  render() {
    const styles = css`
          :host {
            display: flex;
            flex-direction: column;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-family: sans-serif;
            font-size: 16px;
            line-height: 20px;
            font-weight: 400;
          }
          .text {
            color: green;
          }
          input, input::placeholder {
            color: blue;
          }
          ::slotted(.text) {
            color: purple;
          }
        `
    return (
      <ShadowDom lightDom={
        () => (
          <Fragment>
            <span>I'm some light dom </span>
            <span slot='span' className='text'>I'm some slotted purple light dom </span>
          </Fragment>
        )
      }>
        <style type='text/css'>{ styles }</style>
        <span className='text'>I should be green</span>
        <Text className='text'>I should be red</Text>
        <slot name='span'></slot>
        <input onChange={ this.handleChange } value={ this.state.value } placeholder="I should be blue" />
      </ShadowDom>
    );
  }
}
App.defaultProps = {
  value: '',
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
