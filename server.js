// 牛马得闲 - 数据库版（装上了记事本！）
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// 1. 连接你的“云端记事本”
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// 2. 创建“动态记录本”页面（建表）
async function setupNotebook() {
  try {
    const client = await pool.connect();
    
    // 创建“动态记录本”的第一页
    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        text TEXT NOT NULL,
        likes INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // 检查本子是不是空的，空的话写三条示例
    const result = await client.query('SELECT COUNT(*) FROM posts');
    const count = parseInt(result.rows[0].count);
    
    if (count === 0) {
      await client.query(`
        INSERT INTO posts (name, text, likes) VALUES
        ('疲惫的骆驼', '今天搬了10吨代码，蹄子都磨秃了...', 5),
        ('沉默的斑马', '在黑白格子间寻找生活的意义', 3),
        ('乐观的松鼠', '囤够了bug，准备过冬慢慢修！', 8)
      `);
      console.log('✅ 已写入三条示例动态');
    }
    
    client.release();
    console.log('✅ “动态记录本”准备好了！');
  } catch (err) {
    console.error('❌ 准备记事本失败:', err);
  }
}

// 启动时准备记事本
setupNotebook();

// 3. 📖 接口1：读取所有动态（从记事本里读）
app.get('/api/posts', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM posts 
      ORDER BY created_at DESC
    `);
    res.json({ 
      success: true, 
      data: result.rows,
      message: `从记事本读取了${result.rows.length}条动态`
    });
  } catch (err) {
    console.error('读取失败:', err);
    res.status(500).json({ 
      success: false, 
      message: '读取记事本失败'
    });
  }
});

// 4. ✍️ 接口2：发布新动态（往记事本里写）
app.post('/api/posts', async (req, res) => {
  try {
    const { name, text } = req.body;
    
    // 简单验证
    if (!name || !text) {
      return res.status(400).json({ 
        success: false, 
        message: '姓名和内容都要写哦' 
      });
    }
    
    // 写入记事本
    const result = await pool.query(
      'INSERT INTO posts (name, text) VALUES ($1, $2) RETURNING *',
      [name, text]
    );
    
    res.json({ 
      success: true, 
      data: result.rows[0],
      message: '动态发布成功！'
    });
  } catch (err) {
    console.error('发布失败:', err);
    res.status(500).json({ 
      success: false, 
      message: '发布失败，记事本可能被锁了' 
    });
  }
});

// 5. 👍 接口3：给动态点赞
app.post('/api/posts/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: '没找到这条动态' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0],
      message: '点赞成功！'
    });
  } catch (err) {
    console.error('点赞失败:', err);
    res.status(500).json({ 
      success: false, 
      message: '点赞失败了' 
    });
  }
});

// 6. 📊 接口4：统计数据
app.get('/api/stats', async (req, res) => {
  try {
    const totalResult = await pool.query('SELECT COUNT(*) FROM posts');
    const likesResult = await pool.query('SELECT SUM(likes) FROM posts');
    
    res.json({
      success: true,
      data: {
        total_posts: parseInt(totalResult.rows[0].count),
        total_likes: parseInt(likesResult.rows[0].sum || 0),
        message: '数据统计完成'
      }
    });
  } catch (err) {
    console.error('统计失败:', err);
    res.status(500).json({ 
      success: false, 
      message: '统计数据失败' 
    });
  }
});

// 7. 🎯 测试接口（保留）
app.get('/api/test-db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time');
    client.release();
    
    res.json({ 
      success: true, 
      message: '🎯 后台机器和记事本连接正常！',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('测试失败:', err);
    res.status(500).json({ 
      success: false, 
      message: '连接记事本失败'
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 牛马后台机器已启动，记事本准备就绪！`);
  console.log(`📖 可用接口：`);
  console.log(`   GET  /api/posts    - 读取所有动态`);
  console.log(`   POST /api/posts    - 发布新动态`);
  console.log(`   POST /api/posts/:id/like - 点赞`);
  console.log(`   GET  /api/stats    - 查看统计数据`);
  console.log(`   GET  /api/test-db  - 测试记事本连接`);
});