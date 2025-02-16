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

