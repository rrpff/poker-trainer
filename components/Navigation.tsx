import Link from 'next/link'
import styled from '@emotion/styled'
import React, { CSSProperties, MouseEvent, useState } from 'react'
import { GrMenu, GrClose } from 'react-icons/gr'
import { GiPokerHand } from 'react-icons/gi'
import { PageContent } from './PageContent'
import breakpoints from '../styles/breakpoints'

export interface INavigationProps {
  links: { name: string, href: string }[]
  selectedHref?: string
  background?: CSSProperties['color']
  color?: 'light' | 'dark'
}

export const Navigation = ({
  links,
  selectedHref,
  background = '#f0f1f3',
  color = 'dark',
}: INavigationProps) => {
  const [expanded, setExpanded] = useState(false)

  const handleOpen = (e: MouseEvent) => {
    e.preventDefault()

    setExpanded(true)
  }

  const handleClose = (e: MouseEvent) => {
    e.preventDefault()

    setExpanded(false)
  }

  return (
    <NavigationBar background={background} color={color} expanded={expanded}>
      {expanded ? (
        <MobileIconContainer color={color}>
          <a href="#!" onClick={handleClose}>
            <GrClose />
          </a>
        </MobileIconContainer>
      ) : (
        <MobileIconContainer color={color}>
          <a href="#!" onClick={handleOpen}>
            <GrMenu />
            <span>menu</span>
          </a>
        </MobileIconContainer>
      )}
      <NavigationItems expanded={expanded}>
        <PageContent style={{ textAlign: 'left' }}>
          <Link href="/" passHref>
            <LogoLink color={color}>
              <GiPokerHand />
            </LogoLink>
          </Link>
          {links.map((link, index) => (
            <NavigationItem key={index}>
              <Link href={link.href} passHref>
                <NavigationLink
                  selected={selectedHref === link.href}
                  color={color}
                  onClick={() => {
                    setExpanded(false)
                  }}
                >
                  {link.name}
                </NavigationLink>
              </Link>
            </NavigationItem>
          ))}
        </PageContent>
      </NavigationItems>
    </NavigationBar>
  )
}

const NavigationBar = styled.nav<{ background: CSSProperties['color'], expanded: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: left;

  background: ${props => props.background};

  position: ${props => props.expanded ? 'fixed' : 'absolute'};
  top: 0px;
  left: 0px;
  width: 100%;
  height: ${props => props.expanded ? '100%' : '70px'};
  z-index: 90;

  ${breakpoints.desktop} {
    position: absolute;
    align-items: center;
    flex-direction: row;

    height: 55px;
    padding: 30px 0 20px;
  }
`

const MobileIconContainer = styled.div<{ color: 'light' | 'dark' }>`
  display: block;
  font-size: 2rem;
  padding: 20px;

  a {
    display: flex;
    align-items: center;
  }

  span {
    font-size: 1rem;
    color: ${props => props.color === 'light' ? '#fff' : '#8395a7'};
    padding-left: 12px;
    opacity: 0.8;
  }

  > a > svg path {
    stroke: ${props => props.color === 'light' ? '#fff' : '#8395a7'};
  }

  ${breakpoints.desktop} {
    display: none;
  }
`

const LogoLink = styled.a<{ color: 'light' | 'dark' }>`
  display: none;

  ${breakpoints.desktop} {
    display: inline-block;
    position: relative;
    top: 5px;

    svg {
      color: ${props => props.color === 'light' ? '#fff' : '#8395a7'};
      font-size: 1.4rem;
      position: relative;
    }
  }
`

const NavigationItems = styled.ul<{ expanded: boolean }>`
  display: ${props => props.expanded ? 'block' : 'none'};

  margin: 0px;
  padding: 20px 0px 0px;
  list-style-type: none;
  width: 100%;

  ${breakpoints.desktop} {
    display: inline-block;
    padding: 0px 0px 4px 0px;
  }
`

const NavigationItem = styled.li`
  display: block;

  ${breakpoints.desktop} {
    display: inline-block;
    padding: 0 3px 0 0;

    &:first-of-type a {
      padding-left: 5px;
    }
  }
`

const NavigationLink = styled.a<{ color: 'light' | 'dark', selected: boolean }>`
  text-transform: lowercase;
  color: ${props => props.color === 'light' ? '#fff' : '#576574'};
  opacity: ${props => props.selected ? 1 : 0.8};
  font-weight: ${props => props.selected ? 'bold' : 'auto'};
  transition: opacity 0.2s;

  display: block;
  padding: 6px 0;
  font-size: 2rem;

  ${breakpoints.desktop} {
    padding-right: 8px;
    font-size: 1rem;
  }

  &:hover {
    color: ${props => props.color === 'light' ? '#fff' : '#576574'};
    opacity: 1;
  }
`
