import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import classes from './AssetChart.module.css';
import { SVGProps } from 'react';
import { ChartHistoryEventList } from '../../models/coincap.ts';

type AssetChartProps = {
  data?: ChartHistoryEventList;
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
          // overflow={'visible'}
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
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const CustomYTick = (
  props: SVGProps<SVGSVGElement> & { payload: { value: string } }
) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <text
        x={0}
        y={0}
        dy={0}
        fill="#0d2828"
        fontSize={15}
        fontWeight={600}
        fontFamily={'Open Sans'}
      >
        {payload.value}
      </text>
    </g>
  );
};

export default AssetChart;
