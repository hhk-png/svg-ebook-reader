<script setup lang="ts">
import { ref, defineAsyncComponent } from "vue"
import { useBookStore } from "../../store"
import { useRouter } from "vue-router"
import { ReaderType } from "./Book"
import DropDown from "../../components/DropDown/DropDown.vue"
import ValueAdjuster from "../../components/ValueAdjuster/ValueAdjuster.vue"

const ColumnReader = defineAsyncComponent(
  () => import('../../components/Readers/ColumnReader/ColumnReader.vue')
)
const ScrollReader = defineAsyncComponent(
  () => import('../../components/Readers/ScrollReader/ScrollReader.vue')
)
const ScrollWithNote = defineAsyncComponent(
  () => import('../../components/Readers/ScrollWithNote/ScrollWithNote.vue')
)

const router = useRouter()
const bookStore = useBookStore()

/**
 * info bar show or hide
 */
const isInfoDown = ref<boolean>(false)
const back = () => {
  bookStore.reset()
  router.push('/')
}
// when mouse click outside the selection, the infor bar will be clicked.
//  but we don't want it to be clicked, so we need to prevent it when cancel
//  the selection.
let shouldTriggerClick = true
const infoBarToggle = (e: Event) => {
  if (!shouldTriggerClick) {
    shouldTriggerClick = true
    return
  }
  const selection = window.getSelection()!.toString()
  if (selection.length > 0) {
    e.preventDefault()
    e.stopImmediatePropagation()
  } else {
    isInfoDown.value = !isInfoDown.value
  }
}
const handleMouseDown = () => {
  const selection = window.getSelection()!
  if (selection.toString().length > 0) {
    shouldTriggerClick = false
  }
}
const infoBarDown = () => {
  isInfoDown.value = false
}

/**
 * reader switch
 */
const readerModes = ref([
  { name: ReaderType.COLUMN, logo: "column.svg" },
  { name: ReaderType.SCROLL, logo: "scroll.svg" },
  { name: ReaderType.SCROLL_WITH_NOTE, logo: "scrollWithNote.svg" },
])
const modeIndex = ref<number>(0)

</script>

<template>
  <div :class="{ 'top0': isInfoDown, 'topN80': !isInfoDown }" class="top-info-bar">
    <div class="top-info-bar-left">
      <!-- back button -->
      <span @click="back"><img src="/leftArrow.svg" alt="leftArrow">Back</span>
      <DropDown :reader-modes="readerModes" v-model:current-mode-index="modeIndex"></DropDown>
    </div>
    <div class="top-info-bar-middle">
      {{ bookStore.getFileName() }}
    </div>
    <div class="top-info-bar-right">
      <ValueAdjuster :max="21"></ValueAdjuster>
    </div>
  </div>
  <div @mousedown="handleMouseDown" @click="infoBarToggle">
    <ColumnReader v-if="readerModes[modeIndex].name === ReaderType.COLUMN" @info-down="infoBarDown">
    </ColumnReader>
    <ScrollReader v-else-if="readerModes[modeIndex].name === ReaderType.SCROLL" @info-down="infoBarDown"></ScrollReader>
    <ScrollWithNote v-else-if="readerModes[modeIndex].name === ReaderType.SCROLL_WITH_NOTE" @info-down="infoBarDown"></ScrollWithNote>
  </div>
</template>

<style scoped>
/* info bar */
.top0 {
  top: 0;
}

.topN80 {
  top: -80px;
}

.top-info-bar {
  position: fixed;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  background-color: #ebecee;
  z-index: 1;
  display: flex;
  transition: top 0.2s;
}

.top-info-bar div {
  flex: 1;
  background-color: #f0f0f0;
}

.top-info-bar-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
}

.top-info-bar-left span {
  margin: 0 10px;
  padding: 5px 10px;
  font-size: 10px;
  text-align: center;
  color: #666;
  cursor: pointer;
}

.top-info-bar-left img {
  display: block;
  width: 25px;
  height: 25px;
}

.top-info-bar-middle {
  text-align: center;
  padding-top: 21px;
  font-weight: 400;
}

</style>
