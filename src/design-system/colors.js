// Vintage color palette
export const colors = {
  // Earth tones
  brown: {
    light: '#F5F5F5',
    medium: '#CCCCCC',
    dark: '#333333',
    darkest: '#000000'
  },
  cream: {
    lightest: '#FFFFFF',
    light: '#F5F5F5',
    medium: '#CCCCCC',
    dark: '#333333'
  },
  orange: {
    light: '#F5F5F5',
    medium: '#CCCCCC',
    dark: '#333333',
    burnt: '#000000'
  },
  blue: {
    faded: '#CCCCCC',
    muted: '#999999',
    vintage: '#333333',
    dark: '#000000'
  },
  yellow: {
    pale: '#F5F5F5',
    soft: '#CCCCCC',
    golden: '#333333',
    amber: '#000000'
  },
  // Utility colors
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    lightest: '#F5F5F5',
    light: '#CCCCCC',
    medium: '#999999',
    dark: '#333333',
    darkest: '#000000'
  },
  // Accent colors
  accent: {
    red: '#333333',
    green: '#333333',
    teal: '#333333'
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