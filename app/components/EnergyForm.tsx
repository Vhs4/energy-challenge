"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface EnergyFormProps {
  onSubmit: (consumption: number) => void
}

export function EnergyForm({ onSubmit }: EnergyFormProps) {
  const [consumption, setConsumption] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = Number.parseFloat(consumption)
    if (!isNaN(value) && value > 0) {
      onSubmit(value)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="consumption">Consumo mensal de energia (kWh)</Label>
        <Input
          id="consumption"
          type="number"
          placeholder="Ex: 30000"
          value={consumption}
          onChange={(e) => setConsumption(e.target.value)}
          required
          min="1"
          className="mt-1"
        />
      </div>
      <Button type="submit">Buscar fornecedores</Button>
    </form>
  )
}

