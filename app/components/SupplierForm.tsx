"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createSupplier, updateSupplier } from "../api/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Supplier } from "../data/suppliers"
import { useToast } from "@/hooks/use-toast"

interface SupplierFormProps {
  supplier?: Supplier | null
  onSubmitSuccess: () => void
}

const labelTranslations: Record<string, string> = {
  name: "Nome",
  logo: "Logo",
  state: "Estado",
  costPerKWh: "Custo por kWh",
  minKWh: "kWh Mínimo",
  totalCustomers: "Total de Clientes",
  averageRating: "Avaliação Média",
  whatsapp: "WhatsApp",
}

export default function SupplierForm({ supplier, onSubmitSuccess }: SupplierFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<Partial<Supplier>>({
    name: "",
    logo: "",
    state: "",
    costPerKWh: 0,
    minKWh: 0,
    totalCustomers: 0,
    averageRating: 0,
    whatsapp: "",
  })

  useEffect(() => {
    if (supplier) {
      setFormData(supplier)
    }
  }, [supplier])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let newValue: string | number = value

    if (name === "whatsapp") {
      newValue = value.replace(/[^0-9+]/g, "")
    } else {
      switch (name) {
        case "averageRating":
          newValue = Math.min(Math.max(Number.parseFloat(value) || 0, 0), 5)
          break
        case "totalCustomers":
        case "minKWh":
          newValue = Math.max(Number.parseInt(value) || 0, 0)
          break
        case "costPerKWh":
          newValue = Math.max(Number.parseFloat(value) || 0, 0)
          break
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (formData.logo && !/^https:\/\/(?:[a-z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i.test(formData.logo)) {
      toast({
        title: "Erro",
        description: "A URL da logo deve ser uma URL completa e começar com 'https://'.",
        variant: "destructive",
      });
      return;
    }
  
    if (!formData.whatsapp || !/^(\+)[0-9]{2,}/.test(formData.whatsapp)) {
      toast({
        title: "Erro",
        description: "O número do WhatsApp deve começar com '+' seguido do código postal (exemplo: +55).",
        variant: "destructive",
      });
      return;
    }
  
    try {
      if (supplier) {
        await updateSupplier(supplier.id.toString(), formData as Supplier);
        toast({
          title: "Sucesso",
          description: "Fornecedor atualizado com sucesso.",
          variant: "default",
        });
      } else {
        await createSupplier(formData as Supplier);
        toast({
          title: "Sucesso",
          description: "Fornecedor criado com sucesso.",
          variant: "default",
        });
      }
  
      setFormData({
        name: "",
        logo: "",
        state: "",
        costPerKWh: 0,
        minKWh: 0,
        totalCustomers: 0,
        averageRating: 0,
        whatsapp: "",
      });
      onSubmitSuccess();
    } catch (error) {
      console.error("Failed to save supplier:", error);
      toast({
        title: "Erro",
        description: "Falha ao salvar fornecedor. Verifique os campos e tente novamente.",
        variant: "destructive",
      });
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <Label htmlFor={key}>{labelTranslations[key]}</Label>
          <Input
            type={key === "costPerKWh" || key === "minKWh" || key === "totalCustomers" || key === "averageRating"
              ? "number"
              : "text"}
            id={key}
            name={key}
            value={value}
            onChange={handleChange}
            required
            min={key === "averageRating" ? 0 : undefined}
            max={key === "averageRating" ? 5 : undefined}
            step={key === "averageRating" || key === "costPerKWh" ? "0.01" : "1"}
            placeholder={key === "whatsapp" ? "+XX XXXXXXXXX" : undefined}
          />
        </div>
      ))}
      <Button type="submit" className="w-full">
        {supplier ? "Atualizar Fornecedor" : "Criar Fornecedor"}
      </Button>
    </form>
  )
}
