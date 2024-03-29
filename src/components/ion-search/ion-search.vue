<script setup lang="ts">

import {
  IonCheckbox,
  IonModal,
  IonCard,
  IonInput,
  IonCardContent,
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  modalController,
  IonToolbar,
  IonButton,
  IonButtons
} from "@ionic/vue";
import {computed, ref} from "vue";

const model = defineModel<any | any[]>({ required: true })
const search = ref<string>("")
const take = ref<number>(10);

const modal = ref<string>(Math.random().toString())

const props = defineProps<{
  label: string,
  labelPlacement: string,
  items: any[],
  itemValue: string,
  itemText: string,
  title: string,
  subTitle: string,
  multiple: boolean
}>()

function onClickCheck(value: any) {
  if (model.value.filter((m: any) => m == value).length > 0) {
    model.value = model.value.filter((m: any) => m == value);
  } else {
    model.value.push(value);
  }
}

async function onClickButton(value: any) {
  model.value = value;
  await modalController.dismiss();
}

const showValues = computed((): string => {
  if (props.itemText.length == 0) {
    if (props.multiple) {
      return model.value.join(", ")
    } else {
      return model.value;
    }
  } else {
    if (props.multiple) {
      const selected: string[] = []
      props?.items?.filter((i: any) => model.value.indexOf(i[props.itemValue]) > -1).forEach(item => {
        selected.push(item[props.itemText])
      })
      return selected.join(", ");
    } else {
      if (model.value != null && model.value.length > 0 && props.items.length > 0) {
        return props?.items?.filter((m: any) => m[props.itemValue] == model.value)[0][props.itemText];
      }
    }
  }

  return "";
})

const pagination = computed((): any[] => {
  const results = props?.items?.filter((i: any) => JSON.stringify(i).toLowerCase().indexOf(search.value.toLowerCase()) > -1);
  if (results.length - 1 <= take.value) {
    return results;
  }

  return results.slice(0, take.value)
})


function showMoreResults(event: InfiniteScrollCustomEvent) {
  take.value += 10;
  setTimeout(() => event.target.complete(), 500);
}

async function cancel(){

  if (props.multiple){
    model.value = []
  }else{
    model.value = null;
  }

  await modalController.dismiss();
}

async function onSubmit(){
  await modalController.dismiss();
}

</script>

<template>
  <ion-modal :trigger="modal">
    <ion-card>
      <ion-card-header class="ion-text-center">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button color="medium" @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-card-title class="ion-text-center">{{ title.length == 0 ? label : title }}</ion-card-title>
          <ion-buttons slot="end">
            <ion-button @click="onSubmit()" :strong="true">Confirm</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-card-subtitle>{{ subTitle }}</ion-card-subtitle>
      </ion-card-header>
      <ion-list>
        <ion-item>
          <ion-input label="Search" label-placement="floating" v-model="search" @change="take = 10">
          </ion-input>
        </ion-item>
      </ion-list>
      <ion-card-content ion-content v-if="multiple">
        <ion-list v-if="itemValue.length == 0">
          <ion-item v-for="item in pagination" :key="item">
            <ion-checkbox @click="onClickCheck(item)">
              {{ item }}
            </ion-checkbox>
          </ion-item>
        </ion-list>
        <ion-list v-else>
          <ion-item v-for="item in pagination" :key="item">
            <ion-checkbox @click="onClickCheck(item[itemValue])">
              {{ item[itemText] }}
            </ion-checkbox>
          </ion-item>
          <ion-item v-if="pagination.length < take">
            <ion-label class="ion-text-center">
              End of the results
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>
      <ion-card-content class="ion-content-scroll-host" v-else>
        <ion-list v-if="itemValue.length == 0">
          <ion-item button v-for="item in pagination" :key="item" @click="onClickButton(item)">
            <ion-label>
              {{ item }}
            </ion-label>
          </ion-item>
        </ion-list>
        <ion-list v-else>
          <ion-item v-for="item in pagination" :key="item" @click="onClickButton(item[itemValue])">
            <ion-label>
              {{ item[itemText] }}
            </ion-label>
          </ion-item>
          <ion-item v-if="pagination.length < take">
            <ion-label class="ion-text-center">
              End of the results
            </ion-label>
          </ion-item>
        </ion-list>
        <ion-infinite-scroll @ionInfinite="showMoreResults">
          <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </ion-card-content>
    </ion-card>
  </ion-modal>
  <ion-input
      :id="modal"
      readonly
      :value="showValues"
      :label="label"
      :label-placement="labelPlacement">
  </ion-input>
</template>
