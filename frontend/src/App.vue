<template>
   <div style="padding: 20px;">
      <div ref="vis"></div>
      <hr/>
      <ul>
         <li class="">La zone verte correspond à la période de prise en charge par le service de psychiatrie du CHU de Purpan</li>
         <li class="">L'intensité d'une crise est évaluée sur une échelle de 0 à 10</li>
      </ul>
   </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import embed from 'vega-embed'

import app from '/src/client-app.js'


const vis = ref(null)
const criseList = ref([])

const spec = computed(() => ({
   "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
   description: "A simple time-series line chart.",
   width: 1024,
   height: 400,
   // config: {
   //    locale: "fr-FR",
   // },
   data: {
      values: criseList.value,
   },
   encoding: {
      x: {
            field: "date",
            scale: {
               type: "time",
               domain: ["2023-05-01", "2024-12-31"],
            },
            axis: {
               formatType: "time",
               format: "%b %Y",
            },
            title: "",
         },
   },
   layer: [
      // goal layer ; painted first to stay behind
      {
         data: {
            values: [
               {"date": "2023-04-27", "intensity": 10},
               {"date": "2024-04-21", "intensity": 10},
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
               field: "intensity",
               type: "quantitative",
               title: "",
            },
            // color: {field: "intensity", type: "nominal", title: "Période du traitement"},
         },
      },

      {
         mark: 'bar',
         "encoding": {
            "y": {
               field: "intensity",
               type: "quantitative",
               title: "Intensité de la crise",
            },
         },
      },
   ],
}))

onMounted(async () => {
   criseList.value = await app.service('crise').findMany({})
   await embed(vis.value, spec.value)
})
</script>