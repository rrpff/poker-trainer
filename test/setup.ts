import React from 'react'
import { Globals as SpringGlobals } from '@react-spring/web'
import '@testing-library/jest-dom'

// Support not manually `import`ing React in component tests and components
global.React = React

// Skip spring animations in tests because they are slow
beforeEach(() => {
  SpringGlobals.assign({ skipAnimation: true })
})

afterEach(() => {
  SpringGlobals.assign({ skipAnimation: false })
})
