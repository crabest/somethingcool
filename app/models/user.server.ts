import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";

export async function createUser(data: { 
  username: string; 
  email: string; 
  password: string;
}) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      username: data.username,
      email: data.email.toLowerCase(),
      password: hashedPassword,
      role: "user",
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
}

export async function getUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
  });
}

export async function verifyLogin(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    select: {
      id: true,
      username: true,
      role: true,
      password: true,
    },
  });

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  // Don't send password back
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      status: true,
      lastSeen: true,
      joinedAt: true,
      playtime: true,
      role: true,
    },
    orderBy: {
      lastSeen: 'desc',
    },
  });
} 