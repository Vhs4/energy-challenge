class SupplierController {
  constructor(supplierService) {
    this.supplierService = supplierService
  }

  async getSuppliers(req, res) {
    const { consumption, page = 1, perPage = 6 } = req.query
    try {
      const result = await this.supplierService.getSuppliers(
        consumption,
        Number.parseInt(page),
        Number.parseInt(perPage),
      )
      res.json(result)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  }

  async getSupplierById(req, res) {
    const { id } = req.params
    try {
      const supplier = await this.supplierService.getSupplierById(id)
      if (supplier) {
        res.json(supplier)
      } else {
        res.status(404).json({ error: "Supplier not found" })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  }

  async createSupplier(req, res) {
    try {
      const newSupplier = await this.supplierService.createSupplier(req.body)
      res.status(201).json(newSupplier)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  }

  async updateSupplier(req, res) {
    const { id } = req.params
    try {
      const updatedSupplier = await this.supplierService.updateSupplier(id, req.body)
      if (updatedSupplier) {
        res.json(updatedSupplier)
      } else {
        res.status(404).json({ error: "Supplier not found" })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  }

  async deleteSupplier(req, res) {
    const { id } = req.params
    try {
      await this.supplierService.deleteSupplier(id)
      res.status(204).end()
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal server error" })
    }
  }
}

module.exports = SupplierController

