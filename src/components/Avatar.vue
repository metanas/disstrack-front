<template lang="pug">
svg( :viewBox="`0 0 ${SIZE} ${SIZE}`" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size")
  mask( id="mask__beam" maskUnits="userSpaceOnUse" :x="0" :y="0" :width="SIZE" :height="SIZE")
    rect( :width="SIZE" :height="SIZE" :rx="SIZE * 2" fill="white")
  g( mask="url(#mask__beam)")
    rect( :width="SIZE" :height="SIZE" :fill="item.backgroundColor" )
    rect(x="0" y="0" :width="SIZE" :height="SIZE" :transform="`translate(${item.wrapperTranslateX} ${item.wrapperTranslateY}) rotate(${item.wrapperRotate} ${SIZE / 2} ${SIZE / 2}) scale(${item.wrapperScale})`" :fill="item.wrapperColor" :rx="item.isCircle ? SIZE : SIZE / 6")
    g(:transform="`translate(${item.faceTranslateX} ${item.faceTranslateY}) rotate(${item.faceRotate} ${SIZE / 2} ${SIZE / 2})`")
      path(:d="`M15 ${19 + item.mouthSpread} c2 1 4 1 6 0`" :stroke="item.faceColor" fill="none" strokeLinecap="round" v-if="item.isMouthOpen")
      path( :d="`M13, ${19 + item.mouthSpread} a1,0.75 0 0,0 10,0`" :fill="item.faceColor" v-else)
      rect( :x="14 - item.eyeSpread" :y="14" :width="1.5" :height="2" :rx="1" stroke="none" :fill="item.faceColor")
      rect( :x="20 + item.eyeSpread" :y="14" width="1.5" :height="2" :rx="1" stroke="none" :fill="item.faceColor")
</template>

<script lang="ts" setup>
import {
  getBoolean,
  getContrast,
  getNumber,
  getRandomColor,
  getUnit,
} from "../utilities";

const SIZE = 36;

const props = defineProps<{
  size: number;
  name: string;
}>();

const colors = ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"];

function generateData(name: string, colors: string[]) {
  const numFromName = getNumber(name);
  const range = colors && colors.length;
  const wrapperColor = getRandomColor(numFromName, colors, range);
  const preTranslateX = getUnit(numFromName, 10, 1);
  const wrapperTranslateX =
    preTranslateX < 5 ? preTranslateX + SIZE / 9 : preTranslateX;
  const preTranslateY = getUnit(numFromName, 10, 2);
  const wrapperTranslateY =
    preTranslateY < 5 ? preTranslateY + SIZE / 9 : preTranslateY;

  return {
    wrapperColor: wrapperColor,
    faceColor: getContrast(wrapperColor),
    backgroundColor: getRandomColor(numFromName + 13, colors, range),
    wrapperTranslateX: wrapperTranslateX,
    wrapperTranslateY: wrapperTranslateY,
    wrapperRotate: getUnit(numFromName, 360),
    wrapperScale: 1 + getUnit(numFromName, SIZE / 12) / 10,
    isMouthOpen: getBoolean(numFromName, 2),
    isCircle: getBoolean(numFromName, 1),
    eyeSpread: getUnit(numFromName, 5),
    mouthSpread: getUnit(numFromName, 3),
    faceRotate: getUnit(numFromName, 10, 3),
    faceTranslateX:
      wrapperTranslateX > SIZE / 6
        ? wrapperTranslateX / 2
        : getUnit(numFromName, 8, 1),
    faceTranslateY:
      wrapperTranslateY > SIZE / 6
        ? wrapperTranslateY / 2
        : getUnit(numFromName, 7, 2),
  };
}

const item = generateData(props.name, colors);
</script>
