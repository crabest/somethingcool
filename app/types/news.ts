export type News = {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'event' | 'update' | 'maintenance';
  status: 'draft' | 'published' | 'scheduled';
  priority?: boolean;
  scheduledFor?: Date | null;
  views?: number;
  likes?: number;
  author?: {
    username: string;
    role: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}; 