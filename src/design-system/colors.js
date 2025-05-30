// Vintage color palette
export const colors = {
  // Earth tones
  brown: {
    light: '#D4C1A9',
    medium: '#B69F7D',
    dark: '#8C7A5B',
    darkest: '#5F5242'
  },
  cream: {
    lightest: '#FFFBF2',
    light: '#F7F2E4',
    medium: '#EFE8D6',
    dark: '#E6DCBF'
  },
  orange: {
    light: '#F2C094',
    medium: '#E8A76F',
    dark: '#D48C4A',
    burnt: '#BF7E45'
  },
  blue: {
    faded: '#A5B9C9',
    muted: '#7D96A9',
    vintage: '#5D7A8C',
    dark: '#3F5766'
  },
  yellow: {
    pale: '#F2E6B6',
    soft: '#E8D68C',
    golden: '#D4BF6A',
    amber: '#BFA94D'
  },
  // Utility colors
  black: '#2A2A2A',
  white: '#FFFEF7',
  gray: {
    lightest: '#F2F0E6',
    light: '#D9D6C9',
    medium: '#BFBCB2',
    dark: '#8C8A83',
    darkest: '#5F5E59'
  },
  // Accent colors
  accent: {
    red: '#C25B4F',
    green: '#5B8C70',
    teal: '#5B8C8C'
  }
};

// Function to generate CSS variables
export const generateColorVariables = () => {
  let cssVars = ':root {\n';
  
  // Process nested color objects
  const processColorObject = (obj, prefix = '') => {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        cssVars += `  --color-${prefix}${key}: ${value};\n`;
      } else {
        processColorObject(value, `${prefix}${key}-`);
      }
    }
  };
  
  processColorObject(colors);
  cssVars += '}\n';
  
  return cssVars;
};

export default colors;