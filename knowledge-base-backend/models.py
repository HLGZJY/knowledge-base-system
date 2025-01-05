from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class KnowledgeItem(db.Model):
    __tablename__ = 'knowledge_items'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    author_id = db.Column(db.Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'imageUrl': self.image_url,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat(),
            'authorId': self.author_id
        }

    @staticmethod
    def from_dict(data):
        return KnowledgeItem(
            title=data.get('title'),
            content=data.get('content'),
            image_url=data.get('imageUrl'),
            author_id=data.get('authorId', 1)  # 默认作者ID为1
        )
