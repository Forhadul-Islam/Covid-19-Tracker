import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

// const options = {
//   legend: {
//     display: false,
//   },
//   elements: {
//     point: {
//       radius: 0,
//     },
//   },
//   maitainAspectRatio: false,
//   tooltips: {
//     mode: "index",
//     intersect: false,
//     lable: function (tooltipItem, data) {
//       return numeral(tooltipItem.value).format("+0,0");
//     },
//   },
//   scale: {
//     xAxes: [
//       {
//         type: "time",
//         time: {
//           format: "MM/DD/YY",
//           tooltipFormat: "ll",
//         },
//       },
//     ],
//     yAxes: [
//       {
//         gridLines: {
//           display: false,
//         },
//         ticks: {
//           callback: function (value, index, values) {
//             return numeral(value).format("0a");
//           },
//         },
//       },
//     ],
//   },
// };

function LineChart({ casesType }) {
  const [data, setData] = useState({});
  const [lineChartData, setLineChartData] = useState([]);
  const [lineChartLable, setLineChartLable] = useState([]);
  const data1 = {
    labels: [...lineChartLable],
    datasets: [
      {
        label: casesType,
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,19)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [...lineChartData],
      },
    ],
  };

  //This builChartData will create a structer for data as coordinates (x,y)
  const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;
    const label = [];
    const datas = [];
    for (let date in data[casesType]) {
      if (lastDataPoint) {
        const newChartData = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };

        label.push(date);
        datas.push(data[casesType][date] - lastDataPoint);
        chartData.push(newChartData);
      }
      lastDataPoint = data[casesType][date];
    }
    setData(chartData);
    setLineChartData(datas);
    setLineChartLable(label);
  };
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((res) => res.json())
      .then((data) => {
        buildChartData(data, casesType);
      });
  }, [casesType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={data1}
          //   options={options}
          // data={{
          //   datasets: [
          //     {
          //       backgroundColor: "tomato",
          //       borderColor: "purple",
          //       data: data,
          //       label: "Scatter Dataset",
          //     },
          //   ],
          // }}
        />
      )}
    </div>
  );
}

export default LineChart;
