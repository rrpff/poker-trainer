/// <reference types="next" />
/// <reference types="next/types/global" />

// See: https://github.com/pmndrs/react-spring/issues/613
// Frustrating to remove types entirely for react-spring
// but it's super slow in VS code.
declare module '@react-spring/web';

// Unfortunately no types available for this.
declare module 'pokersolver';
