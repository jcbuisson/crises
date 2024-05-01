<template>
   <div ref="vis"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import embed from 'vega-embed'

const vis = ref(null)

const spec = {
   "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
   description: "A simple time-series line chart.",
   data: {
      values: [
         // Noel 2022
         {"date": "2022-12-30", "value": 7},

         // Rabat
         {"date": "2023-06-01", "value": 7},
         {"date": "2023-06-02", "value": 7},
         {"date": "2023-06-03", "value": 7},
         {"date": "2023-06-04", "value": 8},

         // Samu
         {"date": "2023-06-27", "value": 8},
         {"date": "2023-06-28", "value": 8},
         {"date": "2023-06-29", "value": 8},
         {"date": "2023-09-30", "value": 10},

         // Paques 2024
         {"date": "2024-04-20", "value": 4},
         {"date": "2024-04-21", "value": 5},
         {"date": "2024-04-22", "value": 4},

         {"date": "2024-04-30", "value": 2},
      ]
   },
   encoding: {
      x: {
         field: "date",
         type: "temporal",
         title: "",
      },
   },
   layer: [
      // goal layer ; painted first to stay behind
      {
         data: {
            values: [
               {"date": "2023-04-27", "value": 10},
               {"date": "2024-04-21", "value": 10},
            ],
         },
         mark: {
            type: "area",
            interpolate: 'step-after',
            color: "#00440030",
            clip: true,
         },
         encoding: {
            y: {
               field: "value",
               type: "quantitative",
               title: "",
            }
         },
      },

      {
         mark: 'bar',
         "encoding": {
            "y": {
               field: "value",
               type: "quantitative",
               title: "intensité",
            }
         },
      },
   ],
}

onMounted(() => {
   embed(vis.value, spec)
})
</script>