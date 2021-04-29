<template>
  <div class="time_wrap"
       @mousedown="start($event)"
       @mouseup.stop="stop($event)"
       @mousemove="move($event)"
       @mouseleave="leave()"
  >
    <ul draggable="true"
        ref="listWrap"
        class="lists"
        :style="[{top:translate+'px'}]"
    >
      <li v-for="(item,index) in list" :key="index" class="time_item_wrap">
        <div class="time_item" :style="[{color:item.istrue?'#333':'#c0b9b9'}]"
             :data-curval="JSON.stringify(item)+'/'+index"
        >
          <span v-if="item.month == '01'">{{item.year}} - </span>
          {{item.month}}月
        </div>
        <span class="don" v-if="item.istrue" :data-curval="JSON.stringify(item)+'/'+index"></span>
      </li>
    </ul>
    <div class="selected">
        <span class="month">
          {{checkMonth}}
        </span>
      <span class="choseDon"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "timing",
    props: {
      //开始时间
      startTime:{
        type:String
      },
      //结束时间
      endTime:{
        type:String
      },
    },
    data() {
      return {
        startDate: '',
        endDate: '',
        translate: '',
        newTranslate: "",
        checkedIndex: '',
        checkMonth: '',
        list: [],
        drageY: 0,
        isClick: true,
        canDrag: false,//是否按下鼠标
        isChange: false,//是否改变选中年月
        x0: 0,
        y0: 0,
        x1: 0,
        y1: 0

      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      leave() {
        if (this.canDrag) {
          this.stop()
        }
      },
      start(e) {
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
        if (e.button == 0) {
          this.drageY = 0;
          this.canDrag = true;
          this.x0 = e.clientX;
          this.y0 = e.clientY;
        }
        this.isChange = false
        this.$refs.listWrap.style.transition = 'none'
      },
      stop(e) {
        this.canDrag = false;
        this.translate = this.newTranslate
        if (this.drageY > 0) {
          //执行移动
          let result = ''
          for (var i = 0; i < this.list.length; i++) {
            if (i == this.checkedIndex) {
              result = this.list[i]
            }
          }
          setTimeout(() => {
            this.startDate = result.count + "-" + '01'
            this.endDate = this.$utils.toDateString(new Date(result.year, result.month, 0), 'yyyy-MM-dd')
            if (this.isChange) {
              this.$emit('changeDate',this.startDate,this.endDate)
            }
            this.checkMonth = result.year + '年' + result.month + '月'
          }, 1000)
        } else {
          //执行点击
          console.log(e.target.dataset)
          if (e.target.dataset.curval) {
            let val = e.target.dataset.curval.split('/')
            let item = JSON.parse(val[0])
            let index = val[1]
            this.choose(index, item)
          }
        }
        this.drageY = 0
        this.$refs.listWrap.style.transition = '1s'
      },
      move(e) {
        if (this.canDrag) {
          this.drageY++
          this.y1 = e.clientY;
          let y = this.y1 - this.y0;
          this.translate = this.translate + y
          if (this.translate > 0) {
            this.translate = 0
          }
          if (this.translate < -(this.list.length - 9) * 50) {
            this.translate = -(this.list.length - 9) * 50
          }
          this.drageY = this.y1
          this.y0 = this.y1;
        }
      },
      choose(index, item) {
        if (item.istrue && this.drageY == 0) {
          this.translate = this.translate + (this.checkedIndex - index) * 50
          this.checkedIndex = index
          setTimeout(() => {
            this.startDate = item.count + "-" + '01'
            this.endDate = this.$utils.toDateString(new Date(item.year, item.month, 0), 'yyyy-MM-dd')
            this.$emit('changeDate',this.startDate,this.endDate)
            this.checkMonth = item.year + '年' + item.month + '月'
          }, 1000)
        }
      },
      getList() {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        if (month < 10) {
          month = '0' + month
        }
        let currentMouth = year + '-' + month
        let starMonth = this.startTime.split('-')
        let endMonth = this.endTime.split('-')
        let startDateStr = starMonth[0] + starMonth[1]
        let endDateStr = endMonth[0] + endMonth[1]
        let current = endMonth[0] + '-' + endMonth[1]
        this.getDateList(startDateStr, endDateStr)
        //移动到当前月份的位置
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].count === currentMouth && this.list[i].istrue) {
            this.checkedIndex = i
            this.checkMonth = this.list[i].year + '年' + this.list[i].month + '月'
            this.translate = -(this.checkedIndex - 4) * 50
            this.startDate = this.list[i].count + "-" + '01'
            this.endDate = this.$utils.toDateString(new Date(this.list[i].year, this.list[i].month , 0), 'yyyy-MM-dd')
            this.$emit('changeDate',this.startDate,this.endDate)
            return
          }
          if (this.list[i].count === current) {
            this.checkedIndex = i
            this.checkMonth = this.list[i].year + '年' + this.list[i].month + '月'
            this.translate = -(this.checkedIndex - 4) * 50
            this.startDate = this.list[i].count + "-" + '01'
            this.endDate = this.$utils.toDateString(new Date(this.list[i].year, this.list[i].month , 0), 'yyyy-MM-dd')
            this.$emit('changeDate',this.startDate,this.endDate)
          }
        }

      },
      /*
      * 输入两个日期生成时间序列
      * 输入格式：201801 （表示2018年1月）
      * 如输入201702 201809
      * 输出数组 [201702,201703,201704....,201809]
      * */
      getDateList(startDateStr, endDateStr) {
        var result = [];//结果数组
        var startYear = startDateStr.substr(0, 4); //开始时间的年份
        var startMonth = startDateStr.substr(4, 2);//开始时间的月份
        var endYear = endDateStr.substr(0, 4);//结束时间的年份
        var endMonth = endDateStr.substr(4, 2);//结束时间的月份
        var startDate = new Date(startYear, startMonth);
        var years = endYear - startYear - 1;
        var count = 0;//计算相隔月份
        if (years >= 0) {
          count = years * 12;
          count += (12 - parseInt(startMonth));
          count += parseInt(endMonth);
        } else {
          count = parseInt(endMonth) - parseInt(startMonth);
        }
        for (var i = 0; i <= count; i++) {
          var tempYear = startDate.getFullYear().toString();
          var tempMonth = startDate.getMonth().toString().length == 1 ? '0' + startDate.getMonth().toString() : startDate.getMonth().toString();
          if (tempMonth == '00') {
            tempYear = (tempYear - 1).toString();
            tempMonth = '12';
          }
          let data = {
            year: tempYear,
            month: tempMonth,
            istrue: true,
            count: tempYear + '-' + tempMonth
          }
          result.push(data);
          startDate.setMonth(startDate.getMonth() + 1);
        }
        this.list = result
        //建账月前4月
        let startArr = []
        for (let n = 1; n < 5; n++) {
          let year = ''
          if (startMonth - n <= 0) {
            year = startYear--
          } else {
            year = startYear
          }
          let month = ''
          if (startMonth - 1 <= 0) {
            startMonth = 13;
          }
          startMonth--;
          month = startMonth;
          if (month < 10) {
            month = '0' + month
          }

          let newObj = {
            year: year.toString(),
            month: month.toString(),
            istrue: false,
            count: year + '-' + month
          };
          startArr.push(newObj)
        }
        //建账月后4月
        let endArr = []
        endMonth = parseInt(endMonth)
        for (let z = 0; z < 4; z++) {
          let enYear = ''
          let endM = ''
          if (endMonth + 1 > 12) {
            endMonth = 0
          }
          endMonth++
          endM = endMonth
          if (endM > 12) {
            enYear = endYear + 1
          } else {
            enYear = endYear
          }
          if (endM < 10) {
            endM = '0' + endM
          }
          let endObj = {
            year: enYear.toString(),
            month: endM.toString(),
            istrue: false,
            count: enYear + '-' + endM
          };
          endArr.push(endObj)
        }
        // console.log(startArr)
        this.list = [...startArr.reverse(), ...this.list, ...endArr]
      }
    },
    watch: {
      translate() {
        this.checkedIndex = Math.round(Math.abs(this.translate) / 50) + 4
        this.newTranslate = -(this.checkedIndex - 4) * 50
      },
      checkedIndex() {
        this.isChange = true
      }
    }
  }
