<template>
  <div class="b_10_3">

    <canvas width="300" height="300" id="myCanvas"></canvas>

    <div id="tags" style="display: none">
      <a href="#">爱</a>
      <a href="#">承诺</a><a href="#">轻时尚</a><a href="#">简约</a><a href="#">科技</a>
      <a href="#">美丽</a><a href="#">智慧</a><a href="#">情感</a><a href="#">体验</a><a href="#">互联网</a>
      <a href="#">美丽</a><a href="#">智慧</a><a href="#">情感</a><a href="#">体验</a><a href="#">互联网</a>
      <a href="#">美丽</a><a href="#">智慧</a><a href="#">情感</a><a href="#">体验</a><a href="#">互联网</a>
      <a href="#">美丽</a><a href="#">智慧</a><a href="#">情感</a><a href="#">体验</a><a href="#">互联网</a>
    </div>

  </div>
</template>

<script>
import '../../public/tagcanvas'
export default {
  name: "tagCanvas",
  data() {
    return {
      tagArr: [
        {name: 'abc'},
        {name: 'abc'},
        {name: 'abc'},
        {name: 'abc'},
        {name: 'abc'},
        {name: 'abc'},
      ]
    }
  },
  mounted() {
    this.abc()

  },
  methods: {
    abc() {
      try {
        // var i, et = document.getElementById('tags').childNodes;
        // for (i in et) {
        //   et[i].nodeName == 'A' && et[i].addEventListener('click', function (e) {
        //     e.preventDefault();
        //   });
        // }
        TagCanvas.Start('myCanvas', 'tags', {
          interval: 10, //默认20	动画帧之间的间隔，以毫秒为单位
          maxSpeed: 0.03,	 //0.05	最大旋转速度
          minSpeed: 0.01,//0.0	鼠标离开画布时的最小旋转速度
          decel: 0.55,	 //0.95	鼠标离开画布时的减速率
          minBrightness: 0.1,	//0.1	最远点的标签亮度（0.0-1.0）
          textColour: null,	 //"#ff99ff"	标记文本的颜色
          textHeight: 15, //15	标记文本字体的高度（以像素为单位）
          textFont: null,	//标签文本的字体系列
          outlineColour: "#3e97f5",//活动标签周围的框的颜色
          // radiusX: 2.5,
          // radiusY: .6,
          // radiusZ: 1.5,
          // centreImage: !0,
          // imageAlign: !0,
          outlineOffset: 5,//	轮廓与文本的距离，以像素为单位
          pulsateTo: 1.0,//	 "脉动轮廓不透明度(0.0 - 1.0)
          pulsateTime: 3,	//脉搏率，以每秒的秒数为单位
          depth: 0.5,	//控制透视（0.0-1.0）
          initial: [.05, 0],	//初始旋转，水平和垂直为数组，例如0.8，-0.3。值乘以maxSpeed。
          freezeActive: false, //	设置为true以在突出显示标记时暂停移动。
          frontSelect: false,	//设置为true以防止在云后面选择标记。
          txtOpt: true, //	文本优化，将文本标签转换为图像以获得更好的性能。
          txtScale: 2,	//在txtOpt模式下转换为图像时文本的缩放系数。
          reverse: true,	//设置为true以反转相对于鼠标位置的移动方向。
          hideTags: true,	//如果TagCanvas成功启动，则设置为true以自动隐藏标记列表元素。
          zoom: 1,	//调整画布中标签云的相对大小。较大的值将放大到云，较小的值将缩小。
          wheelZoom: true,	//使用鼠标滚轮或滚动手势可以放大和缩小云。
          zoomStep: 0.05,	//每次移动鼠标滚轮时缩放变焦量。
          zoomMax: 3,	//最大缩放值。
          zoomMin: 0.3,	//最小缩放值。
          shadow: "#000000",	//每个标签后面阴影的颜色。
          shadowBlur: 0,	//标记阴影模糊量，以像素为单位。
          shadowOffset: [0, 0],	//标记阴影的X和Y偏移量，以像素为单位。
          weight: true ,	//设置为true以打开标签的权重。
          weightMode: "size",//用于显示标记权重的方法。应该是尺寸，颜色或两者之一。
          weightSize: 22, //用于在使用大小或两者的重量模式时调整标签大小的乘数。
          weightGradient: {0: '#f00', 0.33: '#ff0', 0.66: '#0f0', 1: '#00f'},	//使用颜色权重模式或两者时，用于着色标签的颜色渐变。
          weightFrom: null,	//用于获取标记权重的link属性。默认值为null表示权重取自计算出的链接字体大小。
          shape: "Sphere", //目前支持的是Sphere, hcylinder 或vcylinder 三种形状显示
          lock: null,//	值“x”限制云的旋转到（水平）x轴，值“y”限制旋转到（垂直）y轴。 （这些是字符串，因此需要引号）
        });
      } catch (e) {
        // something went wrong, hide the canvas container
        //document.getElementById('myCanvasContainer').style.display = 'none';
      }
    }
  }
}
</script>

<style scoped>

</style>
