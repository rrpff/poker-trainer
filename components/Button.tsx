import styled from '@emotion/styled'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export type IButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button = styled.button`
  padding: 10px;
  background: #1dd1a1;
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
  border: 3px solid #1dd1a1;
  border-radius: 5px;

  &:focus {
    border: 3px solid #feca57;
    outline: none;
  }
`
