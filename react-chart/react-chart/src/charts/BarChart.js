import React from 'react';
import {
  Chart as ChartJS,CategoryScale,BarElement, LinearScale,} from 'chart.js';
  //Burasi onemli, grafigi arkada olusturan burasi 
  //burayi yazmazask grafik gelmez
import { Bar } from 'react-chartjs-2';

ChartJS.register(
 
  BarElement,
  CategoryScale,
  LinearScale,
);

const data={
    labels:['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //labels bizim grafikte gostgermek istedgimz, basliklari temsil ediyor

    //datasets ise icinde tek bir objeden olusan 1 elemanli bir dizi olacaktir
    //obje icinde data properties i lacak, yani grafik uzerine gidince bize gosterdigi degerlerdir
    //Ve data icindeki degerler label ile ayni siradaki elemanlara karsilik geliyor deger olarak
    //labels in 0.indexi deger olarak data nin da 0.objesine karsilik geliyor seklinde..
    datasets: [
        {
          label: 'Dataset-1',
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

        {
            label: 'Dataset-2',
            data: [12, 19, 3, 5, 2, 3],
            //Bu renkleri de vermemiz gerekiyor ki grafik de gostermek istedigmiz
            //degerler birbirinden kolayca ayirt edilebilsin
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)',
             
             
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 206, 86, 0.2)',
             
              'rgba(255, 159, 64, 0.2)',
              'rgba(153, 102, 255, 0.2)',
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

const options={
    maintainAspectRatio:false,
    responsive: true,
    scales:{
      y:{
        beginAtZero:true
      }
    },
      legend: {
        labels:{
            fontSize:16,
        },
        position: 'top',
       
       
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },

  }
  
  const baseURL="https://api.coinranking.com/v2/coins/?limit=10";
  // /coins


  /*
  BarChart ta olmasi gereken, data formati ile, Doughnut ta olmasi gereken 
  data formati cok az bir farkliligi var cunku grafikler farkli dolayisi ile
  dokumandaki data formatlarini takip etmemiz gerekiyor, ya da soyle diyleim Barhcar t da biz farkli degerleri
  bar olarak karsilastiririz, eger bir de ayrica, ayni bar icinde birbiri ile karsilastirmak istegimiz
  deger ler var ise yani ornegin  her ayin istatistigini bir birim data icin kiyaslariz ama eger biz 2 farkli type da veya daha cok
  datayi ayni zaman da ay ay biribiri ile karsilastirmnak istiyorsak o zamaan da Dataset-1,Dataset-2 seklinde
  objelerimizin olmasi gerekir...

  */
const BarChart = () => {

  return (
    <Bar  data={data} 
    height={70}
    width={200}
    margin={10}
    />
    /* char ta widh ile height carpimi na gore grafik ousturuluyyor ondan dolayi
    width artarsa height dusuyor, width azalirsa heigh yukseliyor aralarinda ters
    oranti var, bunu bilelim
    */
  )
}

export default BarChart