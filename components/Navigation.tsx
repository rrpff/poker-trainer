import Link from 'next/link'
import styled from '@emotion/styled'
import React, { MouseEvent, useState } from 'react'
import { GrMenu, GrClose } from 'react-icons/gr'
import { PageContent } from './PageContent'

export interface INavigationProps {
  links: { name: string, href: string }[]
  selectedHref?: string
}

export const Navigation = (props: INavigationProps) => {
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
    <NavigationBar expanded={expanded}>
      {expanded ? (
        <MobileIconContainer>
          <a href="#!" onClick={handleClose}>
            <GrClose />
          </a>
        </MobileIconContainer>
      ) : (
        <MobileIconContainer>
          <a href="#!" onClick={handleOpen}>
            <GrMenu />
            <span>menu</span>
          </a>
        </MobileIconContainer>
      )}
      <NavigationItems expanded={expanded}>
        <PageContent style={{ textAlign: 'left' }}>
          {props.links.map((link, index) => (
            <NavigationItem key={index}>
              <Link href={link.href} passHref>
                <NavigationLink
                  selected={props.selectedHref === link.href}
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

const NavigationBar = styled.nav<{ expanded: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: left;

  background: #f0f1f3;

  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: ${props => props.expanded ? '100%' : '70px'};
  z-index: 90;

  @media (min-width: 600px) {
    align-items: center;
    flex-direction: row;

    height: 55px;
    padding-top: 20px;
  }
`

const MobileIconContainer = styled.div`
  display: block;
  font-size: 2rem;
  padding: 20px;

  a {
    display: flex;
    align-items: center;
  }

  span {
    font-size: 1rem;
    color: #8395a7;
    padding-left: 12px;
  }

  > a > svg path {
    stroke: #8395a7;
  }

  @media (min-width: 600px) {
    display: none;
  }
`

const NavigationItems = styled.ul<{ expanded: boolean }>`
  display: ${props => props.expanded ? 'block' : 'none'};

  margin: 0px;
  padding: 20px 0px 0px;
  list-style-type: none;
  width: 100%;

  @media (min-width: 600px) {
    display: inline-block;
    padding: 0px 0px 4px 0px;
  }
`

const NavigationItem = styled.li`
  display: block;

  @media (min-width: 600px) {
    display: inline-block;
    padding: 0 3px 0 0;
  }
`

const NavigationLink = styled.a<{ selected: boolean }>`
  text-transform: lowercase;
  color: ${props => props.selected ?  '#576574' : '#8395a7'};
  font-weight: ${props => props.selected ? 'bold' : 'auto'};

  display: block;
  padding: 6px 0;
  font-size: 2rem;

  @media (min-width: 600px) {
    padding-right: 8px;
    font-size: 1rem;
  }

  &:hover {
    color: #576574;
  }
`
