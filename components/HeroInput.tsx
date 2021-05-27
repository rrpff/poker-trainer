import styled from '@emotion/styled'
import { InputHTMLAttributes, DetailedHTMLProps } from 'react'

export type IHeroInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const HeroInput = styled.input`
  font-size: 2rem;
  font-weight: bold;
  border: none;
  border-bottom: 2px solid #c8d6e5;
  padding: 10px 0px;
  text-align: center;
  transition: border-bottom 0.2s;

  width: 66%;

  &:focus {
    border-bottom: 2px solid #000;
    outline: none;
  }

  &:disabled {
    background: transparent;
  }

  @media (max-width: 600px) {
    display: none;
  }
`
