function HomeSVG({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.24 21.55H5.55998C4.47998 21.55 3.59998 20.67 3.59998 19.59V10.35C3.59998 9.76998 3.84998 9.22998 4.28998 8.85998L11.13 3.06998C11.86 2.44998 12.93 2.44998 13.66 3.06998L20.5 8.85998C20.94 9.22998 21.19 9.77998 21.19 10.35V19.59C21.2 20.67 20.32 21.55 19.24 21.55Z"
        stroke={'currentColor'}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.85 13.73H9.95996V21.55H14.85V13.73Z"
        stroke={'currentColor'}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default HomeSVG;
