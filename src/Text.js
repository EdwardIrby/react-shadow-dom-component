import React from 'react';
import PropTypes from 'prop-types';
import { ShadowDom } from './ShadowDom.js'
import { css } from './css.js'
export const Text = (props) => {
    const { children, className } = props;
    const styles = css`
      .text {
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: red;
        font-family: sans-serif;
        font-size: 16px;
        line-height: 20px;
        font-weight: 400;
      }
    `
    return (
      <ShadowDom className={ className  }>
        <style type='text/css'>{ styles }</style>
        <span className='text'>{ children }</span>
      </ShadowDom>
    )
}
Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}