</script>

<style scoped lang="less">
  .time_wrap {
    margin-left: 35px;
    margin-right: 5px;
    width: 125px;
    height: 450px;
    overflow: hidden;
    position: relative;

    .lists {
      width: 120px;
      position: absolute;
      /*z-index: 10;*/
      transition: 1s;
    }

    .time_item_wrap {
      position: relative;

      .time_item {
        cursor: pointer;
        height: 50px;
        border-right: 2px solid #acb1b1;
        line-height: 50px;
        text-align: right;
        padding-right: 14px;
        margin-right: 7px;
        font-size: 13px;
      }

      .don {
        cursor: pointer;
        position: absolute;
        right: 1px;
        top: 47%;
        transform: translateY(-50%);
        display: block;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-image: url("../assets/hui.png");
        background-repeat: no-repeat;
      }
    }

    .selected {
      position: absolute;
      right:0;
      top: 50%;
      width: 100%;
      height: 50px;
      transform: translateY(-50%);
      .month{
        min-width: 60px;
        position: absolute;
        font-size: 14px;
        top: 50%;
        transform: translateY(-50%);
        right: 30px;
        display: block;
        box-sizing: border-box;
        padding: 5px 5px;
        border-radius: 3px;
        line-height: 1;
        height: 24px;
        text-align: left;
        color: #FFFFFF;
        background: #115AA7;
      }
      .month:after{
        border: 10px solid transparent;
        border-left: 10px solid #115AA7;
        width: 0;
        height: 0;
        position: absolute;
        right: -15px;
        top: 2px;
        content: ' '
      }
      .choseDon{
        position: absolute;
        right: 4px;
        top: 50%;
        transform: translateY(-50%);
        display: block;
        width: 18px;
        height: 18px;
        z-index: 10;
        background-image: url("../assets/lan.png");
      }
    }
  }
</style>
