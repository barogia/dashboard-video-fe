import type { CSS } from '@stitches/react';

const largeButton: CSS = {
  padding: '12px 16px',
  mediumBody: '$16px',
  lineHeight: '$24px',
};
const mediumButton: CSS = {
  padding: '9.5px 16px',
  mediumBody: '$14px',
  lineHeight: '$21px',
};
const smallButton: CSS = {
  padding: '1.5px 12px',
  mediumBody: '$14px',
  lineHeight: '$21px',
};

const primaryButton: CSS = {
  mediumBody: '$16px',
  color: '$white',
  py: '$x3',
  flexJustifyAndAlign: 'center',
  background: '$primaryPurple500',
  borderRadius: 1,
  border: 'none',
  boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.05)',
  transition: '0.15s',
  '&:hover, &:focus-visible': {
    background: '$primaryPurple300',
  },
  '&:disabled': {
    background: '$neutral100',
    color: '$neutral600',
    cursor: 'not-allowed',
    border: '1px solid $neutral500',
  },
};
const smallPrimaryButton: CSS = {
  ...primaryButton,
  ...smallButton,
};
const mediumPrimaryButton: CSS = {
  ...primaryButton,
  ...mediumButton,
};
const largePrimaryButton: CSS = {
  ...primaryButton,
  ...largeButton,
};

const primaryButtonGreen: CSS = {
  ...primaryButton,
  background: '$primaryGreen500',
  '&:hover, &:focus-visible': {
    path: { fill: '$primaryGreen300' },
    background: '$primaryGreen300',
  },
};
const smallPrimaryButtonGreen: CSS = {
  ...primaryButtonGreen,
  ...smallButton,
};
const mediumPrimaryButtonGreen: CSS = {
  ...primaryButtonGreen,
  ...mediumButton,
};
const largePrimaryButtonGreen: CSS = {
  ...primaryButtonGreen,
  ...largeButton,
};

const secondaryButton: CSS = {
  mediumBody: '$14px',
  flexJustifyAndAlign: 'center',
  solidBorder: '$neutral500',
  background: '$background',
  boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.05)',
  borderRadius: '1px',
  transition: '0.15s',
  '&:hover, &:focus-visible': {
    borderColor: '$primaryPurple300',
    color: '$primaryPurple300',
    'svg path': { fill: '$primaryPurple300' },
  },
  '&:disabled': {
    background: '$neutral100',
    color: '$neutral600',
    cursor: 'not-allowed',
    border: '1px solid $neutral500',
  },
};
const smallSecondaryButton: CSS = {
  ...secondaryButton,
  ...smallButton,
};
const mediumSecondaryButton: CSS = {
  ...secondaryButton,
  ...mediumButton,
};
const largeSecondaryButton: CSS = {
  ...secondaryButton,
  ...largeButton,
};

const ghostButton: CSS = {
  mediumBody: '$14px',
  lineHeight: 1.5,
  color: '$primaryPurple500',
  transition: '0.15s',
  '&:hover, &:focus-visible': {
    color: '$primaryPurple300',
    'svg path': { fill: '$primaryPurple300' },
  },
  '&:active': {
    color: '$primaryPurple700',
  },
};

const smallGhostButton: CSS = {
  ...ghostButton,
  ...smallButton,
};
const mediumGhostButton: CSS = {
  ...ghostButton,
  ...mediumButton,
};
const largeGhostButton: CSS = {
  ...ghostButton,
  ...largeButton,
};

const ghostButtonGreen: CSS = {
  ...ghostButton,
  color: '$primaryGreen500',
  '&:hover, &:focus-visible': {
    color: '$primaryGreen300',
  },
  '&:active': {
    color: '$primaryGreen700',
  },
};

type ButtonStyle =
  | 'primary'
  | 'small-primary'
  | 'medium-primary'
  | 'large-primary'
  | 'primary-green'
  | 'small-primary-green'
  | 'medium-primary-green'
  | 'large-primary-green'
  | 'secondary'
  | 'small-secondary'
  | 'medium-secondary'
  | 'large-secondary'
  | 'ghost'
  | 'small-ghost'
  | 'medium-ghost'
  | 'large-ghost'
  | 'ghost-green';

export const buttonUtils = {
  buttonStyle: (type: ButtonStyle): CSS =>
    type === 'primary'
      ? primaryButton
      : type === 'small-primary'
      ? smallPrimaryButton
      : type === 'medium-primary'
      ? mediumPrimaryButton
      : type === 'large-primary'
      ? largePrimaryButton
      : type === 'primary-green'
      ? primaryButtonGreen
      : type === 'small-primary-green'
      ? smallPrimaryButtonGreen
      : type === 'medium-primary-green'
      ? mediumPrimaryButtonGreen
      : type === 'large-primary-green'
      ? largePrimaryButtonGreen
      : type === 'secondary'
      ? secondaryButton
      : type === 'small-secondary'
      ? smallSecondaryButton
      : type === 'medium-secondary'
      ? mediumSecondaryButton
      : type === 'large-secondary'
      ? largeSecondaryButton
      : type === 'ghost'
      ? ghostButton
      : type === 'small-ghost'
      ? smallGhostButton
      : type === 'medium-ghost'
      ? mediumGhostButton
      : type === 'large-ghost'
      ? largeGhostButton
      : type === 'ghost-green'
      ? ghostButtonGreen
      : {},
};
