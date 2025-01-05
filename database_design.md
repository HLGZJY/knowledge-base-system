# 知识库系统数据库设计 (MVP版本)

## 1. 数据库表结构

### 1.1 users（用户表）
```sql
CREATE TABLE users (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    username    VARCHAR(50) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    role        ENUM('user', 'admin') DEFAULT 'user',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 1.2 knowledge（知识条目表）
```sql
CREATE TABLE knowledge (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    title       VARCHAR(200) NOT NULL,
    content     TEXT NOT NULL,
    image_url   VARCHAR(255),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id   INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(id)
);
```

### 1.3 questions（问题表）
```sql
CREATE TABLE questions (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    user_id         INT NOT NULL,
    knowledge_id    INT NOT NULL,
    question_text   TEXT NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (knowledge_id) REFERENCES knowledge(id)
);
```

## 2. 数据库关系说明

1. users 与 knowledge：一对多关系，一个用户可以创建多个知识条目
2. users 与 questions：一对多关系，一个用户可以提出多个问题
3. knowledge 与 questions：一对多关系，一个知识条目可以有多个相关问题
