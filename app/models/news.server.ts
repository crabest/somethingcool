import type { News } from "~/types/news";
import { prisma } from "~/db.server";

export async function createNews(news: Partial<News>, userId: string) {
  return prisma.news.create({
    data: {
      title: news.title!,
      content: news.content!,
      type: news.type!,
      status: news.status!,
      priority: news.priority || false,
      scheduledFor: news.scheduledFor,
      authorId: userId,
    },
  });
}

export async function getNews(options?: {
  status?: string;
  type?: string;
  limit?: number;
}) {
  return prisma.news.findMany({
    where: {
      ...(options?.status && { status: options.status }),
      ...(options?.type && { type: options.type }),
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: options?.limit,
    include: {
      author: {
        select: {
          username: true,
          role: true,
        }
      }
    }
  });
} 