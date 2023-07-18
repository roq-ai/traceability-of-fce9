import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { warehouseValidationSchema } from 'validationSchema/warehouses';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getWarehouses();
    case 'POST':
      return createWarehouse();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getWarehouses() {
    const data = await prisma.warehouse
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'warehouse'));
    return res.status(200).json(data);
  }

  async function createWarehouse() {
    await warehouseValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.warehouse_product?.length > 0) {
      const create_warehouse_product = body.warehouse_product;
      body.warehouse_product = {
        create: create_warehouse_product,
      };
    } else {
      delete body.warehouse_product;
    }
    const data = await prisma.warehouse.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
