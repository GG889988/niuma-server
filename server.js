// 牛马得闲 - 真正终极稳定版（内置记忆）
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

// 内存数据（重启会丢，但平时没事）
let posts = [
  { id: 1, name: '疲惫的骆驼', text: '终于可以存新动态了！重启会丢但先用着。', likes: 5, created_at: new Date().toISOString() },
  { id: 2, name: '沉默的斑马', text: '这次更新后，应该能正常发动态和点赞了。', likes: 3, created_at: new Date().toISOString() },
  { id: 3, name: '乐观的松鼠', text: '试试发一条新动态吧！这个系统现在稳定了。', likes: 8, created_at: new Date().toISOString() }
];

// 首页（给开发者看的）
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>🐮🐴 牛马得闲后台</title>
      <style>
        body { font-family: Arial; padding: 40px; text-align: center; background: #f8f9fa; }
        .card { background: white; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .status { background: #28a745; color: white; padding: 10px; border-radius: 5px; margin: 20px 0; }
        .btn { display: inline-block; background: #007bff; color: white; padding: 10px 20px; margin: 10px; text-decoration: none; border-radius: 5px; }
        .btn:hover { background: #0056b3; }
        .api { background: #f8f9fa; padding: 10px; margin: 10px 0; border-left: 4px solid #007bff; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🐮🐴 牛马得闲 - 后台机器</h1>
        <div class="status">
          <h3>✅ 终极稳定版 - 正在运行</h3>
          <p>使用内存存储，无需数据库，永不掉线！</p>
        </div>
        
        <div>
          <h3>📡 可用接口：</h3>
          <div class="api">
            <strong>GET /api/posts</strong> - 获取所有动态<br>
            <a class="btn" href="/api/posts" target="_blank">点我测试</a>
          </div>
          <div class="api">
            <strong>POST /api/posts</strong> - 发布新动态<br>
            <small>需要发请求，下面有测试按钮</small>
          </div>
          <div class="api">
            <strong>POST /api/posts/:id/like</strong> - 点赞<br>
            <small>给指定ID的动态点赞</small>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding: 15px; background: #e9ecef; border-radius: 5px;">
          <h3>🎯 测试发布功能：</h3>
          <button onclick="测试发布()" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">
            点我发布测试动态
          </button>
          <script>
            async function 测试发布() {
              const 名字 = '测试牛马';
              const 内容 = '这是一条测试动态，如果能成功，说明发布功能正常！';
              
              try {
                const 响应 = await fetch('/api/posts', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name: 名字, text: 内容 })
                });
                const 结果 = await 响应.json();
                alert(结果.success ? '✅ 发布成功！' : '❌ 发布失败：' + 结果.message);
              } catch (错误) {
                alert('❌ 网络错误：' + 错误.message);
              }
            }
          </script>
        </div>
        
        <div style="margin-top: 30px;">
          <h3>📱 用户访问地址：</h3>
          <p><a href="https://grand-mandazi-22f8d5.netlify.app" target="_blank" style="font-size: 18px; color: #007bff;">
            https://grand-mandazi-22f8d5.netlify.app
          </a></p>
          <p>把这个链接发给朋友，他们就能看到你的"牛马得闲"！</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

// 获取所有动态
app.get('/api/posts', (req, res) => {
  res.json({ 
    success: true, 
    data: posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
    total: posts.length,
    message: '终极稳定版 - 内存存储'
  });
});

// 发布新动态
app.post('/api/posts', (req, res) => {
  try {
    const { name, text } = req.body;
    
    if (!name || !text) {
      return res.json({ success: false, message: '名字和内容都不能为空' });
    }
    
    if (text.length > 500) {
      return res.json({ success: false, message: '内容太长了，最多500字' });
    }
    
    const 新动态 = {
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      name: name.substring(0, 50), // 限制名字长度
      text: text,
      likes: 0,
      created_at: new Date().toISOString()
    };
    
    posts.unshift(新动态); // 添加到最前面
    
    res.json({ 
      success: true, 
      data: 新动态,
      message: '动态发布成功！'
    });
    
  } catch (错误) {
    res.status(500).json({ 
      success: false, 
      message: '发布失败：' + 错误.message 
    });
  }
});

// 点赞
app.post('/api/posts/:id/like', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const 动态 = posts.find(p => p.id === id);
    
    if (!动态) {
      return res.json({ 
        success: false, 
        message: '找不到这条动态' 
      });
    }
    
    动态.likes += 1;
    
    res.json({ 
      success: true, 
      data: 动态,
      message: '点赞成功！'
    });
    
  } catch (错误) {
    res.status(500).json({ 
      success: false, 
      message: '点赞失败：' + 错误.message 
    });
  }
});

// 统计数据
app.get('/api/stats', (req, res) => {
  const 总动态数 = posts.length;
  const 总点赞数 = posts.reduce((总和, 动态) => 总和 + 动态.likes, 0);
  
  res.json({
    success: true,
    data: {
      总动态数,
      总点赞数,
      平均点赞数: 总动态数 > 0 ? (总点赞数 / 总动态数).toFixed(1) : 0,
      最新动态时间: posts.length > 0 ? posts[0].created_at : '无'
    }
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 牛马得闲 - 终极稳定版启动成功！`);
  console.log(`📡 本地地址: http://localhost:${PORT}`);
  console.log(`🌐 在线地址: https://niuma-server-production.up.railway.app`);
  console.log(`📊 当前动态数: ${posts.length}`);
});