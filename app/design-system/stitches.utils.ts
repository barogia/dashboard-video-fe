import { keyframes, PropertyValue } from '@stitches/react';

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(5px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

export default {
  mx: (value: PropertyValue<'margin'>) => ({
    marginLeft: value,
    marginRight: value,
  }),
  my: (value: PropertyValue<'margin'>) => ({
    marginTop: value,
    marginBottom: value,
  }),
  px: (value: PropertyValue<'padding'>) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  py: (value: PropertyValue<'padding'>) => ({
    paddingTop: value,
    paddingBottom: value,
  }),
  by: (value: PropertyValue<'border'>) => ({
    borderTop: value,
    borderBottom: value,
  }),
  lineLimit: (value: number) => ({
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    overflowWrap: 'break-word',
    '-webkit-line-clamp': value,
  }),
  size: (value: string & PropertyValue<'width'>) => {
    const [w, h] = value.split(' ');
    return { width: w, height: h || w };
  },
  flexJustifyAndAlign: (position: string & PropertyValue<'justifyContent'>) => {
    const [justifyContent, alignItems] = position.split(' ');
    return {
      display: 'flex',
      justifyContent,
      alignItems: alignItems || justifyContent,
    };
  },
  solidBorder: (color: PropertyValue<'color'>) => ({
    border: `1px solid ${color}`,
  }),
  clickableArea: (size: PropertyValue<'top'>) => ({
    position: 'relative',
    '&::after': {
      content: '',
      position: 'absolute',
      top: `-${size}`,
      left: `-${size}`,
      right: `-${size}`,
      bottom: `-${size}`,
      cursor: 'pointer',
    },
  }),
  slideUpAnimationFor: (selector: string) => ({
    [selector]: {
      '@media (prefers-reduced-motion: no-preference)': {
        animationName: slideUpAndFade,
        animationDuration: '300ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity',
      },
    },
  }),
  flexColGap: (gap: PropertyValue<'gap'>) => ({
    '& > *:not(:last-child)': {
      marginRight: gap,
    },
  }),
  flexRowGap: (gap: PropertyValue<'gap'>) => ({
    '& > *:not(:last-child)': {
      marginBottom: gap,
    },
  }),
};
