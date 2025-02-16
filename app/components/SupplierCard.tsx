import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import type { Supplier } from "../data/suppliers"
import { Button } from "@/components/ui/button"

export function SupplierCard({ supplier }: { supplier: Supplier }) {
  const whatsappLink = `https://wa.me/${supplier.whatsapp}?text=${encodeURIComponent("Olá, vim pelo MeuConsumo Energy")}`

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{supplier.name}</CardTitle>
        <Image
          src={supplier.logo || "/placeholder.svg"}
          alt={`${supplier.name} logo`}
          width={40}
          height={40}
          className="rounded-full"
        />
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground mb-2">Estado: {supplier.state}</div>
        <div className="text-2xl font-bold">R$ {supplier.costPerKWh.toFixed(2)}/kWh</div>
        <div className="text-xs text-muted-foreground mt-2">Mínimo: {supplier.minKWh.toLocaleString()} kWh</div>
        <div className="text-xs text-muted-foreground">Clientes: {supplier.totalCustomers.toLocaleString()}</div>
        <div className="flex items-center mt-2 mb-4">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="text-sm font-medium">{supplier.averageRating.toFixed(1)}</span>
        </div>
        <Button className="w-full" asChild>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            Chamar vendedor no WhatsApp
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

