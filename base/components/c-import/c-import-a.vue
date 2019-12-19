<template>
    <div class="import-box">
        <div class="import-box-header m-b-20">
            <span>注意事项：</span>
            <div class="description-text bg m-t-5">
                <p v-for="(text, index) in computedDescriptionList" :key="index">{{ text }}</p>
            </div>
        </div>
        <div class="import-box-main m-b-10">
            <div class="step-box" :style="{ height: stepHeight }">
                <el-steps direction="vertical">
                    <el-step>
                        <template slot="title">
                            <span class="title-text m-r-20">下载{{options.importTitle ? (options.importTitle + '导入') : '导入' }}模板，填写资料信息</span>
                            <el-button type="primary"
                                       size="small"
                                       :disabled="isDisabled"
                                       @click="downloadTemplate">下载范本</el-button>
                        </template>
                    </el-step>
                    <el-step>
                        <template slot="title">
                            <div class="upload-container">
                                <span class="title-text m-r-20">上传填写好的{{ options.importTitle || '资料' }}表</span>
                                <el-upload
                                    action
                                    :on-change="handleChange"
                                    :auto-upload="false"
                                    :show-file-list="true"
                                    :file-list="fileList"
                                >
                                    <el-button size="small" :disabled="isDisabled" type="primary">选择文件</el-button>
                                </el-upload>
                            </div>
                        </template>
                    </el-step>
                    <el-step v-if="options.errorFilePath">
                        <template slot="title">
                            <span class="title-text m-r-20">下载错误文件，检查更改后重新上传</span>
                            <el-button type="primary" size="small" @click="downloadFile" :disabled="isDisabled">下载错误说明</el-button>
                        </template>
                    </el-step>
                </el-steps>
            </div>
        </div>
        <el-progress :percentage="options.progress" v-if="options.showProgress" :color="customColorMethod"></el-progress>
    </div>
</template>

<script>
export default {
    name: "import-box",
    props: {
        // options 可含参数 { progress, importTitle, showProgress, errorFilePath, descriptionList }
        options: Object,
    },
    data() {
        return {
            fileList: [],
            descriptionList: ['为保障数据安全，错误数据文件下载有效期为5分钟', '请在5分钟内点击“下载错误说明文件”按钮，下载错误文件']
        }
    },
    computed: {
        stepHeight() {
            return (this.options && this.options.errorFilePath) ? '240px' : '160px';
        },
        isDisabled() {
            return this.progress > 0 && this.progress < 100;
        },
        computedDescriptionList() {
            return this.options.descriptionList || this.descriptionList;
        },
    },
    methods: {
        handleChange(file, fileList) {
            this.fileList = [{ name: file.name }];
            this.$emit("handleChange", { file, fileList });
        },
        downloadTemplate() {
            this.$emit("downloadTemplate");
        },
        downloadFile() {
            this.$emit("downloadFile");
        },
        customColorMethod(percentage) {
            if (percentage < 100 && percentage >= 0) {
                return "#409EFF";
            } else if ((percentage = 100)) {
                if (this.options && this.options.errorFilePath) {
                    return "#F56C6C";
                } else {
                    return "#67C23A";
                }
            }
        }
    }
};
</script>

<style lang="scss">
.import-box {
    .step-box {
        .title-text {
            color: #000000;
            font-size: 14px;
        }
        .upload-container {
            .el-upload {
                text-align: left;
            }
            .el-upload-list {
                .el-upload-list__item:first-child {
                    margin-top: 5px;
                }
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.import-box {
    .import-box-header {
        .description-text {
            font-size: 12px;
            line-height: 1.8;
            padding: 5px 10px;

            &.bg {
                border: 1px solid #FFE58F;
                background-color: #FFFBE6;
                color: #5A5A5A;
            }
        }
    }
    .import-box-main {
        .step-box {
            .upload-container {
                display: flex;
                line-height: 32px;
                > div {
                    display: flex;
                }
            }
        }
    }
}
</style>