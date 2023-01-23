import React from 'react'
import { Header } from './Headers/Header'
import { HeaderSimple } from './Headers/HeaderSimple'

type HeaderFigureType = 'normal' | 'simple'

type PropsType = {
  children: React.ReactNode
  headerFigure?: HeaderFigureType
}

export const Layout = (props: PropsType) => {
  const { children, headerFigure } = props

  return (
    <>
      {!headerFigure || headerFigure === 'normal' ? (
        <Header />
      ) : headerFigure === 'simple' ? (
        <HeaderSimple />
      ) : (
        <Header />
      )}
      <main>{children}</main>
    </>
  )
}
