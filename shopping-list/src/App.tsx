import { useRef, useState, type SubmitEvent } from 'react'
import './App.css'

type Item = {
  id: number
  name: string
  price: number
}

type ItemProps = {
  item: Item
  onRemove: (id: number) => void
}

const formatPrice = (price: number) =>
  `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(price)} сом`

function ShoppingItem({ item, onRemove }: ItemProps) {
  return (
    <li className="shopping-item">
      <span>
        <strong>{item.name}</strong> — {formatPrice(item.price)}
      </span>
      <button type="button" onClick={() => onRemove(item.id)}>
        Удалить
      </button>
    </li>
  )
}

function App() {
  const [items, setItems] = useState<Item[]>([
  
  ])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const nextId = useRef(4)
  const total = items.reduce((sum, item) => sum + item.price, 0)

  function addItem(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const parsedPrice = Number(price)

    if (!name.trim() || !Number.isFinite(parsedPrice) || parsedPrice < 0) {
      return
    }

    setItems((current) => [
      ...current,
      { id: nextId.current++, name: name.trim(), price: parsedPrice },
    ])
    setName('')
    setPrice('')
  }

  function removeItem(id: number) {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  return (
    <main className="shopping-card">
      <h1>Список покупок</h1>

      <form className="add-form" onSubmit={addItem}>
        <input
          type="text"
          placeholder="Название товара"
          aria-label="Название товара"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Цена"
          aria-label="Цена"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          min="0"
          step="any"
          required
        />
        <button type="submit">Добавить</button>
      </form>

      <ul className="shopping-list">
        {items.map((item) => (
          <ShoppingItem key={item.id} item={item} onRemove={removeItem} />
        ))}
      </ul>

      <div className="total">
        <strong>Итого:</strong>
        <strong>{formatPrice(total)}</strong>
      </div>
    </main>
  )
}

export default App
