<template>
    <div>
      <picker :startTime="startTime" :endTime="endTime" @changeDate="changeDate"/>
    </div>
</template>

<script>
  import picker from '../components/picker'
  export default {
    name: "timePicker",
    data() {
      return{
        startTime:'2021-01',
        endTime:'2021-05',
      }
    },
    components: {
      picker
    },
    methods:{
      changeDate(start,end){
        console.log(start,123)
        console.log(end,234)
      }
    }
  }
</script>

<style scoped lang="less">

</style>