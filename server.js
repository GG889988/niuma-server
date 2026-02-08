// 引入需要的工具包
const express = require('express');
const cors = require('cors');

// 创建App实例
const app = express();
// 设置端口（Railway会自动识别PORT环境变量）
const PORT = process.env.PORT || 3000;

// 解决跨域问题（允许前端域名访问）
app.use(cors({
  origin: 'https://grand-mandazi-22f8d5.netlify.app'
}));

// 解析JSON请求体（发布帖子需要）
app.use(express.json());

// 临时存储帖子（下一步会换成数据库，现在先存内存里）
let posts = [
  { id: 1, name: '测试用户', text: '测试牛马', likes: 0, created_at: new Date().toISOString() },
  { id: 2, name: '匿名用户', text: '疲惫的骆驼', likes: 0, created_at: new Date().toISOString() }
];

// 接口1：获取所有帖子
app.get('/api/posts', (req, res) => {
  res.json({
    success: true,
    data: posts
  });
});

// 接口2：发布新帖子
app.post('/api/posts', (req, res) => {
  const { name, text } = req.body;
  
  // 验证内容不能为空
  if (!text) {
    return res.json({
      success: false,
      message: '帖子内容不能为空'
    });
  }

  // 创建新帖子（自动生成ID）
  const newPost = {
    id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
    name: name || '匿名用户',
    text: text,
    likes: 0,
    created_at: new Date().toISOString()
  };

  // 添加到帖子列表
  posts.push(newPost);

  // 返回成功结果
  res.json({
    success: true,
    data: newPost
  });
});

// 接口3：给帖子点赞（核心！解决你点赞失败的问题）
app.put('/api/posts/:id/like', (req, res) => {
  // 获取帖子ID
  const postId = parseInt(req.params.id);
  // 找到对应帖子
  const post = posts.find(p => p.id === postId);

  // 如果帖子存在，点赞数+1
  if (post) {
    post.likes += 1;
    res.json({
      success: true,
      data: post
    });
  } else {
    // 帖子不存在就返回提示
    res.status(404).json({
      success: false,
      message: '找不到这个帖子'
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器跑起来了，端口：${PORT}`);
});
