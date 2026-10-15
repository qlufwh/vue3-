<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getBannerAPI } from '@/apis/home';
import { getTopCategoryAPI } from "@/apis/category";
import GoodsItem from "../Home/components/GoodsItem.vue";
import { onBeforeRouteUpdate } from "vue-router";
const categoryData = ref({});
const bannerList = ref([]);
// setup 中用 useRoute() 拿当前路由，等价于选项式的 this.$route
const route = useRoute();

// 按路由参数 id 获取当前一级分类数据（面包屑名称等）
const getCategory = async (id = router.params.id) => {
    const res = await getTopCategoryAPI(id);
    categoryData.value = res.result;
};

// 分类页轮播：必须传 distributionSite: '2'，否则接口默认 '1' 会返回首页广告
// 注意：当前测试接口 1 和 2 是同一组图、顺序不同，首张不一样就算生效（Network 里应看到 ?distributionSite=2）
const getBanner = async () => {
    const res = await getBannerAPI({
        distributionSite: '2'
    })
    bannerList.value = res.result
}
onMounted(() => {
    getCategory();
    getBanner();
});
onBeforeRouteUpdate((to) => {

    getCategory(to.params.id);
})


// 头部导航切换 /category/:id 时，组件会被复用，onMounted 不会再次执行
// 必须监听 id 变化，重新请求分类数据
watch(() => route.params.id, () => getCategory());
</script>

<template>
    <div class="top-category">
        <div class="container m-top-20">
            <!-- 面包屑 -->
            <div class="bread-container">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 轮播图 -->
            <div class="home-banner">
                <el-carousel height="500px">
                    <el-carousel-item v-for="item in bannerList" :key="item.id">
                        <img :src="item.imgUrl" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="sub-list">
                <h3>全部分类</h3>
                <ul>
                    <li v-for="i in categoryData.children" :key="i.id">
                        <RouterLink to="/">
                            <img :src="i.picture" />
                            <p>{{ i.name }}</p>
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
                <div class="head">
                    <h3>- {{ item.name }}-</h3>
                </div>
                <div class="body">
                    <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.home-banner {
    width: 1240px;
    height: 500px;
    margin: 0 auto;

    img {
        width: 100%;
        height: 500px;
    }
}

.top-category {
    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }

    .sub-list {
        margin-top: 20px;
        background-color: #fff;

        ul {
            display: flex;
            padding: 0 32px;
            flex-wrap: wrap;

            li {
                width: 168px;
                height: 160px;


                a {
                    text-align: center;
                    display: block;
                    font-size: 16px;

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    p {
                        line-height: 40px;
                    }

                    &:hover {
                        color: $xtxColor;
                    }
                }
            }
        }
    }

    .ref-goods {
        background-color: #fff;
        margin-top: 20px;
        position: relative;

        .head {
            .xtx-more {
                position: absolute;
                top: 20px;
                right: 20px;
            }

            .tag {
                text-align: center;
                color: #999;
                font-size: 20px;
                position: relative;
                top: -20px;
            }
        }

        .body {
            display: flex;
            justify-content: space-around;
            padding: 0 40px 30px;
        }
    }

    .bread-container {
        padding: 25px 0;
    }
}
</style>