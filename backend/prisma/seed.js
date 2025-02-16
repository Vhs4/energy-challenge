const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  const suppliers = [
    {
      name: "EcoEnergy",
      logo: "/placeholder.svg?height=80&width=80",
      state: "São Paulo",
      costPerKWh: 0.55,
      minKWh: 10000,
      totalCustomers: 50000,
      averageRating: 4.5,
      whatsapp: "5511999999901",
    },
    {
      name: "PowerMax",
      logo: "/placeholder.svg?height=80&width=80",
      state: "Rio de Janeiro",
      costPerKWh: 0.58,
      minKWh: 5000,
      totalCustomers: 75000,
      averageRating: 4.2,
      whatsapp: "5521999999902",
    },
    {
      name: "GreenVolt",
      logo: "/placeholder.svg?height=80&width=80",
      state: "Minas Gerais",
      costPerKWh: 0.52,
      minKWh: 15000,
      totalCustomers: 30000,
      averageRating: 4.7,
      whatsapp: "5531999999903",
    },
    {
      name: "SolarBrasil",
      logo: "/placeholder.svg?height=80&width=80",
      state: "Bahia",
      costPerKWh: 0.5,
      minKWh: 20000,
      totalCustomers: 25000,
      averageRating: 4.8,
      whatsapp: "5571999999904",
    },
    {
      name: "EnergiaLimpa",
      logo: "/placeholder.svg?height=80&width=80",
      state: "Paraná",
      costPerKWh: 0.53,
      minKWh: 8000,
      totalCustomers: 40000,
      averageRating: 4.4,
      whatsapp: "5541999999905",
    },
  ]

  for (const supplier of suppliers) {
    await prisma.supplier.create({
      data: supplier,
    })
  }

  console.log("Seed data inserted successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

