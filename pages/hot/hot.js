Page({
  data:{
    rankType:undefined,
    rankTypes:[{
      title:'实战排行',
      type:'project'
    },{
      title:'路径排行',
      type:'path'
    }],
    periodType:undefined,
    periodTypes:[{
      name:'周',
      value:'week'
    },{
      name:'月',
      value:'month'
    }],
    currentList:[],
    // listData
    projectWeek:[],
    projectMonth:[],
    pathWeek:[],
    pathMonth:[]
  },
  onLoad(){
    wx.request({
      url: 'https://www.fastmock.site/mock/09eff2e40d061428948d568ab762c6bf/weixin/api/getRecommand',
      success:(res) => {
        const {data:{data}} = res;
        const {projectWeek,projectMonth,pathWeek,pathMonth} = data;
        this.setData({
          projectWeek,
          projectMonth,
          pathWeek,
          pathMonth
        });
        const rankType = wx.getStorageSync('rankType') || 'project';
        const periodType = wx.getStorageSync('periodType') || 'week';
        this.setData({rankType,periodType});
        this.changeCurrentList(rankType,periodType);
      }
    })
  },
  changeCurrentList(rankType,periodType){
    let currentList = [];
    if(rankType === 'project' && periodType === 'week') {
      currentList = this.data.projectWeek;
    }else if (rankType === 'project' && periodType === 'month') {
      currentList = this.data.projectMonth;
    }else if (rankType === 'path' && periodType === 'week') {
      currentList = this.data.pathWeek;
    }else {
      currentList = this.data.pathMonth;
    };
    this.setData({currentList});
  },
  handleTabChange(e) {
    const rankType = e.currentTarget.dataset.type;
    const {periodType} = this.data;
    this.setData({rankType});
    wx.setStorage({
      data: rankType,
      key: 'rankType'
    });
    this.changeCurrentList(rankType,periodType);
  },
  handlePeriodChange(e) {
    const periodType = e.currentTarget.dataset.value;
    const {rankType} = this.data;
    this.setData({periodType});
    wx.setStorage({
      key:'periodType',
      data:periodType
    });
    this.changeCurrentList(rankType,periodType);
  }
})