<template>
  <div class="parse-fetch-xml">
    <el-card class="xml-content">
      <span>fetch-xml:</span><el-button style="margin-left: 10px;" type="primary" @click="parseXMLFuc(xml)">转换</el-button>
      <el-input v-model="xml" class="my-textarea" type="textarea" />
    </el-card>
    <el-card class="js-content">
      <span>fetch-js:</span><el-button style="margin-left: 10px;" type="primary" @click="buildXMLFuc(jsObj)">转换</el-button>
      <el-input v-model="jsObj" class="my-textarea" type="textarea" />
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { parseXML, buildXML } from '@/utils/fetch-xml';
import { ref } from 'vue'

const xml = ref('')

const jsObj = ref('')

const buildXMLFuc = (jsObj: string) => {
    const json = JSON.parse(jsObj)
    xml.value = buildXML(json)
}

const parseXMLFuc = (xml: string) => {
    jsObj.value = JSON.stringify(parseXML(xml), null, 2)
}

</script>
<style lang="scss">
.parse-fetch-xml {
  .js-content {
    margin-top: 10px;
  }
  .my-textarea {
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    height: calc(50vh - 120px);
    line-height: 1.5em;
    textarea {
      flex: 1;
    }
  }
}
</style>
