import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

import { IProduct } from "../store/modules/cart/types"

import { addProductToCartRequest } from "../store/modules/cart/actions"
import { IState } from "../store"

interface ICatalogItemProps {
  product: IProduct
}

export function CatalogItem({ product }: ICatalogItemProps) {
  const dispatch = useDispatch()

  const hasFailureStockCheck = useSelector<IState, boolean>(state => {
    return state.cart.failureStockCheck.includes(product.id)
  })

  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product))
  }, [dispatch])

  return (
    <article className="flex flex-col" key={product.id}>
      <strong>{product.title}</strong>

      <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</span>

      <button
        type="button"
        onClick={handleAddProductToCart}
      >
        Comprar
      </button>

      {hasFailureStockCheck && <span style={{ color: 'red' }}>Falta de estoque</span>}
    </article>
  )
}
