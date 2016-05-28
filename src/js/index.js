/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/5/27.
 */
var Index = {
  init: function(){
    this.setUIEvent();
  },
  setUIEvent: function(){
    // 绑定 开始竞猜
    $('.footer button').on('click', function(){
      //Index.showDialog();
      window.location.href='playsong.html'
    });
  },
  // 显示弹出框
  showDialog: function(){
    $('.dialog-bg').show();
  }
};