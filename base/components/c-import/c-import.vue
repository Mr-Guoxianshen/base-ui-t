<template>
    <div class="import-box">
        <div class="import-box-header bg m-b-20">
            <span class="title">注意事项：</span>
            <div class="description-text bg m-t-5">
                <p v-for="(text, index) in computedDescriptionList" :key="index">
                    <span class="key">{{text.key + '：'}}</span>
                    <span>
                        {{text.value}}
                        <span class="require">{{'(' + text.requireInfo + ')'}}</span>
                    </span>
                </p>
            </div>
        </div>
        <div class="import-box-main m-b-10">
            <div class="step-box" :style="{ width: stepWidth }">
                <el-steps align-center>
                    <el-step>
                        <template slot="title">
                            <span class="title-text">下载{{options.importTitle ? (options.importTitle + '导入') : '导入' }}模板，填写资料信息</span>
                            <div class="step-child-box">
                                <span>
                                    <el-button type="primary"
                                               size="small"
                                               :disabled="isDisabled"
                                               @click="downloadTemplate">下载
                                </el-button>
                                </span>
                            </div>
                        </template>
                    </el-step>
                    <el-step>
                        <template slot="title">
                            <span class="title-text">上传填写好的{{ options.importTitle || '资料' }}表</span>
                            <div class="step-child-box">
                                <el-upload
                                    action
                                    :on-change="handleChange"
                                    :auto-upload="false"
                                    :show-file-list="false"
                                    :file-list="fileList"
                                >
                                    <el-progress v-if="options.showProgress"
                                                 :percentage="progress"
                                                 :stroke-width="4"
                                                 :color="customColorMethod"></el-progress>
                                    <el-button size="small" :disabled="isDisabled" type="primary">点击上传</el-button>
                                </el-upload>
                            </div>
                        </template>
                    </el-step>
                    <el-step v-if="options.errorFilePath">
                        <template slot="title">
                            <span class="title-text">下载错误文件，检查更改后重新上传</span>
                            <div class="step-child-box">
                                <span>
                                    <el-button type="primary" size="small" @click="downloadErrorFile" :disabled="isDisabled">下载错误文件
                                    </el-button>
                                </span>
                            </div>
                        </template>
                    </el-step>
                </el-steps>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "import-box",
        props: {
            // options 可含参数 { progress, importTitle, showProgress, errorFilePath, descriptionList }
            options: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                fileList: [],
                descriptionList: [],
            }
        },
        computed: {
            stepWidth() {
                return (this.options && this.options.errorFilePath) ? '100%' : '66.6666%';
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
                this.fileList = [{name: file.name}];
                this.$emit("handleChange", {file, fileList});
            },
            downloadTemplate() {
                this.$emit("downloadTemplate");
            },
            downloadErrorFile() {
                this.$emit("downloadErrorFile");
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
            .el-step__line {
                height: 1px;
                background-color: rgba(42,142,255,.5);
                top: 50%;
                left: 70%;
                right: -30%;
                transform: translateY(-50%);
            }
            .el-step__icon {
                height: 40px;
                width: 40px;
                border: 1px solid rgba(42, 142, 255, .5);
                .el-step__icon-inner {
                    font-size: 20px;
                    font-weight: 600;
                    color: #2A8EFF;
                    line-height: 28px;
                }
            }

            .title-text {
                color: #000000;
                font-size: 14px;
            }

            .el-upload {
                width: 100%;
                text-align: center;
                line-height: 1;
                .el-progress {
                    width: 80%;
                    display: inline-block;
                    margin-bottom: 10px;
                }
            }

            .el-upload-list {
                .el-upload-list__item:first-child {
                    margin-top: 5px;
                }
            }
        }
    }
</style>
<style lang="scss" scoped>
    .import-box {
        .m-t-5 {
            margin-top: 5px;
        }

        .m-b-10 {
            margin-bottom: 10px;
        }

        .m-b-20 {
            margin-bottom: 20px;
        }

        .m-r-20 {
            margin-right: 20px;
        }

        .import-box-header {
            padding: 20px;

            &.bg {
                background-color: #F8F8F8;
                color: #888888;
            }

            .title {
                font-size: 16px;
                font-weight: 600;
                color: rgba(51, 51, 51, 1);
                line-height: 22px;
            }

            .description-text {
                font-size: 14px;
                color: rgba(136, 136, 136, 1);
                line-height: 26px;

                > p {
                    margin: 0;
                    padding: 0;
                    display: flex;
                }

                .key {
                    min-width: 100px;
                }

                .require {
                    color: #555555;
                }
            }
        }

        .import-box-main {
            .step-box {
                > div {
                    text-align: center;
                }
                .step-child-box {
                    height: 59px;
                    display: flex;
                    flex-direction: column-reverse;
                }
            }
        }
    }
</style>
