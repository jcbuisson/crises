<template>
   <div style="padding: 20px;">
      <div ref="vis"></div>
      <hr/>
      <ul>
         <li class="">- Zone verte : prise en charge CHU de Purpan</li>
         <li class="">- Zone orange : hospitalisation</li>
         <li class="">- Intensité d'une crise :</li>
         <ul>
            <li class="ml-3">• 1: Agressif verbalement</li>
            <li class="ml-3">• 3: Insultes</li>
            <li class="ml-3">• 5: Bris d'objets</li>
            <li class="ml-3">• 8: Urgences</li>
            <li class="ml-3">• 10: SAMU</li>
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
            tooltip: [
            { field: "comment", type: "text", title: "Prise en charge Purpan" },
            ],
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
            tooltip: [
               { field: "comment", type: "text", title: "Hospitalisation" },
            ],
         },
      },

      // yellow area layer ; painted first to stay behind
      {
         data: {
            values: [
               {"date": "2024-06-08", "intensity": 10},
               {"date": "2024-07-10", "intensity": 10},
            ],
         },
         mark: {
            type: "area",
            interpolate: 'step-after',
            color: "#FFFF99",
            clip: true,
         },
         encoding: {
            y: {
               field: "intensity",
               type: "quantitative",
               title: "",
            },
            tooltip: [
               { field: "comment", type: "text", title: "Séjour Maroc" },
            ],
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
            { field: "date", type: "date", title: "Date" },
            { field: "intensity", type: "quantitative", title: "Intensité" },
            { field: "comment", type: "text", title: "Commentaire" },
            ],
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