<template>
  <div>
    <byte-weektime-picker v-model="byteTime"/>
    <el-button @click="aaa"></el-button>
  </div>
</template>

<script>
  import { ByteWeektimePicker } from 'byte-weektime-picker'
  export default {
    name: "weekTime",
    data() {
      return{
        byteTime:''
      }
    },
    components:{
      ByteWeektimePicker
    },
    methods:{
      aaa() {
        console.log(this.byteTime)
      }
    }
  }
</script>

<style scoped>

</style>