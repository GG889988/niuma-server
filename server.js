// 引入 express 框架
const express = require('express');
const app = express();
// 端口号：优先用 Railway 提供的环境变量，没有就用 3000
const port = process.env.PORT || 3000;

// 1. 引入 cors 并配置（允许前端域名访问）
const cors = require('cors');
app.use(cors({
  origin: 'https://grand-mandazi-22f8d5.netlify.app'
}));

// 2. 根路由：测试服务器是否正常
app.get('/', (req, res) => {
  res.send('牛马得闲后端服务器运行正常！');
});

// 3. 业务路由：返回帖子数据
app.get('/api/posts', (req, res) => {
  res.json({
    success: true,
    data: [
      { name: "测试用户1", text: "终于解决语法错误啦！", likes: 0 },
      { name: "测试用户2", text: "前后端终于能通信了～", likes: 5 }
    ]
  });
});

// 4. 启动服务器（最后执行）
app.listen(port, '0.0.0.0', () => {
  console.log(`服务器成功启动，运行在端口 ${port}`);
});