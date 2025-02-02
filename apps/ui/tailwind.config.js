const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        lh: {
          red: '#fc452e',
          green: '#dafa20',
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          'base-100': '#ffffff',
          'base-200': '#d3d4d6',
          'base-300': '#b4b5b7',
          'base-content': '#000000',

          primary: '#fc452e',
          secondary: '#FFFFFF',
          accent: '#5B208A',
          neutral: '#F4F3F2',
          'primary-content': '#FFFFFF',
          'secondary-content': '#000000',
          'accent-content': '#FFFFFF',
          'neutral-content': '#e0e1e4',

          info: '#EEF3FF',
          success: '#1D7D3C',
          error: '#F35243',
          warning: '#A35B12',
          'info-content': '#416FA9',
          'success-content': '#FFFFFF',
          'error-content': '#ffffff',
          'warning-content': '#FFFFFF',
        },
      },
    ],
  },
};
