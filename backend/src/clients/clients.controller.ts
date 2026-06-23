import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ComplianceEngineService } from '../compliance/compliance-engine/compliance-engine.service';
import { SPCBState, SPCBColorCategory } from '@prisma/client';

@Controller('clients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly complianceEngine: ComplianceEngineService,
  ) {}

  /**
   * GET /api/v1/clients
   * Returns a list of all client entities assigned to the logged-in CA user.
   */
  @Get()
  async getClients(@Req() req: any) {
    return this.prisma.client.findMany({
      where: {
        assignedCAs: {
          some: { id: req.user.id },
        },
      },
      include: {
        deadlines: {
          select: {
            status: true,
          },
        },
      },
    });
  }

  /**
   * POST /api/v1/clients
   * Create a new client and generate automated deadlines
   */
  @Post()
  async createClient(
    @Req() req: any,
    @Body() body: { name: string; gstNumber: string; state: SPCBState; spcbCategory: SPCBColorCategory }
  ) {
    const newClient = await this.prisma.client.create({
      data: {
        name: body.name,
        gstNumber: body.gstNumber,
        state: body.state,
        spcbCategory: body.spcbCategory,
        assignedCAs: {
          connect: { id: req.user.id }
        }
      }
    });

    // Run the rules engine to generate standard deadlines
    await this.complianceEngine.generateDeadlinesForClient(
      newClient.id,
      newClient.state,
      newClient.spcbCategory
    );

    return newClient;
  }
}
