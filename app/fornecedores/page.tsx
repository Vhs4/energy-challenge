"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2, X } from "lucide-react"
import { fetchSuppliers, deleteSupplier } from "../api/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import type { Supplier } from "../data/suppliers"
import SupplierForm from "../components/SupplierForm"
import { Toaster } from "@/components/ui/toaster"

export default function Fornecedores() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    loadSuppliers()
  }, [currentPage])

  const loadSuppliers = async () => {
    setIsLoading(true)
    try {
      const data = await fetchSuppliers(undefined, currentPage)
      setSuppliers(data.suppliers)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error("Failed to fetch suppliers:", error)
      toast({
        title: "Erro",
        description: "Falha ao carregar fornecedores. Tente novamente.",
        variant: "destructive",
      })
    }
    setIsLoading(false)
  }
  
  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
      try {
        await deleteSupplier(id)
        setSuppliers(suppliers.filter((s) => s.id !== id))
        toast({
          title: "Sucesso",
          description: "Fornecedor excluído com sucesso.",
        })
      } catch (error) {
        console.error("Failed to delete supplier:", error)
        toast({
          title: "Erro",
          description: "Falha ao excluir fornecedor. Tente novamente.",
          variant: "destructive",
        })
      }
    }
  }

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier)
  }

  const handleFormSubmit = () => {
    setEditingSupplier(null)
    loadSuppliers()
  }

const handlePageChange = (page: number) => {
    setCurrentPage(page)
    }

  return (
    <div className="container mx-auto py-10">
        <Toaster />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gerenciar Fornecedores</CardTitle>
          <Button
            variant="link"
            onClick={() => router.push("/")}
            className="absolute top-4 right-4"
          >
            <X className="h-6 w-6 text-gray-500" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Adicionar Fornecedor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Fornecedor</DialogTitle>
              </DialogHeader>
              <SupplierForm onSubmitSuccess={handleFormSubmit} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center py-4">Carregando fornecedores...</p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Custo por kWh</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell>{supplier.name}</TableCell>
                      <TableCell>{supplier.state}</TableCell>
                      <TableCell>R$ {supplier.costPerKWh.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon" onClick={() => handleEdit(supplier)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Editar Fornecedor</DialogTitle>
                              </DialogHeader>
                              <SupplierForm supplier={editingSupplier} onSubmitSuccess={handleFormSubmit} />
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="icon" onClick={() => handleDelete(supplier.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-center mt-4 space-x-2">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <span>
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Próxima
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
