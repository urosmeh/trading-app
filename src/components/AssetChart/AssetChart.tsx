import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  YAxis,
} from 'recharts';
import classes from './AssetChart.module.css';
import { SVGProps } from 'react';
import { ChartHistoryEventList } from '../../models/coincap.ts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { formatTime } from '../../utils/timeUtils.ts';
import { formatNumber } from '../../utils/stringUtils.ts';

type AssetChartProps = {
  data?: ChartHistoryEventList;
};

const AssetTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const val = Number(payload[0].value);

    return (
      <div className={classes.tooltip}>
        <p>{`${formatTime(payload[0].payload?.time)}`}</p>
        <p>{`${formatNumber(val)}`}</p>
      </div>
    );
  }
  return null;
};

const AssetChart = ({ data }: AssetChartProps) => {
  if (!data) return <p>No data to display</p>;

  return (
    <ResponsiveContainer className={classes.chart}>
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        {...{
          overflow: 'visible',
        }}
      >
        <defs>
          <linearGradient
            id="gradient"
            x1="343"
            y1="1"
            x2="343"
            y2="428"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#b3e6e6" />
            <stop offset="1" stopOpacity="0" stopColor="#b3e6e6" />
          </linearGradient>
        </defs>
        <YAxis
          tickLine={false}
          axisLine={false}
          orientation={'right'}
          dataKey={'priceUsd'}
          tick={CustomYTick}
          tickCount={10}
          domain={([min, max]) => {
            return [min, max];
          }}
        />
        <Area
          dataKey="priceUsd"
          strokeWidth={2}
          stroke="#287979"
          fill="url(#gradient)"
        />
        <Tooltip content={(props) => <AssetTooltip {...props} />} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const CustomYTick = (
  props: SVGProps<SVGSVGElement> & { payload: { value: number } }
) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <text x={0} y={0} dy={0} fill="#287979" fontFamily={'Open Sans'}>
        {formatNumber(payload.value)}
      </text>
    </g>
  );
};

export default AssetChart;
