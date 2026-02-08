// 牛马得闲 - 紧急修复版（先恢复服务）
const express = require('express');
const cors = require('cors'); // 添加这个，解决跨域问题

const app = express();
app.use(cors()); // 启用跨域支持
app.use(express.json());

const PORT = process.env.PORT || 3000;

// 🌟 核心接口（先用模拟数据保证服务正常）

// 1. 首页说明
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>🐮🐴 牛马得闲 - 后端服务器（维护中）</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; text-align: center; }
        .container { max-width: 600px; margin: 0 auto; }
        .status { 
          background: #d4edda; 
          color: #155724; 
          padding: 20px; 
          border-radius: 8px;
          margin: 20px 0;
        }
        .error { 
          background: #f8d7da; 
          color: #721c24; 
          padding: 20px; 
          border-radius: 8px;
          margin: 20px 0;
        }
        .api-box {
          background: #f8f9fa;
          padding: 15px;
          margin: 10px 0;
          border-radius: 5px;
          text-align: left;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🐮🐴 牛马得闲 - 后端服务器</h1>
        <div class="status">
          <h3>✅ 服务器正在运行</h3>
          <p>数据库连接暂时故障，正在使用模拟数据</p>
        </div>
        
        <div class="api-box">
          <h4>📡 可用API接口：</h4>
          <ul>
            <li><a href="/api/posts">GET /api/posts</a> - 获取动态（模拟数据）</li>
            <li><a href="/api/test">GET /api/test</a> - 测试接口</li>
            <li><a href="/api/stats">GET /api/stats</a> - 查看统计数据</li>
          </ul>
        </div>
        
        <div style="margin-top: 30px;">
          <h4>📱 用户访问地址：</h4>
          <p><a href="https://grand-mandazi-22f8d5.netlify.app" target="_blank">
            https://grand-mandazi-22f8d5.netlify.app
          </a></p>
        </div>
      </div>
    </body>
    </html>
  `);
});

// 2. 获取动态（模拟数据，保证前端能显示）
app.get('/api/posts', (req, res) => {
  const mockPosts = [
    { 
      id: 1, 
      name: '疲惫的骆驼', 
      text: '数据库正在维护，这是临时数据...', 
      likes: 1,
      created_at: new Date().toISOString()
    },
    { 
      id: 2, 
      name: '沉默的斑马', 
      text: '技术小哥正在紧急修复中...', 
      likes: 1,
      created_at: new Date().toISOString()
    },
    { 
      id: 3, 
      name: '乐观的松鼠', 
      text: '马上就能恢复正常啦！', 
      likes: 1,
      created_at: new Date().toISOString()
    }
  ];
  
  res.json({ 
    success: true, 
    data: mockPosts,
    message: '正在使用模拟数据，数据库连接故障中...'
  });
});

// 3. 测试接口
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: '✅ 后端服务正常运行！',
    timestamp: new Date().toISOString(),
    status: '模拟数据模式'
  });
});

// 4. 统计数据（模拟）
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      total_posts: 3,
      total_likes: 3,
      status: '模拟数据模式',
      message: '数据库恢复后显示真实数据'
    }
  });
});

// 5. 发布动态（临时关闭）
app.post('/api/posts', (req, res) => {
  res.json({
    success: false,
    message: '⏸️ 发布功能暂时关闭，数据库维护中...'
  });
});

// 6. 点赞功能（临时关闭）
app.post('/api/posts/:id/like', (req, res) => {
  res.json({
    success: false,
    message: '⏸️ 点赞功能暂时关闭，数据库维护中...'
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 牛马后台机器已启动（紧急模式）`);
  console.log(`📡 服务地址：http://localhost:${PORT}`);
  console.log(`🔧 当前模式：模拟数据（数据库故障中）`);
});