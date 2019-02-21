import Mock from 'mockjs';
import userAPI from './user';
import tableAPI from './table';
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch';
import transactionAPI from './transaction';

// User
Mock.mock(/\/user\/login/, 'post', userAPI.login);
Mock.mock(/\/user\/info/, 'get', userAPI.getInfo);
Mock.mock(/\/user\/logout/, 'post', userAPI.logout);

// Table
Mock.mock(/\/table\/list/, 'get', tableAPI.list);



// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList);
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle);
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv);
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle);
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle);

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser);

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList);

export default Mock;
