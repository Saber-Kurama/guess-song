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
  },
  // 初始 明星 头像
  initStarHead:function(){
    // 获取 12 位明星的信息
    appApi.getStarList()
        .then(function(data){
          alert(data)
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
                  'style="background-image:url('+data.img+')">'+
                '</div></div>';
    return html;
  }
}
