import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut,Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data={
    labels:['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //labels bizim grafikte gostgermek istedgimz, basliklari temsil ediyor

    //datasets ise icinde tek bir objeden olusan 1 elemanli bir dizi olacaktir
    //obje icinde data properties i lacak, yani grafik uzerine gidince bize gosterdigi degerlerdir
    //Ve data icindeki degerler label ile ayni siradaki elemanlara karsilik geliyor deger olarak
    //labels in 0.indexi deger olarak data nin da 0.objesine karsilik geliyor seklinde..
    datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          //Bu renkleri de vermemiz gerekiyor ki grafik de gostermek istedigmiz
          //degerler birbirinden kolayca ayirt edilebilsin
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
}


const DoughnutChart = () => {
  return (
    <div style={{width:"800px",margin:"2rem"}}>
        <Doughnut data={data}/>
    </div>
  )
}

export default DoughnutChart
/*
react-chartjs-2 sitesine gidip orda ornekleri gorebiliriz
bize grafikleri component olarak veiryor ve tabi ki de datalari
da verdgii componentlere props olarak gecilmesini istiyor
*/