const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// 让服务器能访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）
app.use(express.static(path.join(__dirname, '.')));

// 根路径 → 自动重定向到启动页
app.get('/', (req, res) => {
  res.redirect('/launch.html');
});

// 其他页面路由（兜底）
app.get('/mode.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'mode.html'));
});
app.get('/dynamic.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'dynamic.html'));
});
app.get('/publish.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'publish.html'));
});
app.get('/my-ranch.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'my-ranch.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器跑起来了，端口: ${PORT}`);
});
