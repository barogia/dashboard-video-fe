export default {
  space: {
    x1: '4px',
    x2: '8px',
    x3: '12px',
    x4: '16px',
    x5: '20px',
    x6: '24px',
    x7: '28px',
    x8: '32px',
    x9: '36px',
    x10: '40px',
    x11: '44px',
    x12: '48px',
    x14: '56px',
    x15: '60px',
    x16: '64px',
    x18: '72px',
    x20: '80px',
    x22: '88px',
    x25: '100px',
    x30: '120px',
    x31: '124px',
    x36: '144px',
    x40: '160px',
    x50: '200px',
    x60: '240px',
    sitePadding: 'var(--site-padding)',
  },
  sizes: {
    navBarWidth: '55px',
    maxBound: '1440px',
    headerHeight: 'var(--header-height)',
  },
  borderWidths: {},
  borderStyles: {},
};

export const globalSizes = {
  ':root': {
    '--site-padding': '$space$x15',
    '--header-height': '90px',
    '@1300AndBelow': {
      '--site-padding': '$space$x8',
    },
    '@tabletAndBelow': {
      // '--site-padding': '$space$x8',
      '--header-height': '80px',
    },
    '@mobile': {
      '--site-padding': '$space$x4',
      '--header-height': '56px',
    },
  },
};
