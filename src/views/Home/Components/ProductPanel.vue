<template>
    <div class="container">
        <div class="heading">
            <!-- 主标题和副标题 -->
            <h3>
                {{ title }}<small>{{ subTitle }}</small>
            </h3>
        </div>
        <!-- 主体内容区域 -->
        <!--      <div> 主体内容 </div>-->
        <slot />
    </div>
</template>

<script setup lang="ts">
interface Props {
    title?: string
    subTitle?: string
}

withDefaults(defineProps<Props>(), {
    title: '',
    subTitle: '',
})
</script>

<style scoped lang='scss'>
.heading {
    padding: 40px 6px;

    h3 {
        font-size: 32px;
        font-weight: normal;

        small {
            font-size: 16px;
            color: #999;
            margin-left: 20px;
        }
    }
}
</style>