import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentStatus } from '@prisma/client';

@Injectable()
export class CalendarService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves calendar deadlines.
   * If clientId is provided, fetches only for that client (after verifying access).
   * If clientId is not provided, aggregates deadlines across all clients assigned to the user.
   */
  async getCalendar(userId: string, clientId?: string) {
    if (clientId) {
      // Verify the user is assigned to this client
      const hasAccess = await this.prisma.client.count({
        where: {
          id: clientId,
          assignedCAs: {
            some: { id: userId },
          },
        },
      });

      if (!hasAccess) {
        throw new ForbiddenException('You do not have access to this client.');
      }

      return this.prisma.calendarDeadline.findMany({
        where: { clientId },
        include: {
          documents: {
            select: {
              id: true,
              status: true,
              fileName: true,
            },
          },
        },
        orderBy: { targetDate: 'asc' },
      });
    }

    // Aggregate deadlines across all clients assigned to the user
    return this.prisma.calendarDeadline.findMany({
      where: {
        client: {
          assignedCAs: {
            some: { id: userId },
          },
        },
      },
      include: {
        documents: {
          select: {
            id: true,
            status: true,
            fileName: true,
          },
        },
      },
      orderBy: { targetDate: 'asc' },
    });
  }

  /**
   * Fetch specific deadline details including documents and live comments.
   */
  async getDeadlineDetails(userId: string, deadlineId: string) {
    const deadline = await this.prisma.calendarDeadline.findUnique({
      where: { id: deadlineId },
      include: {
        client: {
          include: {
            assignedCAs: {
              where: { id: userId },
              select: { id: true },
            },
          },
        },
        documents: {
          select: {
            id: true,
            fileName: true,
            storagePath: true,
            status: true,
            uploadedAt: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                role: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!deadline) {
      throw new NotFoundException('Deadline not found.');
    }

    if (deadline.client.assignedCAs.length === 0) {
      throw new ForbiddenException('You do not have access to this client.');
    }

    // Remove relations metadata to keep response clean
    const { client, ...safeDeadline } = deadline;
    return safeDeadline;
  }

  /**
   * Updates deadline status (e.g. pending, verified).
   */
  async updateDeadlineStatus(userId: string, deadlineId: string, status: DocumentStatus) {
    const deadline = await this.prisma.calendarDeadline.findUnique({
      where: { id: deadlineId },
      select: {
        clientId: true,
        client: {
          select: {
            assignedCAs: {
              where: { id: userId },
              select: { id: true },
            },
          },
        },
      },
    });

    if (!deadline) {
      throw new NotFoundException('Deadline not found.');
    }

    if (deadline.client.assignedCAs.length === 0) {
      throw new ForbiddenException('You do not have access to this client.');
    }

    return this.prisma.calendarDeadline.update({
      where: { id: deadlineId },
      data: { status },
    });
  }

  /**
   * Adds a comment to a deadline thread.
   */
  async addComment(userId: string, deadlineId: string, message: string) {
    const deadline = await this.prisma.calendarDeadline.findUnique({
      where: { id: deadlineId },
      select: {
        clientId: true,
        client: {
          select: {
            assignedCAs: {
              where: { id: userId },
              select: { id: true },
            },
          },
        },
      },
    });

    if (!deadline) {
      throw new NotFoundException('Deadline not found.');
    }

    if (deadline.client.assignedCAs.length === 0) {
      throw new ForbiddenException('You do not have access to this client.');
    }

    return this.prisma.comment.create({
      data: {
        message,
        deadlineId,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            role: true,
          },
        },
      },
    });
  }
}
