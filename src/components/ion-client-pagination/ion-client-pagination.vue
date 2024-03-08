<script setup lang="ts">

import {computed, ref} from "vue";
import {Column} from "../../models/column.ts";
import {ActionButton} from "../../models/action-button.ts";
import {chevronBackCircle} from "ionicons/icons";
import {IonInput, IonSelect, IonFabButton, IonFabList, IonFab, IonList, IonItem, IonSelectOption, IonItemDivider,IonLabel, IonAccordion, IonAccordionGroup} from "@ionic/vue";

const props = defineProps<{
  rows: any[],
  columns: Column[],
  header: Column,
  slices: number[],
  buttons: ActionButton[]
}>();

const take = ref<number>(10);
const currentPage = ref<number>(1)
const search = ref<string>("")

const pages = computed<number[]>((): number[] => {
  const max: number = parseInt((props.rows.length / take.value).toString())
  const totalPages: number[] = [1]
  for (let i = 1; i < max; i++) {
    totalPages.push(i + 1);
  }

  return totalPages;
});

const paginate = computed((): any[] => {

  const rowsSearch = search.value.length == 0 ? props.rows : props.rows.filter(r => Object.values(r).join("|").toLowerCase().indexOf(search.value.toLowerCase()) >= 0)

  if (take.value * (currentPage.value - 1) > rowsSearch.length) {
    return [];
  }

  if ((take.value * (currentPage.value - 1)) + take.value > rowsSearch.length) {
    return rowsSearch.slice(take.value * (currentPage.value - 1))
  }

  return rowsSearch.slice(take.value * (currentPage.value - 1), take.value * (currentPage.value - 1) + take.value)
})


const showButtons = computed((): ActionButton[] => {
  return props.buttons.filter(b => b.show)
})

</script>
<template>
  <ion-fab slot="fixed" vertical="top" horizontal="end">
    <ion-fab-button color="dark">
      <ion-icon :icon="chevronBackCircle"></ion-icon>
    </ion-fab-button>
    <ion-fab-list side="start">
      <ion-fab-button v-for="button in showButtons" @click="button.onClick" :color="button.color" :key="button">
        <ion-icon :icon="button.icon"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
  </ion-fab>
  <ion-list>
    <ion-item>
      <ion-input label="Search" label-placement="floating" v-model="search"></ion-input>
    </ion-item>
    <ion-item>
      <ion-select label="Page" label-placement="floating" v-model="currentPage">
        <ion-select-option v-for="page in pages" :value="page" :key="page">
          {{ page }}
        </ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-select label="Take" label-placement="floating" v-model="take">
        <ion-select-option v-for="slice in slices" :value="slice" :key="slice">
          {{ slice }}
        </ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>
  <ion-item-divider>
    <ion-label>Show: {{paginate.length}} items of {{ rows.length}}</ion-label>
  </ion-item-divider>
  <ion-accordion-group>
    <ion-accordion v-for="row in paginate" :key="row" @click="$emit('onRowClick', row)">
      <ion-item slot="header">
        <ion-label><b>{{header.title}}</b> {{ ': '+ row[header.key] }}</ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">
        <ion-item v-for="column in columns" :key="column">
          <ion-input label-placement="floating" :label="column.title" :value="row[column.key]" readonly></ion-input>
        </ion-item>
      </div>
    </ion-accordion>
  </ion-accordion-group>
</template>