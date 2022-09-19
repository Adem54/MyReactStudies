import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


export const options = {
    indexAxis: 'x',
    //indexAxis x olursa bar grafigi x ekseninde gelecektir, y olursa y ekseninde gelecektir
    //Normalde grafiklerin kendilerine ait default bir buyuklukleri var
    //bunlari da degistirmek icin asagidaki degerler ile oynayabiliyoruz
    // elements: {
    //   bar: {
    //     borderWidth: 2,
    //   },
    // },
    // responsive: true,
    // plugins: {
    //   legend: {
    //     position: 'right',
    //   },
    //   title: {
    //     display: true,
    //     text: 'Chart.js Horizontal Bar Chart',
    //   },
    // },
  };
  

function HorizontalBarChart({ chartData }) {
  return <Bar options={options} data={chartData} />;
}

export default HorizontalBarChart

