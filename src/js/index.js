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
    this.setNoRedDialogUI();
    this.setHasRedDialogUI();
  },
  setUIEvent: function(){
    // 绑定 开始竞猜
    $('.footer button').on('click', function(){
      // 获取当前用户的红包数量 (至于是不是后台获取的就要自己写了)
      appApi.getRedPackage().then(function(data){
        // 还有红包
        if(data.num > 0){
          Index.showHasRedPGDialog();
        }else{ // 没有红包了
          Index.showNoRedPGDialog();
        }
      });
    });

  },
  setNoRedDialogUI: function(){
    // 绑定 立即邀请
    $('#inviteBtn').on('click', function(){

    });

    // 绑定 退出竞猜
    $('#quitGuessBtn').on('click', function(){
      Index.hideNoRedPGDialog();
    });

  },
  // 显示 没有红包 弹出框
  showNoRedPGDialog: function(){
    $('#noredpg').show();
  },
  // 隐藏 没有红包 弹出框
  hideNoRedPGDialog: function(){
    $('#noredpg').hide();
  },
  // 绑定 UI
  setHasRedDialogUI: function(){
    // 绑定 立即参与
    $('#playerBtn').on('click', function(){
      // 跳转到 转盘 页面 (这个地方应该会有一个 消耗一个红包链的请求?)
      window.location.href = 'turntable.html';
    });

    // 绑定 暂不参与
    $('#noPlayerBtn').on('click', function(){
      Index.hideHasRedPGDialog();
    });
  },
  // 显示 有红包 弹出框
  showHasRedPGDialog: function(){
    $('#hasredpg').show();
  },
  // 隐藏 有红包 弹出框
  hideHasRedPGDialog: function(){
    $('#hasredpg').hide();
  },
};