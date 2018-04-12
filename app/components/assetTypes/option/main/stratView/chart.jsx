
import React from 'react';
import Highcharts from 'highcharts/js/highcharts'; 
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Tooltip, Legend, LineSeries
} from 'react-jsx-highcharts';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const App = () => (
  <div className="app">
    <HighchartsChart>
      <Chart />
      <Title>Profit</Title>
      <Subtitle>in Billions</Subtitle>

      <Legend layout="vertical" align="right" verticalAlign="middle" borderWidth={0} />

      <Tooltip valueSuffix=" $" shared />

      <XAxis categories={MONTHS}>
        <XAxis.Title>Time</XAxis.Title>
      </XAxis>

      <YAxis id="cities">
        <YAxis.Title>$Billions</YAxis.Title>
        <LineSeries id="Brad" name="Brad" data={[7.0, 6.9, 9.5, 14.5, 18.2, 19.5, 20.2, 21.5, 23.3, 24.3, 26.9, 29.6]} />
        <LineSeries id="Di" name="Di" data={[-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]} />
        <LineSeries id="Stewart" name="Stewart" data={[-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]} />
        <LineSeries id="Harry" name="Harry" data={[3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 18.6, 21.2, 22.3, 26.6, 34.8]} />
        <LineSeries id="Grace" name="Grace" data={[22.1, 22.1, 21.0, 18.4, 15.3, 12.9, 12.0, 13.2, 15.3, 17.7, 19.5, 21.2]} />
        <LineSeries id="Tina" name="Tina" data={[2.1, 4.1, 6.0, 8.4, 10.3, 12.9, 19.0, 13.2, 15.3, 17.7, 19.5, 21.2]} />
      </YAxis>

    </HighchartsChart>
  </div>
);

export default withHighcharts(App, Highcharts);