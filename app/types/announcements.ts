export interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'update' | 'event' | 'maintenance' | 'general';
  image?: string;
  priority?: boolean;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  tags?: string[];
  likes?: number;
  comments?: number;
  views?: number;
  expiresAt?: string;
  pinned?: boolean;
  status: 'draft' | 'published' | 'scheduled';
  scheduledFor?: string;
  lastEditedAt?: string;
  lastEditedBy?: string;
  relatedNews?: string[];
} 