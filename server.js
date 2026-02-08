const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// 让服务器能访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）// 允许服务器访问所有静态文件（HTML/CSS/JS/图片）
app.use(express.static(path.join(__dirname, '.')));

// 根路径 → 启动页（launch.html）
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'launch.html'));
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
  console.log(`服务器运行在端口 ${PORT}`);
});
