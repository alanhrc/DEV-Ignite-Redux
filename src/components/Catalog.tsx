import { useEffect, useState } from "react"

import { IProduct } from "../store/modules/cart/types"

import { api } from "../services/api"

import { CatalogItem } from '../components/CatalogItem'

export function Catalog() {
  const [catalog, setCatalog] = useState<IProduct[]>([])

  useEffect(() => {
    api.get('products').then(response => {
      setCatalog(response.data)
    })
  }, [])

  return (
    <main className="w-full flex flex-col items-center border border-cyan-200">
      <h1 className="text-2xl mb-4">Catálogo De Produtos</h1>

      <div className="flex flex-wrap gap-10">
        {catalog.map(product => (
          <CatalogItem key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
