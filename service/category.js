import request from './network.js'

export function getCategoryData() {
  return request({
    url: '/category'
  })
}

export function getSubcategoryData(maitKey) {
  return request({
    url: '/subcategory',
    data: {
      maitKey
    }
  })
}