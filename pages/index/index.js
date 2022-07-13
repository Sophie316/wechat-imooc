Page({
  data:{
    showIcon:true,
    swiperList:[],
    courses:[],
    typeT:'recommand',
    nav:[],
    activityImg:[]
  },
  onLoad(){
    wx.request({
      url: 'https://www.fastmock.site/mock/09eff2e40d061428948d568ab762c6bf/weixin/api/getData',
      success: (res) => {
        const { data : { data } } = res;
        const { swiperList , courses , nav ,activityImg} = data;
        this.setData({
          swiperList,
          courses,
          nav,
          activityImg
        })
      }
    })
  },
  handleCoursesTap(e){
    const {id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  handleInputChange(e) {
    const value = e.detail.value;
    this.setData({showIcon:value ? false : true})
  },
  changeType(e){
    this.setData({typeT : e.currentTarget.dataset.t});
  }
})
