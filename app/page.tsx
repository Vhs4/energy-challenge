"use client"

import { useState, useEffect } from "react"
import { EnergyForm } from "./components/EnergyForm"
import { SupplierCard } from "./components/SupplierCard"
import { Pagination } from "./components/Pagination"
import { fetchSuppliers } from "./api/api"
import type { Supplier } from "./data/suppliers"

export default function Home() {
  const [consumption, setConsumption] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadSuppliers() {
      setIsLoading(true)
      try {
        const data = await fetchSuppliers(consumption ?? undefined, currentPage)
        setSuppliers(data.suppliers)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error("Failed to fetch suppliers:", error)
      }
      setIsLoading(false)
    }

    loadSuppliers()
  }, [consumption, currentPage])

  const handleConsumptionSubmit = (value: number) => {
    setConsumption(value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Encontre seu Fornecedor de Energia</h1>
        <div className="max-w-md mx-auto mb-12">
          <EnergyForm onSubmit={handleConsumptionSubmit} />
        </div>
        {isLoading ? (
          <p className="text-center text-xl text-gray-600">Carregando...</p>
        ) : suppliers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.map((supplier) => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </>
        ) : (
          <p className="text-center text-xl text-gray-600">Nenhum fornecedor encontrado para o consumo informado.</p>
        )}
      </main>
    </div>
  )
}

