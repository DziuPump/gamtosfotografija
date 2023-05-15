import React from "react";

const Button = (props) => {
  return (
    <button onClick={props.onClick} style={{ backgroundColor: props.color }}>
      {props.text}
    </button>
  );
};

export default Button;
