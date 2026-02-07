const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('牛马得闲后端服务器运行正常！');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`服务器运行在端口 ${port}`);
});
const cors = require('cors');
app.use(cors({
  origin: 'https://grand-mandazi-22f8d5.netlify.app'
}));