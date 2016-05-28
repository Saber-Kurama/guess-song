/* ************************************************************************** */
/*                                                                            */
/* 每位工程师都有保持代码优雅和整洁的义务                                             */
/*                                                                            */
/* ************************************************************************** */
/**
 * Created by saber on 16/5/28.
 */
var baseApiUrl = '';
var apiConfig = [
  {
    name: 'getRedPackage', // 方法名 唯一
    method: 'get',
    url: baseApiUrl + 'json/getRedPackage.json',
    desc: '获取用户剩余红包的接口'
  },
  {
    name: 'getStarList',
    method: 'get',
    url: baseApiUrl+'json/getStarList.json',
    desc: '获取 转盘 中12位明星的信息'
  },
  {
    name:'getRandomNumber',
    method: 'get',
    url: baseApiUrl + 'json/getRandomNumber.json',
    desc: '获取 选择明星的随机数'
  }
]