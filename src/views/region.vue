<template>
  <div>
    <el-popover
        v-model="isShow"
        @show="popoverShow"
        @after-enter="afterEnter"
        placement="bottom-start"
        width="400"
        trigger="click">
      <div class="region_content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="(item,index) in activeList" :key="index" :label="item.label" :disabled="item.disabled"
                       :name="item.code">
            <el-scrollbar style="height: 80%">
              <ul class="regionList">
                <li class="region_item" v-for="i in item.list" :key="i.code">
                  <span :style="{color:i.name == item.label?'#409EFF':''}" @click="select(item,i,index)">{{i.name}}</span>
                </li>
              </ul>
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
        <el-button size="mini" type="primary" style="float: right" @click="confirm()">确定</el-button>
      </div>
      <div class="result" slot="reference">
        <span class="title">{{checkedLabel}}</span>
        <span class="icons"><i class="el-icon-arrow-down"></i></span>
      </div>
    </el-popover>
  </div>
</template>

<script>
  export default {
    name: "region",
    data() {
      return {
        isShow:false,
        active:'province',
        activeName: 'province',
        choseLabel:'',
        choseCode:'',
        checkedLabel:'请选择',
        activeList: [
          {
            label: '省/直辖市',
            code: 'province',
            disabled: false,
            next:'city',
            list: [
              {name: '北京', code: '010'},
              {name: '天津', code: '011'}
            ],
          },
          {
            label: '市',
            code: 'city',
            disabled: true,
            next:'district',
            list: [
              {name: '石家庄', code: '010'},
              {name: '保定', code: '011'}
            ],
          },
          {
            label: '区县',
            code: 'district',
            disabled: true,
            next:'town',
            list: [
              {name: '长安区', code: '010'},
              {name: '裕华区', code: '011'}
            ],
          },
          {
            label: '乡镇',
            code: 'town',
            disabled: true,
            next:'village',
            list: [
              {name: '宋营', code: '010'},
              {name: '宋营', code: '011'}
            ],
          },
          {
            label: '村',
            code: 'village',
            disabled: true,
            next:'',
            list: [
              {name: '东仰岭', code: '010'},
              {name: '西仰岭', code: '011'}
            ],
          },
        ],
      }
    },
    methods: {
      select(item,i) {
        this.choseLabel = i.name
        this.active = item.code
        this.choseCode = i.code
        item.label = i.name
        if (item.next) {
          for(let i = 0;i<this.activeList.length;i++) {
            if (item.next == this.activeList[i].code){
              this.activeList[i].disabled = false
            }
          }
         /* this.activeName = item.next*/
        }
      },
      confirm() {
        this.isShow = false
        this.checkedLabel = this.choseLabel
      },
      handleClick() {

      },
      popoverShow() {
        this.activeName = ''
      },
      afterEnter() {
        this.activeName = this.active
      }
    }
  }
</script>

<style scoped lang="less">
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  /deep/ .el-tabs__header {
    margin: 0;
  }

  .result {
    margin: 0 auto;
    width: 250px;
    line-height: 40px;
    height: 40px;
    text-align: left;
    box-sizing: border-box;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid #cccccc;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      display: block;
    }

    .icons {
      display: block;
    }
  }

  .region_content {
    width: 400px;
    height: 300px;

    .regionList {
      height: 240px;
      display: flex;
      align-content: flex-start;
      flex-wrap: wrap;

      .region_item {
        cursor: pointer;
        width: 25%;
        margin-top: 10px;
      }

      .region_item:hover {
        color: #409EFF;
      }
    }
  }
</style>