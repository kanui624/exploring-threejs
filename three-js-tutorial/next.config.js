const withTM = require('next-transpile-modules')([
  'drei',
  'three',
  'react-spring',
  'postprocessing',
  '@react-three/drei',
]);

module.exports = withTM();
