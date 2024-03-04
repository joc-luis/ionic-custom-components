<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {FileInfo} from "../../models/file-info.ts";
import {KindDeviceEnum} from "../../enums/kind-device.enum.ts";
import {DeviceInfo} from "../../modules/device-info.ts";
import {Converter} from "../../modules/converter.ts";
import {FileManager} from "../../modules/file-manager.ts";
import {documentAttach} from 'ionicons/icons';
import {IonInput} from "@ionic/vue";

const model = defineModel<FileInfo | FileInfo[]>()
const emit = defineEmits(['onChangeFiles'])

const values = computed((): string => {
  if (props.multiple) {
    const names: string[] = [];

    (model?.value as FileInfo[])?.forEach(file => {
      names.push(file.name)
    })

    return names.join(", ");
  } else {
    return (model?.value as FileInfo)?.name;
  }
})


const props = defineProps<{
  multiple: boolean,
  label: string,
  labelPlacement: "floating" | "fixed" | "stacked" | "",
  mimeTypes: string[]
}>()

const kindDevice = ref<KindDeviceEnum>(KindDeviceEnum.browser)


onMounted(async () => {
  kindDevice.value = await DeviceInfo.kind()
})

async function onBrowserClick() {
  const inputElement = document.createElement("input");
  inputElement.style.display = "none";
  inputElement.type = "file";
  inputElement.accept = props.mimeTypes?.length > 0 ? props.mimeTypes.join(", ") : "*"
  inputElement.id = Math.random().toString();
  inputElement.addEventListener("change", async () => {
    if (inputElement.files != null && inputElement.files.length > 0) {
      if (props.multiple) {
        const files: FileInfo[] = []
        for (let i = 0; i < inputElement.files.length; i++) {
          const file = inputElement.files[i];
          files.push({
            path: undefined,
            name: file.name,
            mimeType: file.type,
            data: Converter.toBase64(new Uint8Array(await file.arrayBuffer()))
          })
        }
        emit("onChangeFiles", files)
        model.value = files;
      } else {
        model.value = {
          path: undefined,
          name: inputElement.files[0].name,
          mimeType: inputElement.files[0].type,
          data: Converter.toBase64(new Uint8Array(await inputElement.files[0].arrayBuffer()))
        }
        emit("onChangeFiles", {
          path: undefined,
          name: inputElement.files[0].name,
          mimeType: inputElement.files[0].type,
          data: Converter.toBase64(new Uint8Array(await inputElement.files[0].arrayBuffer()))
        })
      }
    }
  })
  document.body.appendChild(inputElement);
  inputElement.click();
  inputElement.remove();

  return Promise.resolve()
}

async function onPhoneClick() {
  const files = await FileManager.pick(props.mimeTypes?.length > 0 ? props.mimeTypes : ["*"], props.multiple);

  if (props.multiple) {
    model.value = files;
  } else {
    model.value = {
      path: undefined,
      name: "",
      mimeType: "",
      data: ""
    }
    if (files.length > 0) {
      model.value = files[0];
    }
  }
  emit("onChangeFiles", files)
}

</script>

<template>
  <ion-input
      v-if="kindDevice == KindDeviceEnum.browser"
      readonly
      :value="values"
      :label="label"
      :label-placement="labelPlacement"
      @click="onBrowserClick()">
    <ion-icon :icon="documentAttach" slot="end"></ion-icon>
  </ion-input>
  <ion-input
      v-else
      readonly
      :value="values"
      :label="label"
      :label-placement="labelPlacement"
      @click="onPhoneClick()">
    <ion-icon :icon="documentAttach" slot="end"></ion-icon>
  </ion-input>
</template>