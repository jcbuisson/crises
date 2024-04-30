<template>
   <div class="p-4">
      <canvas id="chartCanvas"></canvas>
  </div>
</template>

<script setup>
   import { ref, onMounted } from "vue"
   import { Chart, registerables } from 'chart.js'
   import 'chartjs-adapter-date-fns'

   import app from '/src/client-app.js'

   Chart.register(...registerables)

   const chartInstance = ref(null)

   onMounted(() => {
      const ctx = document.getElementById('chartCanvas').getContext('2d')

      chartInstance.value = new Chart(ctx, {
         type: 'bar',
         data: {
            datasets: [{
               label: 'Crises',
               data: [
                  { x: new Date('2023-02-01'), y: 8 },
                  { x: new Date('2023-03-02'), y: 6 },
                  { x: new Date('2023-05-03'), y: 4 },
                  { x: new Date('2023-06-04'), y: 2 },
                  { x: new Date('2023-10-05'), y: 1 },
                  { x: new Date('2023-12-06'), y: 3 },
               ],
            }]
         },
         options: {
            scales: {
               x: {
                  type: 'time',
                  time: {
                     unit: 'day',
                     displayFormats: {
                        day: 'yyyy dd MM'
                     }
                  },
                  title: {
                     display: false,
                  }
               },
               y: {
                  beginAtZero: true,
                  title: {
                     display: true,
                     text: 'Intensité'
                  }
               }
            }
         }
      })
   })

</script>