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
         {"date": "2022-01-01", "value": 8},
         {"date": "2022-02-02", "value": 10},
         {"date": "2022-06-03", "value": 7},
         {"date": "2022-09-04", "value": 2},
         {"date": "2022-12-05", "value": 5}
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
               {"date": "2022-06-03", "value": 10},
               {"date": "2022-09-04", "value": 10},
            ],
         },
         mark: {
            type: "area",
            interpolate: 'step-after',
            color: "#00440055",
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