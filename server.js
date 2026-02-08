const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// 关键：让服务器能访问所有静态文件（HTML/CSS/JS/图片）
app.use(express.static(__dirname));

// 根路径 → 启动页（launch.html）
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'launch.html'));
});

// 模式选择页路由（兜底，确保跳转正常）
app.get('/mode.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'mode.html'));
});

// 动态页路由
app.get('/dynamic.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'dynamic.html'));
});

// 发布页路由
app.get('/publish.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'publish.html'));
});

// 我的牧场页路由
app.get('/my-ranch.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'my-ranch.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
