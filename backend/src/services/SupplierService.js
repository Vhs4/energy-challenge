class SupplierService {
  constructor(supplierRepository) {
    this.supplierRepository = supplierRepository
  }

  async getSuppliers(consumption, page, perPage) {
    const skip = (page - 1) * perPage
    let whereClause = {}
    if (consumption) {
      whereClause = {
        minKWh: {
          lte: Number.parseInt(consumption),
        },
      }
    }

    const [suppliers, totalCount] = await Promise.all([
      this.supplierRepository.findAll(skip, perPage, whereClause),
      this.supplierRepository.count(whereClause),
    ])

    return {
      suppliers,
      totalPages: Math.ceil(totalCount / perPage),
      currentPage: page,
    }
  }

  async getSupplierById(id) {
    return this.supplierRepository.findById(id)
  }

  async createSupplier(supplierData) {
    return this.supplierRepository.create(supplierData)
  }

  async updateSupplier(id, supplierData) {
    return this.supplierRepository.update(id, supplierData)
  }

  async deleteSupplier(id) {
    return this.supplierRepository.delete(id)
  }
}

module.exports = SupplierService

