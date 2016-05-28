/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/5/29.
 */
var PlaySong = {
  init: function() {
    var starId = this.getParameterByName('starId');
    this.initStar(starId);
  },
  initStar:function(id){
    appApi.getStarById({
      starId: id
    }).then(function(data){
      if(data.name){
        PlaySong.renderTop(data);
        PlaySong.renderSongList(data);
      }

    });

  },
  getParameterByName: function(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  },
  initSongList:function(){

  },
  // 渲染头部
  renderTop:function(data){
    $('.play-top .name').text(data.name);
    $('.play-top .avatar').css({
      'background-image': "url('"+data.image+"')"
    });
  },
  // 渲染列表
  renderSongList: function(data){
    var songHtml = '';
    for(var i = 0; i< data.songlist.length; i++){
      songHtml += PlaySong.renderSongItem(data.songlist[i], i);
    }
    $('.play-list').html(songHtml);
    PlaySong.setUIEvent();
    PlaySong.setPlayUIEvent();
  },
  // 渲染一条
  renderSongItem: function(data, index){
    var chooseHtml = '';
    for(var m =0; m < data.names.length; m++){
      chooseHtml += PlaySong.renderChooseItem(data.names[m], index);
    }
    // 没有使用模板 拼接dom 很痛苦
    var html = '<div class="play-item">'+
                  '<div class="audio-wrapper">'+
                    '<div class="audio-bg">'+
                      '<audio' + ' src="'+data.songurl+'"></audio>'+
                      '<div class="inlineb audio-time-elapsed">00:00</div>'+
                      '<div class="inlineb audio-progress-bar-wrapper">'+
                        '<div class="audio-progress-bar">'+
                          '<div class="audio-progress-bar-played"></div></div>'+
                        '<div class="audio-progress-bar-pointer-wrapper">'+
                          '<span class="audio-progress-bar-pointer">'+
                            '<div class="pointer-dot rv-center"></div>' +
                          '</span></div> </div>'+
                      '<div class="inlineb audio-time-total">'+data.totaltext+'</div>'+
                      '<div class="inlineb dividers"></div>'+
                      '<div class="inlineb audio-btn-wrapper">'+
                        '<button class="btn" data-action="play"'+
                          'data-num="'+index+'" ><span></span></button></div>'+
                  '</div></div>'+
                  '<div class="choose-wrapper">' +chooseHtml+

                  '</div></div>';

    return html;

  },
  renderChooseItem:function(data, i){
    var html = '<div class="choose-item">'+
                  '<label>'+data.value +
                    '<input type="radio" class="checkbox" value="'+data.key+
                      '" name="music"'+i+' />'+
                  '</label></div>';
    return html;
  },

  // 绑定UI事件
  setUIEvent: function(){
    //因为是 radio 所以 只要一点击
    $('.choose-item .checkbox').on('click', function(){
      var ish = $(".playsong-footer > .btn").prop('disabled');
      if(ish){
        $('.playsong-footer > .btn').prop('disabled', false);
      }
      // 开启倒计时
      PlaySong.startTimer();
    });

    // 绑定 提交 按钮的事件
    $('.playsong-footer > .btn').on('click',function(){
      if(PlaySong.timer){
        clearTimeout(PlaySong.timer);
      }
      PlaySong.stopAll();
    });
  },
  time: 60, // 倒计时的时长
  timer:null,
  // 开始倒计时
  startTimer: function(){
    PlaySong.timer = setTimeout(function(){
      var time = (PlaySong.time--) >= 10 ? PlaySong.time: '0'+(PlaySong.time);
      $('.play-top .info .sec').text(time);
      if(time =='00'){
        clearTimeout(PlaySong.timer);
        PlaySong.showTimeoutTips();
      }else{
        PlaySong.startTimer();
      }
    },1000);
  },
  showTimeoutTips: function(){
    $('#timeout').show();
    //var time = setTimeout(function(){
    //  clearTimeout(time);
    //  $('#timeout').hide();
    //},3000);
  },


  /******
   *   播放器的事件
   */
  audiotimers:{

  },
  audios:[],
  setPlayUIEvent: function(){

    //绑定 播放 事件的按钮
    $('.audio-btn-wrapper .btn').on('click', function(){
      var ish = $(".playsong-footer > .btn").prop('disabled');
      if(ish){
        $('.playsong-footer > .btn').prop('disabled', false);
      }
      // 添加 如果 播放 倒计时 也开始
      if(!PlaySong.timer){
        PlaySong.startTimer();
      }
      // 播放事件
      var domAudio = $(this).parent().parent().find('audio')[0];
      var mark = $(this).data('num');
      // 暂停
      if($(this).hasClass('action')){
        $(this).removeClass('action');
        PlaySong.pause(domAudio, mark);
      }else{
        $(this).addClass('action');
        PlaySong.play(domAudio, mark);
      }
    });
  },
  // 开始播放
  play:function(domAudio, mark){
    domAudio.play();
    if(PlaySong.audiotimers[mark]){
      clearInterval(PlaySong.audiotimers[mark]);

    }
    PlaySong.audiotimers[mark] =setInterval(function(){
      PlaySong.run(domAudio, mark);
      PlaySong.audios[parseInt(mark)] = domAudio;
    } , 50 );

  },
  pause: function(domAudio, mark){
    domAudio.pause();
    clearInterval(PlaySong.audiotimers[mark]);

  },
  stop: function(domAudio, mark){
    domAudio.pause();
    clearInterval(PlaySong.audiotimers[mark]);
    domAudio.currentTime = 0;
    PlaySong.animateProgressBarPosition(domAudio);
    PlaySong.updateElapsedTime(domAudio);
    $(domAudio).parent().find('.audio-btn-wrapper .btn').removeClass('action')
  },
  stopAll: function(){
    for(var i = 0; i < PlaySong.audios.length; i++){
      if(PlaySong.audios[i]){
        PlaySong.stop(PlaySong.audios[i], i);
      }
    }
  },
  run: function(domAudio,mark){
    //clearInterval(self.timer);
    //self.timer = setInterval( self.run.bind(self), 50 );
    //var self = this;
    //
    PlaySong.animateProgressBarPosition(domAudio);
    PlaySong.updateElapsedTime(domAudio);
    //
    if(domAudio.ended){
      PlaySong.stop(domAudio, mark);
    }
  },
  animateProgressBarPosition:function(domAudio){
    var percentage  = (domAudio.currentTime * 100 / domAudio.duration) + "%";
    var styles      = { "width": percentage };
    $(domAudio).parent().find('.audio-progress-bar-played').css(styles);
    $(domAudio).parent().find('.audio-progress-bar-pointer-wrapper').css(styles);
  },
  updateElapsedTime: function(domAudio){
    var time = domAudio.currentTime;
    var minutes   = PlaySong.getAudioMinutes(time);
    var seconds   = PlaySong.getAudioSeconds(time);

    var audioTime = minutes + ":" + seconds;
    $(domAudio).parent().find('.audio-time-elapsed').text(audioTime);

  },
  getAudioSeconds: function(string)
  {
    var self    = this,
        string  = string % 60;
    string  = self.addZero( Math.floor(string), 2 );

    (string < 60) ? string = string : string = "00";

    return string;
  },

  getAudioMinutes: function(string)
  {
    var self    = this,
        string  = string / 60;
    string  = self.addZero( Math.floor(string), 2 );

    (string < 60) ? string = string : string = "00";

    return string;
  },
  addZero: function(word, howManyZero)
  {
    var word = String(word);

    while(word.length < howManyZero) word = "0" + word;

    return word;
  },

  removeZero: function(word, howManyZero)
  {
    var word  = String(word),
        i     = 0;

    while(i < howManyZero)
    {
      if(word[0] === "0") { word = word.substr(1, word.length); } else { break; }

      i++;
    }

    return word;
  },
};