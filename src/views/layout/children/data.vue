<template>
  <div class="data">
    <el-card>
      <ul class="top">
        <li>
          <div>{{ titleList.increment_users }}</div>
          <p>今日新增用户</p>
        </li>
        <li>
          <div>{{ titleList.total_users }}</div>
          <p>总用户量</p>
        </li>
        <li>
          <div>{{ titleList.increment_questions }}</div>
          <p>新增试题</p>
        </li>
        <li>
          <div>{{ titleList.total_questions }}</div>
          <p>总试题量</p>
        </li>
        <li>
          <div>{{ titleList.total_done_questions }}</div>
          <p>总刷题量</p>
        </li>
        <li>
          <div>{{ titleList.personal_questions }}</div>
          <p>人均刷题量</p>
        </li>
      </ul>
    </el-card>
    <el-card class="echar">
      <p>整体数据</p>
      <div ref="echart" class="conten"></div>
    </el-card>
  </div>
</template>

<script>
//导入接口
import { title, statistics } from "@/api/data/index.js"
import echarts from "echarts"
export default {
  data() {
    return {
      titleList: [],
      statisList: [],
      nameList: [],
    }
  },
  created() {
    title().then((res) => {
      // window.console.log(res)
      this.titleList = res.data
    })
    statistics().then((res) => {
      // window.console.log(res)
      this.statisList = res.data
      let name = this.statisList.map((v) => {
        return v.name
      })
      this.nameList = name
      this.$nextTick(() => {
        this.fangfa()
      })
    })
  },
  methods: {
    fangfa() {
      var myChart = echarts.init(this.$refs.echart)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          right: 10,
          data: this.nameList,
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.statisList,
          },
        ],
      })
    },
  },
  mounted() {
    this.fangfa()
  },
}
</script>

<style lang="less">
.data {
  .top {
    display: flex;
    align-items: center;
    justify-content: space-around;
    div {
      width: 100px;
      height: 100px;
      border: 2px solid red;
      border-radius: 50%;
      text-align: center;
      line-height: 100px;
    }
    p {
      text-align: center;
    }
  }
  // .echar {
  //   width: 100%;
  //   height: 600px;
  // }
  .conten {
    margin: 0 auto;
    width: 600px;
    height: 600px;
  }
}
</style>
