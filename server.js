const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// 1. 先引入 cors
const cors = require('cors');

// 2. 给 Netlify 开绿灯（必须在路由之前）
app.use(cors({
  origin: 'https://grand-mandazi-22f8d5.netlify.app'
}));

// 3. 定义你的路由
app.get('/', (req, res) => {
  res.send('牛马得闲后端服务器运行正常！');
});

app.get('/api/posts', (req, res) => {
  res.json({
    success: true,
    data: [
      { name: "测试用户", text: "CORS 终于搞定啦！", likes: 0 }
    ]
  });
});

// 4. 最后才启动服务器
app.listen(port, '0.0.0.0', () => {
  console.log(`服务器运行在端口 ${port}`);
});
}));