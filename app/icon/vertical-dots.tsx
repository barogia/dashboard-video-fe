import React from "react";

function VerticalDots() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 30 30"
    >
      <circle
        cx="15"
        cy="20.5"
        r="1.5"
        fill="#323232"
        transform="rotate(-90 15 20.5)"
      ></circle>
      <circle
        cx="15"
        cy="15"
        r="1.5"
        fill="#323232"
        transform="rotate(-90 15 15)"
      ></circle>
      <circle
        cx="15"
        cy="9.5"
        r="1.5"
        fill="#323232"
        transform="rotate(-90 15 9.5)"
      ></circle>
    </svg>
  );
}

export default VerticalDots;
