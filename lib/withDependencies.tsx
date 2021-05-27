import React from 'react'
import { DependencyProvider } from 'react-use-dependency'
import { IAppDependencies } from '../types'

export const withDependencies = (Child: React.FC, dependencies: Partial<IAppDependencies>) => {
  const DependenciesWrapper: React.FC = props => (
    <DependencyProvider value={dependencies}>
      <Child {...props} />
    </DependencyProvider>
  )

  return DependenciesWrapper
}
