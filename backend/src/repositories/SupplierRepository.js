const { PrismaClient } = require("@prisma/client")

class SupplierRepository {
  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll(skip, take, where) {
    return this.prisma.supplier.findMany({
      skip,
      take,
      where,
    })
  }

  async count(where) {
    return this.prisma.supplier.count({ where })
  }

  async findById(id) {
    return this.prisma.supplier.findUnique({
      where: { id: Number(id) },
    })
  }

  async create(data) {
    return this.prisma.supplier.create({ data })
  }

  async update(id, data) {
    return this.prisma.supplier.update({
      where: { id: Number(id) },
      data,
    })
  }

  async delete(id) {
    return this.prisma.supplier.delete({
      where: { id: Number(id) },
    })
  }
}

module.exports = SupplierRepository

