import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { warehouseProductValidationSchema } from 'validationSchema/warehouse-products';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.warehouse_product
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getWarehouseProductById();
    case 'PUT':
      return updateWarehouseProductById();
    case 'DELETE':
      return deleteWarehouseProductById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getWarehouseProductById() {
    const data = await prisma.warehouse_product.findFirst(convertQueryToPrismaUtil(req.query, 'warehouse_product'));
    return res.status(200).json(data);
  }

  async function updateWarehouseProductById() {
    await warehouseProductValidationSchema.validate(req.body);
    const data = await prisma.warehouse_product.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteWarehouseProductById() {
    const data = await prisma.warehouse_product.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
