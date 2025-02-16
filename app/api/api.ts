const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api"

export async function fetchSuppliers(consumption?: number, page = 1) {
  const url = new URL(`${API_BASE_URL}/suppliers`)
  if (consumption) url.searchParams.append("consumption", consumption.toString())
  url.searchParams.append("page", page.toString())

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error("Failed to fetch suppliers")
  }
  return response.json()
}

export async function createSupplier(data: unknown) {
  const response = await fetch(`${API_BASE_URL}/suppliers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to create supplier")
  }
  return response.json()
}

export async function updateSupplier(id: string, supplierData: unknown): Promise<unknown> {
  const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supplierData),
  })

  if (!response.ok) {
    throw new Error("Failed to update supplier")
  }
  return response.json()
}

export async function deleteSupplier(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete supplier")
  }
}

