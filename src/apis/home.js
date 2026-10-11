/**
 * @description: 获取banner图
 * @param {*}
 * @return {*}
 */
import httpInstance from '@/utils/http'

export function getBannerAPI(params = {}) {
  // distributionSite：1 首页广告位，2 分类商品广告位
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite,
    },
  })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
  return httpInstance({
    url: '/home/new',
  })
}
/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
  return httpInstance({
    url: '/home/hot',
  })
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods',
  })
}
