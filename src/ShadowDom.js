import React, { Component, Fragment, Children } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import PropTypes from 'prop-types';

export class ShadowDom extends Component {
  constructor(props){
    super(props)
    this.getTargetRef = this.getTargetRef.bind(this);
  }
  componentDidMount() {
    const { children, delegatesFocus } = this.props;
    this.shadowRoot = this.target.attachShadow({ mode: 'open', delegatesFocus });
    render(<Fragment>{ children }</Fragment>, this.shadowRoot)
  }
  componentDidUpdate() {
    const { children } = this.props;
    render(<Fragment>{ children }</Fragment>, this.shadowRoot);
  }
  componentWillUnmount() {
    unmountComponentAtNode(this.shadowRoot);
  }
  getTargetRef(c) {
    const { nodeRef } = this.props;
    this.target = c;
    nodeRef && nodeRef(c);
  }
  render() {
    // Don't pass children and delegatesFocus with spread.
    const { tag, delegatesFocus, children, lightDom, ...rest } = this.props;
    const ShadowDomTag = tag;
    return (
      <ShadowDomTag ref={ this.getTargetRef } { ... rest }>
        { lightDom() }
      </ShadowDomTag>
    );
  }
}
ShadowDom.propTypes = {
  tag: PropTypes.string,
  delegatesFocus: PropTypes.bool,
  nodeRef: PropTypes.func,
  lightDom: PropTypes.func,
}
ShadowDom.defaultProps = {
  tag: 'span',
  delegatesFocus: false,
  lightDom: () => null
}
