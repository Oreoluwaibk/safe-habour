import React from 'react';

interface props {
  title: string;
  size: number | string;
}
const ColoredText = ({title, size}: props) => {
  const style = {
    fontSize: size
  }
  return (
    <span className="sawtooth-irregular-container">
      <span className="sawtooth-irregular-bg">
        <span className="sawtooth-text" style={style}>
          {title}
        </span>
      </span>
    </span>
  );
};

export default ColoredText;
