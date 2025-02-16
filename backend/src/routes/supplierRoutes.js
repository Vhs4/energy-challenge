const express = require("express")
const SupplierController = require("../controllers/SupplierController")
const SupplierService = require("../services/SupplierService")
const SupplierRepository = require("../repositories/SupplierRepository")

const router = express.Router()

const supplierRepository = new SupplierRepository()
const supplierService = new SupplierService(supplierRepository)
const supplierController = new SupplierController(supplierService)

router.get("/", (req, res) => supplierController.getSuppliers(req, res))
router.get("/:id", (req, res) => supplierController.getSupplierById(req, res))
router.post("/", (req, res) => supplierController.createSupplier(req, res))
router.put("/:id", (req, res) => supplierController.updateSupplier(req, res))
router.delete("/:id", (req, res) => supplierController.deleteSupplier(req, res))

module.exports = router

