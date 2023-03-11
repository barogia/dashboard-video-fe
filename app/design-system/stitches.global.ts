export const reset = {
  [`*, *::before, *::after`]: {
    boxSizing: 'border-box',
    // background: 'rgba(0, 100, 0, 0.05) !important', // for debugging
    margin: 0,
    padding: 0,
    lineHeight: 1.5,
    '@media (prefers-reduced-motion: reduce)': {
      'animation-duration': '0.01ms !important',
      'animation-iteration-count': '1 !important',
      'transition-duration': '0.01ms !important',
      'scroll-behavior': 'auto !important',
    },
  },

  body: {
    margin: 0,
    lineHeight: 1.5,
    '-webkit-font-smoothing': 'antialiased',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },

  [`html, body`]: {
    // height: '100%',
    // 'scroll-behavior': 'smooth',
  },

  [`img, picture, video, canvas, svg`]: {
    display: 'block',
    maxWidth: '100%',
  },

  [`input, button, textarea, select`]: {
    font: 'inherit',
  },

  [`p, h1, h2, h3, h4, h5, h6`]: {
    overflowWrap: 'break-word',
  },

  ul: {
    listStyleType: 'none',
  },

  [`#root, #__next`]: {
    isolation: 'isolate',
  },
  a: { textDecoration: 'none' },
  'a, button': {
    cursor: 'pointer',
  },
};

export const utilityClass = {
  '.screen-reader-only': {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap' /* added line */,
    border: '0',
  },
};

export const commonStyle = {
  'input , textarea , select': {
    '&:focus-visible': {
      outline: '$primaryPurple400 solid 1px',
      'outline-offset': '-1px',
      'box-shadow': '$focusedInput',
    },
    //For old versions of Safari
    '@supports not (:focus-visible)': {
      '&:focus': {
        outline: '$primaryPurple400 solid 1px',
        'outline-offset': '-1px',
        'box-shadow': '$focusedInput',
      },
    },
  },
  'a, button, svg, div': {
    '&:focus': {
      outline: 'none',
    },
    outline: 'none',
    boxShadow: 'none',
  },

  [`input, label, textarea, select`]: {
    color: '$input',
  },
};
