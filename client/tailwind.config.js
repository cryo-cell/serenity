module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',  // ensures Tailwind scans all JSX files
  ],
  theme: {
    extend: {
      colors: {
        bb: '#91a9cb',   // example cold/icy blue
        bbm: '#9fb3d3', // accent green
        db: '#1c2e94',    // red/pink for highlights
        wb: '#f5f5f5',
        og: '#e24b17',
        blk: '#04090f'



      },
    },
  },
  plugins: [],
};
