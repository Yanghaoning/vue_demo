<template>
    <div class="home">
        <vueCropper></vueCropper>
    </div>
</template>

<script>
    // @ is an alias to /src
    import vueCropper from '@/components/vueCropper.vue'
    import {getList} from '../api/index'

    export default {
        name: 'Home',
        components: {
            vueCropper
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let data = {
                    catName: '不在支持时间段内的进行中活动',
                }
                getList(data).then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>
