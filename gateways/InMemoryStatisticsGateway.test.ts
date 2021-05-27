import { InMemoryStatisticsGateway } from './InMemoryStatisticsGateway'
import { runStatisticsGatewayTests } from './runStatisticsGatewayTests'

runStatisticsGatewayTests(() => new InMemoryStatisticsGateway())
