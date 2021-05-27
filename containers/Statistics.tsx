import styled from '@emotion/styled'
import { CSSProperties, ReactNode } from 'react'
import { useDependency } from 'react-use-dependency'
import { Column, Row } from '../components/Grid'
import { useHistoricalGuessStatistics } from '../hooks/useHistoricalGuessStatistics'
import { formatPokerHandName } from '../lib/formatPokerHandName'
import { HAND_NAMES, IStatisticsGateway, IUseHistoricalGuessStatisticsHookResult } from '../types'

export const Statistics = () => {
  const statistics = useDependency<IStatisticsGateway>('statisticsGateway')
  const results = useHistoricalGuessStatistics({ statistics })

  return (
    <StatisticsContainer>
      <Statistic
        title="Overall"
        result={results.overall}
        testid="statistics-overall"
        highlight
      />

      {HAND_NAMES.map(hand => (
        <Statistic
          title={formatPokerHandName(hand).name}
          result={results.hands[hand]}
          key={hand}
          testid={`statistics-hand-${hand}`}
        />
      ))}
    </StatisticsContainer>
  )
}

const Statistic = (props: {
  highlight?: boolean,
  testid: string,
  title: string,
  result: IUseHistoricalGuessStatisticsHookResult,
}) => {
  const percentageText = props.result.correctGuessFrequency !== null
    ? `${Math.round(props.result.correctGuessFrequency! * 100)}${props.highlight ? '%' : ''}`
    : ''

  const fractionText = props.result.correctGuessFrequency !== null
    ? `${props.result.correctGuesses}/${props.result.totalGuesses} correct`
    : 'Never seen'

  const color = props.result.correctGuessFrequency === null ? '' :
    props.result.correctGuessFrequency > 0.9 ? '#1dd1a1' :
    '#feca57'

  const background = props.result.correctGuessFrequency === null
    ? '#c8d6e5'
    : '#ff6b6b'

  return (
    <StatisticContainer highlight={props.highlight}>
      <Row>
        <Column>
          <RadialProgress
            progress={props.result.correctGuessFrequency || 0}
            size={props.highlight ? 120 : 60}
            strokeWidth={props.highlight ? 10 : 6}
            fontSize={props.highlight ? '1.3rem' : '0.8rem'}
            fontWeight={props.highlight ? 'bold' : 'normal'}
            color={color}
            backgroundColor={background}
          >
            <div data-testid={props.testid}>
              {percentageText}
            </div>
          </RadialProgress>

          <span>{props.title}</span>
          <span style={{ color: '#576574' }}>{fractionText}</span>
        </Column>
      </Row>
    </StatisticContainer>
  )
}

const RadialProgress = (props: {
  children: ReactNode,
  progress: number,
  size: number,
  strokeWidth: number,
  fontSize?: CSSProperties['fontSize'],
  fontWeight?: CSSProperties['fontWeight'],
  color: CSSProperties['color'],
  backgroundColor: CSSProperties['color'],
}) => {
  return (
    <div style={{
      position: 'relative',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      fontSize: props.fontSize,
      fontWeight: props.fontWeight,
      width: props.size,
      height: props.size,
    }}>
      <Ring
        strokeWidth={props.strokeWidth}
        width={props.size}
        height={props.size}
        progress={props.progress}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 20 }}
        color={props.color}
      />
      <Ring
        strokeWidth={props.strokeWidth}
        width={props.size}
        height={props.size}
        progress={1}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}
        color={props.backgroundColor}
      />
      {props.children}
    </div>
  )
}

const Ring = (props: {
  strokeWidth: number,
  height: number,
  width: number,
  progress: number,
  color: CSSProperties['color'],
  style?: CSSProperties,
}) => {
  const size = props.width / 2
  const radius = size - props.strokeWidth * 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - props.progress * circumference

  return (
    <svg
      height={props.height}
      width={props.width}
      style={props.style}
    >
      <circle
        strokeWidth={props.strokeWidth}
        r={radius}
        cx={size}
        cy={size}
        style={{
          stroke: props.color,
          fill: 'transparent',
          strokeDasharray: `${circumference} ${circumference}`,
          strokeDashoffset: offset,
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
        }}
      />
    </svg>
  )
}

const StatisticsContainer = styled.article`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 1rem;
  flex-wrap: wrap;
`

const StatisticContainer = styled.section<{ highlight?: boolean }>`
  background: #fff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;

  grid-column: span 2;

  span {
    display: block;
    font-size: 0.8rem;
    margin-top: 8px;
  }

  @media (min-width: 600px) {
    grid-column: span ${props => props.highlight ? 2 : 1};
  }
`
