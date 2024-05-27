<template>
   <div style="padding: 20px;">
      <div ref="vis"></div>
      <hr/>
      <ul>
         <li class="">La zone verte correspond à la période de prise en charge par le service de psychiatrie du CHU de Purpan</li>
         <li class="">La zone orange correspond à la période d'hospitalisation</li>
         <li class="">L'intensité d'une crise est évaluée sur une échelle de 0 à 10</li>
         <ul>
            <li>10: SAMU</li>
            <li>8: Urgences</li>
            <li>5: Bris d'objets</li>
            <li>3: Insultes</li>
            <li>1: Aggressif verbalement</li>
         </ul>
      </ul>
   </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import embed from 'vega-embed'
import { format } from 'date-fns'

import app from '/src/client-app.js'


const vis = ref(null)
const criseList = ref([])

const spec = computed(() => ({
   "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
   // description: "A simple time-series line chart.",
   width: screenWidth.value - 100,
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
            domain: ["2023-05-01", format(new Date(), 'yyyy-MM-dd')],
         },
         axis: {
            formatType: "time",
            format: "%b %Y",
         },
         title: "",
      },
   },
   layer: [
      // green area layer ; painted first to stay behind
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
         },
      },

      // orange area layer ; painted first to stay behind
      {
         data: {
            values: [
               {"date": "2023-07-01", "intensity": 10},
               {"date": "2023-07-31", "intensity": 10},
            ],
         },
         mark: {
            type: "area",
            interpolate: 'step-after',
            color: "#f2af4930",
            clip: true,
         },
         encoding: {
            y: {
               field: "intensity",
               type: "quantitative",
               title: "",
            },
         },
      },

      // crises
      {
         mark: 'bar',
         encoding: {
            y: {
               field: "intensity",
               type: "quantitative",
               title: "Intensité de la crise",
            },
            tooltip: [
               { field: "intensity", type: "quantitative" },
               { field: "comment", type: "text" },
            ]
         },
      },
   ],
}))

onMounted(async () => {
   window.addEventListener("resize", updateWidth)
   criseList.value = await app.service('crise').findMany({})
   await embed(vis.value, spec.value)
})

const screenWidth = ref(window.innerWidth)

async function updateWidth() {
   screenWidth.value = window.innerWidth
   await embed(vis.value, spec.value)
}

</script>