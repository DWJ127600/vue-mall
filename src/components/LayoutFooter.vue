<template>
    <footer>
        <div class="contact">
            <el-space :size="72" :spacer="contactSpacer">
                <dl>
                    <dt>客户服务</dt>
                    <el-space size="default">
                        <dd><i class="iconfont icon-kefu"></i> 在线客服</dd>
                        <dd><i class="iconfont icon-question"></i> 问题反馈</dd>
                    </el-space>
                </dl>
                <dl>
                    <dt>关注我们</dt>
                    <el-space size="default">
                        <dd><i class="iconfont icon-weixin"></i> 公众号</dd>
                        <dd><i class="iconfont icon-weibo"></i> 微博</dd>
                    </el-space>
                </dl>
                <dl>
                    <dt>下载APP</dt>
                    <el-space size="default">
                        <dd class="qrcode"><el-image :src="qrcode" /></dd>
                        <dd class="download">
                            <p>扫描二维码</p>
                            <p>立马下载APP</p>
                            <el-button type="primary"><el-link :underline="false">下载页面</el-link></el-button>
                        </dd>
                    </el-space>
                </dl>
                <dl>
                    <dt>服务热线</dt>
                    <el-space>
                        <dd class="hotline">
                            <p>400-0000-000</p>
                            <p class="time">周一至周日 8:00-18:00</p>
                        </dd>
                    </el-space>
                </dl>
            </el-space>
        </div>
        <div class="extra">
            <div class="slogan">
                <div class="slogan-item">
                    <i class="iconfont icon-footer01"></i>
                    <span>价格亲民</span>
                </div>
                <div class="slogan-item">
                    <i class="iconfont icon-footer02"></i>
                    <span>物流快捷</span>
                </div>
                <div class="slogan-item">
                    <i class="iconfont icon-footer03"></i>
                    <span>品质新鲜</span>
                </div>
            </div>
            <el-space :size="10" :spacer="extraSpace">
                <el-link :underline="false">关于我们</el-link>
                <el-link :underline="false">帮助中心</el-link>
                <el-link :underline="false">售后服务</el-link>
                <el-link :underline="false">配送与验收</el-link>
                <el-link :underline="false">商务合作</el-link>
                <el-link :underline="false">搜索推荐</el-link>
                <el-link :underline="false">友情链接</el-link>
            </el-space>
            <p>CopyRight © 旺旺商城</p>
        </div>
    </footer>
</template>

<script setup lang="ts">
import qrcode from '@/assets/images/qrcode.jpg'
import { h } from 'vue'

const contactSpacer = h('div', {
    style: {
        width: '1px',
        height: '190px',
        backgroundColor: '#ededed',
    },
})
const extraSpace = h('div', {
    style: {
        width: '1px',
        height: '20px',
        backgroundColor: '#999',
    },
})
</script>

<style scoped lang="scss">
.contact {
    margin: 0 125px;
    padding: 40px 25px;

    .el-space {
        width: 100%;
        justify-content: center;

        dl {
            // height: 190px;
            text-align: center;
            color: #999;

            dt {
                font-size: 18px;
            }

            .el-space {
                margin-top: 36px;

                dd {
                    width: 92px;
                    height: 92px;
                    border: 1px solid #ededed;
                    padding-top: 10px;

                    .iconfont {
                        font-size: 36px;
                        display: block;
                    }
                }

                .qrcode {
                    padding: 7px;
                }

                .download {
                    border: none;
                    width: auto;
                    height: auto;
                    padding-top: 5px;

                    .el-button {
                        padding: 10px 25px;
                        margin-top: 5px;

                        .el-link {
                            color: #fff;
                        }
                    }
                }

                .hotline {
                    border: none;
                    font-size: 22px;
                    color: #666;
                    width: auto;
                    height: auto;
                    padding-top: 20px;

                    .time {
                        font-size: 15px;
                        color: #999;
                    }
                }
            }
        }
    }
}

.extra {
    background-color: #333;
    padding: 0 125px 20px;

    .slogan {
        padding: 50px 100px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #434343;

        .slogan-item {
            color: #fff;
            font-size: 28px;

            i {
                font-size: 50px;
                vertical-align: middle;
                margin-right: 10px;
            }
        }
    }

    .el-space {
        margin: 40px 0 20px;
        width: 100%;
        justify-content: center;

        .el-link {
            font-size: 15px;
            color: #999;
        }
    }

    p {
        font-size: 15px;
        color: #999;
        text-align: center;
    }
}
</style>
