/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/5/28.
 */
var Turntable = {
  init: function(){
    this.initStarHead();
    this.setUIEvent();
  },
  // 初始 明星 头像
  initStarHead:function(){
    // 获取 12 位明星的信息
    appApi.getStarList()
        .then(function(data){
          if(data.json){
            var htmlstr = "";
            for(var i = 0; i < data.json.length; i++){
              htmlstr += Turntable.renderHeadItem(data.json[i]);
            }
            $('#turntable .rotate').html(htmlstr)
          }else{

          }

        });
  },
  // 渲染 一条 明星头像
  renderHeadItem: function(data){

    var html = '<div class="prize">'+
                '<div class="avatar"  ' +
                  'style="background-image:url(\''+data.img+'\')">'+
                '</div><div class="mask"></div></div>';
    return html;
  },
  // 绑定一些UI事件
  setUIEvent: function(){
    // 开始转盘 按钮事件
    $('#turntable .pointer').on('click', function(){
      // 获取随机数
      appApi.getRandomNumber().then(function(data){
        console.log(data);
        if(data.number){
          Turntable.rotateNumber = data.number;
          // 这个数据 不一定从这个接口获取(需要视后端而定)
          Turntable.data = data;
        }
      });
      //开始旋转
      Turntable.startRotate();

    });

    // 最后结果 点击 明星头像的 跳转到 音乐猜题列表界面(可能不是这个流程)
    $('#turntable .head-bg .head').on('click', function(){
      window.location.href = 'playsong.html?starId='+ Turntable.data.id;
    })
  },
  rotateTimer: null,
  rotateSpeed: 5,
  rotateCircle: 5,
  rotateNumber: -1, // -1; 假设 随机数 是 1-12;
  startRotate: function() {
     // 注释掉  setInterval 换成 requestAnimationFrame 来提高下性能
    //if (!Turntable.rotateTimer) {
    //  var deg = 0, iSpeed = 10;
    //  var arr = [360, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
    //  Turntable.rotateTimer = setInterval(function(){
    //    deg += iSpeed;
    //    if(deg >= 360){
    //      deg = deg % 360;
    //      Turntable.rotateCircle--;
    //      Turntable.rotateCircle <= 0 && Turntable.rotateNumber != -1
    //      && (iSpeed *= 0.7);
    //    }
    //    if(Turntable.rotateNumber !== -1 &&
    //        Turntable.rotateCircle <= 0 && Math.abs(arr[Turntable.rotateNumber] - deg) <= iSpeed){
    //      clearInterval(Turntable.rotateTimer);
    //      deg = arr[Turntable.rotateNumber];
    //      var timer = setTimeout(function(){
    //        clearTimeout(timer);
    //        Turntable.completeRotate();
    //      }, 1000);
    //    }
    //    $('#turntable .pointer-wrapper').css({
    //      'transform': 'rotate('+ deg +'deg)',
    //      'webkitTransform': 'rotate('+ deg +'deg)',
    //      'mozTransform': 'rotate('+ deg +'deg)'
    //    });
    //    $('#turntable .pointer > span').css({
    //      'transform': 'rotate('+ -deg +'deg)',
    //      'webkitTransform': 'rotate('+ -deg +'deg)',
    //      'mozTransform': 'rotate('+ -deg +'deg)'
    //    });
    //
    //  }, Turntable.rotateSpeed);
    //}
    if (!Turntable.rotateTimer) {
      Turntable.animateRotate(0);
    }
  },
  animateRotate:function(deg){
      // 后续修改 css3 的动画试试
      Turntable.rotateTimer = {};
      var iSpeed = 10;
      var arr = [360, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
        deg += iSpeed;
        if(deg >= 360){
          deg = deg % 360;
          Turntable.rotateCircle--;
          Turntable.rotateCircle <= 0 && Turntable.rotateNumber != -1
          && (iSpeed *= 0.7);
        }
        if(Turntable.rotateNumber !== -1 &&
            Turntable.rotateCircle <= 0 &&
            Math.abs(arr[Turntable.rotateNumber] - deg) <= iSpeed){
          Turntable.rotateTimer = null;
          deg = arr[Turntable.rotateNumber];
          var timer = setTimeout(function(){
            clearTimeout(timer);
            Turntable.completeRotate();
          }, 600);
        }else {

          requestAnimationFrame(function() {
            Turntable.animateRotate(deg)
          });
        }
    $('#turntable .pointer-wrapper').css({
      'transform': 'rotate(' + deg + 'deg)',
      'webkitTransform': 'rotate(' + deg + 'deg)',
      'mozTransform': 'rotate(' + deg + 'deg)'
    });
    $('#turntable .pointer > span').css({
      'transform': 'rotate(' + -deg + 'deg)',
      'webkitTransform': 'rotate(' + -deg + 'deg)',
      'mozTransform': 'rotate(' + -deg + 'deg)'
    });
    $('#turntable .head-bg > .head').css({
      'transform': 'rotate(' + -deg + 'deg)',
      'webkitTransform': 'rotate(' + -deg + 'deg)',
      'mozTransform': 'rotate(' + -deg + 'deg)'
    });

  },
  // 旋转完成之后
  completeRotate:function() {
    // 歌手名称Image
    $('#turntable .starname').text(Turntable.data.name);
    // 歌手头像
    $('#turntable .head-bg > .head').css(
        {'background-image': "url('"+Turntable.data.image+"')"})
    $('#turntable').addClass('active');
  }
}
