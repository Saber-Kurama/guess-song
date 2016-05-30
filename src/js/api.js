/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/5/28.
 */
// 返回一个 promise(jquery版本的). 支持 restful 接口
+function($) {
  var api = {};
  // 普通的post的请求
  var postRequest = function(opts) {
    return function(data) {
      return $.ajax({
        type: 'POST',
        url: opts.url,
        dataType: 'json',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
      }).then(function(data) {
        return data;
      }, function(data) {
        return data;
      });
    }
  };
  // 解析get参数
  var getParament = function(data) {
    var formBody = [];
    for (var property in data) {
      var encodeKey = encodeURIComponent(property);
      var encdeeValue = encodeURIComponent(data[property]);
      formBody.push(encodeKey + '=' + encdeeValue);
    }
    formBody = formBody.join('&');
    return formBody;
  };
  // 普通的get的请求
  var getRequest = function(opts) {
    /*
     *  关于get的请求参数,假设有一个 getuser的请求,它的url是'/getuser'
     *  1. api.getuser()   没有参数
     *   请求地址是'/getuser'
     *  2. api.getuser('saber') 有一个参数,但是参数类型为数组
     *   请求地址是'/getuser/saber'
     *  3. api.getuser({name:'saber'}) 请求参数 是一个数组
     *   请求地址是'/getuser?name=saber';
     *  4. api.getuser('saber','huoying') 请求是多个参数,最后一个参数是字符串
     *   请求地址是'/getuser/saber/huoying'
     *  5. api.getuser('saber', {name:huoying}) 最后一个参数是对象
     *   请求的地址是'/getuser/saber?name=huoying'
     *  4,5 是为了一些比较特殊的restfulapi的
     */
    return function() {
      var url = opts.url;
      if (arguments.length == 0) {
      } else if (arguments.length == 1) {
        if (typeof arguments[0] == 'string') {
          url += '/' + arguments[0]
        } else {
          url += '?' + getParament(arguments[0])
        }
      } else if (arguments.length > 1) {
        var argArry = Array.prototype.slice.call(arguments);
        if (typeof arguments[arguments.length - 1] == 'string') {
          var tempurl = argArry.join('/');
          url += tempurl;
        } else {
          var data = argArry[argArry.length - 1];
          argArry = argArry.splice(0, argArry.length - 1);
          var tempurl = argArry.join('/');
          url = url + '/' + tempurl + '?' + getParament(data);
        }
      }
      return $.ajax({
        type: 'GET',
        url: url
      }).then(function(data) {
        return data;
      }, function(data) {
        return data;
      });
    }
  };
  // 普通的put的请求
  var putRequest = function(opts) {
    return function() {
      if (arguments.length < 2) {
        return;
      }
      var argArry = Array.prototype.slice.call(arguments);
      var data = argArry[argArry.length - 1];
      argArry = argArry.splice(0, argArry.length - 1);
      var tempurl = argArry.join('/');
      return $.ajax({
        type: 'PUT',
        url: opts.url + '/' + tempurl,
        dataType: 'json',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
      }).then(function(data) {
        return data;
      }, function(data) {
        return data;
      });
    }
  };
  // 普通的delete的请求
  var deleteRequest = function(opts) {
    return function(id) {
      return $.ajax({
        type: 'DELETE',
        url: opts.url + '/' + id,
        dataType: 'json',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8"
      }).then(function(data) {
        return data;
      }, function(data) {
        return data;
      });
    }
  };
  for (var i = 0; i < apiConfig.length; i++) {
    //api[apiConfig[i].name] =
    if (apiConfig[i].method == 'post') {
      api[apiConfig[i].name] = postRequest(apiConfig[i]);
    } else if (apiConfig[i].method == 'get') {
      api[apiConfig[i].name] = getRequest(apiConfig[i]);
    } else if (apiConfig[i].method == 'put') {
      api[apiConfig[i].name] = putRequest(apiConfig[i]);
    } else if (apiConfig[i].method == 'delete') {
      api[apiConfig[i].name] = deleteRequest(apiConfig[i]);
    }
  }
  window.appApi = api;
}(jQuery);
