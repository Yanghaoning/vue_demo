<template>
    <div class="about">
        <el-upload class="upload-demo" action="" drag
                   :auto-upload="false" :show-file-list="false" :on-change='changeUpload'>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">点击上传</div>
            <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>
        </el-upload>
        <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
            <div class="cropper-content">
                <div class="cropper" style="text-align:center;height: 500px">
                    <vueCropper
                            ref="cropper"
                            :img="option.img"
                            :outputSize="option.size"
                            :outputType="option.outputType"
                            :info="true"
                            :full="option.full"
                            :canMove="option.canMove"
                            :canMoveBox="option.canMoveBox"
                            :original="option.original"
                            :autoCrop="option.autoCrop"
                            :fixed="option.fixed"
                            :fixedNumber="option.fixedNumber"
                            :centerBox="option.centerBox"
                            :infoTrue="option.infoTrue"
                            :fixedBox="option.fixedBox"
                    ></vueCropper>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                fileUrlList: [],
                dialogVisible: false,
                loading: false,
                option: {
                    img: '', // 裁剪图片的地址
                    info: true, // 裁剪框的大小信息
                    outputSize: 0.8, // 裁剪生成图片的质量
                    outputType: 'jpeg', // 裁剪生成图片的格式
                    canScale: false, // 图片是否允许滚轮缩放
                    autoCrop: true, // 是否默认生成截图框
                    autoCropWidth: 400, // 默认生成截图框宽度
                    autoCropHeight: 200, // 默认生成截图框高度
                    fixedBox: false, // 固定截图框大小 不允许改变
                    fixed: true, // 是否开启截图框宽高固定比例
                    fixedNumber: [6, 3], // 截图框的宽高比例
                    full: true, // 是否输出原图比例的截图
                    canMove:true,//上传图片是否可以移动
                    canMoveBox: true, // 截图框能否拖动
                    original: false, // 上传图片按照原始比例渲染
                    centerBox: false, // 截图框是否被限制在图片里面
                    infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
                },
                picsList: [],  //页面显示的数组
                fileName: "",
            }

        },
        mounted() {

        },
        methods: {
            changeUpload(file) {
                const isLt5M = file.size / 1024 / 1024 < 5
                if (!isLt5M) {
                    this.$message.error('上传文件大小不能超过 5MB!')
                    return false
                }
                let url = URL.createObjectURL(file.raw)
                //提前存一下文件名字 一会转文件的时候能用
                this.fileName = file.name
                // 上传成功后将图片地址赋值给裁剪框显示图片
                this.$nextTick(() => {
                    this.option.img = url
                    this.dialogVisible = true
                })
            },
            finish() {
                this.$refs.cropper.getCropBlob((data) => {
                    let file = new window.File([data], this.fileName, {type: 'image/jpeg'})
                    // 调用你的上传方法
                    console.log(file)
                    this.dialogVisible = false
                    this.fileName = "";
                })
            },

        }
    }
</script>
