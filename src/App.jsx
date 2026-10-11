import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import products from './data/products'

const rupees = value => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0
}).format(value)

function App() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('campus-cart')) || [] }
    catch { return [] }
  })

  useEffect(() => localStorage.setItem('campus-cart', JSON.stringify(cart)), [cart])

  const addToCart = (product, count = 1) => {
    setCart(old => {
      const current = old.find(item => item.id === product.id)
      const existingCount = current?.cartQuantity || 0
      const nextCount = Math.min(product.quantity, existingCount + Number(count))
      if (current) return old.map(item => item.id === product.id ? { ...item, cartQuantity: nextCount } : item)
      return [...old, { ...product, cartQuantity: Math.min(product.quantity, Number(count)) }]
    })
  }

  const updateQuantity = (id, delta) => setCart(old => old
    .map(item => item.id === id ? { ...item, cartQuantity: Math.min(item.quantity, item.cartQuantity + delta) } : item)
    .filter(item => item.cartQuantity > 0))

  const removeItem = id => setCart(old => old.filter(item => item.id !== id))
  const itemCount = useMemo(() => cart.reduce((sum, item) => sum + item.cartQuantity, 0), [cart])
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0), [cart])

  return <div className="site">
    <header className="header">
      <Link to="/" className="logo"><span className="logo-mark">CC</span><span>campus<span className="logo-light">cart</span><small>STUDENT ESSENTIALS</small></span></Link>
      <nav>
        <NavLink to="/" end>Overview</NavLink>
        <NavLink to="/products">Inventory</NavLink>
        <NavLink to="/cart">My Cart <span className="nav-count">{itemCount}</span></NavLink>
      </nav>
    </header>
    <main className="wrap">
      <Routes>
        <Route path="/" element={<Home itemCount={itemCount} subtotal={subtotal} addToCart={addToCart} />} />
        <Route path="/products" element={<Inventory addToCart={addToCart} />} />
        <Route path="/products/:id" element={<Details addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} subtotal={subtotal} updateQuantity={updateQuantity} removeItem={removeItem} clearCart={() => setCart([])} />} />
        <Route path="*" element={<Empty title="We couldn't find that page" text="Use the navigation to continue shopping." link="/products" linkText="Open inventory" />} />
      </Routes>
    </main>
    <footer><span>campuscart</span><span>Made for everyday college life · React practical project</span></footer>
  </div>
}

function Home({ itemCount, subtotal, addToCart })  {
  return <>
    <section className="hero">
      <div className="hero-copy">
        <span className="kicker">THE COLLEGE LIFE EDIT</span>
        <h1>Small things.<br /><em>Big study energy.</em></h1>
        <p>Find useful tech, study supplies and everyday essentials in one simple student store.</p>
        <div className="actions"><Link className="btn btn-dark" to="/products">Explore inventory <span>↗</span></Link><Link className="text-link" to="/cart">View my cart →</Link></div>
        <div className="hero-note"><span className="dot" /> {products.length} useful picks · Simple cart management</div>
      </div>
      <div className="hero-art"><div className="art-circle"></div><div className="art-tag">STUDY<br />SMART</div><div className="art-item laptop">💻</div><div className="art-item notebook">📒</div><div className="art-item coffee">🥤</div><div className="art-caption">YOUR CAMPUS, YOUR KIT.</div></div>
    </section>
    <section className="quick-row">
      <div><span className="quick-label">IN YOUR CART</span><strong>{itemCount} <small>items</small></strong></div>
      <div><span className="quick-label">CURRENT SUBTOTAL</span><strong>{rupees(subtotal)}</strong></div>
      <Link className="btn btn-green" to="/cart">Review cart <span>→</span></Link>
    </section>
    <section className="section">
      <div className="section-top"><div><span className="kicker">PICKED FOR YOU</span><h2>Popular around campus</h2></div><Link to="/products" className="text-link">See all products ↗</Link></div>
      <div className="product-grid">{products.slice(0, 4).map(product => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}</div>
    </section>
    <section className="category-section"><div><span className="kicker">SHOP BY NEED</span><h2>What are you looking for?</h2></div><div className="category-tiles">
      {[['Electronics','⚡','Tech for class'],['Study Gear','✎','Notes & desk'],['Bags & Daily','↗','Everyday carry']].map(([category, icon, caption]) => <Link key={category} to={`/products?category=${encodeURIComponent(category)}`} className="category-tile"><span>{icon}</span><div><strong>{category}</strong><small>{caption}</small></div><b>↗</b></Link>)}
    </div></section>
  </>
}

function Inventory({ addToCart }) {
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const category = params.get('category') || 'All'
  const [sort, setSort] = useState('Featured')

  const setCategory = value => {
    const next = new URLSearchParams(params)
    if (value === 'All') next.delete('category')
    else next.set('category', value)
    setParams(next)
  }

  const results = useMemo(() => {
    let list = products.filter(p => `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(search.toLowerCase()))
      .filter(p => category === 'All' || p.category === category)
    if (sort === 'Price: low to high') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'Price: high to low') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'Top rated') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [search, category, sort])

  return <section className="page">
    <div className="page-heading"><div><span className="kicker">THE FULL COLLECTION</span><h1>Campus inventory</h1><p>Search for an item, narrow by category, or sort the list your way.</p></div><div className="inventory-stamp">IN STOCK<br /><b>{products.reduce((sum, p) => sum + p.quantity, 0)}</b><br />UNITS</div></div>
    <div className="filter-panel">
      <label className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Try “laptop”, “notebook”..." /></label>
      <label className="filter-select"><span>Category</span><select value={category} onChange={e => setCategory(e.target.value)}>{['All','Electronics','Study Gear','Bags & Daily'].map(c => <option key={c}>{c}</option>)}</select></label>
      <label className="filter-select"><span>Sort by</span><select value={sort} onChange={e => setSort(e.target.value)}>{['Featured','Price: low to high','Price: high to low','Top rated'].map(s => <option key={s}>{s}</option>)}</select></label>
    </div>
    <div className="results-line"><span>{results.length} products</span><span>Prices in INR</span></div>
    {results.length ? <div className="product-grid inventory-grid">{results.map(product => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}</div> : <Empty title="No matches this time" text="Try a different keyword or category." link="/products" linkText="Reset view" />}
  </section>
}

function ProductCard({ product, addToCart }) {
  return <article className="product-card">
    <Link to={`/products/${product.id}`} className={`product-art art-${product.id % 4}`}><span>{product.icon}</span><b>{product.category}</b></Link>
    <div className="product-card-body"><div className="product-title-row"><Link to={`/products/${product.id}`} className="product-title">{product.name}</Link><span className="rating">★ {product.rating}</span></div>
      <p>{product.description}</p><div className="price-row"><strong>{rupees(product.price)}</strong><span className={product.quantity ? 'in-stock' : 'no-stock'}>{product.quantity ? `${product.quantity} available` : 'Out of stock'}</span></div>
      <div className="card-buttons"><Link to={`/products/${product.id}`} className="btn btn-outline">Details</Link><button className="btn btn-dark" disabled={!product.quantity} onClick={() => addToCart?.(product, 1)}>+ Add</button></div>
    </div>
  </article>
}

function Details({ addToCart }) {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))
  const [qty, setQty] = useState(1)
  const navigate = useNavigate()
  if (!product) return <Empty title="Product not found" text="This item may have been removed." link="/products" linkText="Back to inventory" />
  return <section className="page">
    <p className="crumb"><Link to="/">Overview</Link> / <Link to="/products">Inventory</Link> / {product.name}</p>
    <div className="detail-layout"><div className={`detail-art art-${product.id % 4}`}><span>{product.icon}</span><b>THE CAMPUS EDIT · #{product.id}</b></div>
      <div className="detail-copy"><span className="kicker">{product.category.toUpperCase()}</span><h1>{product.name}</h1><div className="detail-rating">★ {product.rating} <span>·</span> {product.quantity} available</div><strong className="detail-price">{rupees(product.price)}</strong><p>{product.description}</p>
        <div className="quantity-picker"><span>Quantity</span><div><button onClick={() => setQty(n => Math.max(1, n - 1))}>−</button><strong>{qty}</strong><button disabled={qty >= product.quantity} onClick={() => setQty(n => Math.min(product.quantity, n + 1))}>+</button></div></div>
        <div className="actions"><button className="btn btn-dark" disabled={!product.quantity} onClick={() => addToCart(product, qty)}>Add {qty} to cart</button><button className="btn btn-outline" onClick={() => navigate('/products')}>Keep browsing</button></div>
        <div className="detail-note">✓ Stock-aware quantity control <br />✓ Cart is saved on this browser</div>
      </div>
    </div>
  </section>
}

function Cart({ cart, subtotal, updateQuantity, removeItem, clearCart }) {
  const [notice, setNotice] = useState('')
  const delivery = subtotal === 0 || subtotal >= 1500 ? 0 : 80
  const total = subtotal + delivery
  const checkout = () => { if (!cart.length) return; setNotice(`Demo checkout complete — order total ${rupees(total)}.`); clearCart() }
  return <section className="page">
    <div className="page-heading"><div><span className="kicker">ALMOST YOURS</span><h1>Shopping bag</h1><p>Review your picks before the demo checkout.</p></div>{cart.length > 0 && <button className="text-button" onClick={clearCart}>Clear bag ×</button>}</div>
    {notice && <div className="notice">{notice}</div>}
    {!cart.length ? <Empty title="Your bag is taking a break" text="Explore the inventory and add something useful for college." link="/products" linkText="Explore inventory" /> :
      <div className="cart-layout"><div className="cart-list">{cart.map(item => <article className="cart-row" key={item.id}>
        <div className={`cart-thumb art-${item.id % 4}`}>{item.icon}</div><div className="cart-product"><Link to={`/products/${item.id}`}>{item.name}</Link><small>{item.category} · {rupees(item.price)} each</small><button onClick={() => removeItem(item.id)}>Remove item</button></div>
        <div className="stepper"><button onClick={() => updateQuantity(item.id, -1)}>−</button><span>{item.cartQuantity}</span><button disabled={item.cartQuantity >= item.quantity} onClick={() => updateQuantity(item.id, 1)}>+</button></div><strong className="cart-line-total">{rupees(item.price * item.cartQuantity)}</strong>
      </article>)}</div>
      <aside className="bill-card"><span className="kicker">COST BREAKDOWN</span><h2>Order summary</h2><div className="bill-line"><span>Subtotal</span><strong>{rupees(subtotal)}</strong></div><div className="bill-line"><span>Delivery</span><strong>{delivery ? rupees(delivery) : 'FREE'}</strong></div><p className="delivery-hint">{subtotal >= 1500 ? 'You unlocked free delivery.' : `Add ${rupees(Math.max(0, 1500 - subtotal))} for free delivery.`}</p><div className="bill-total"><span>Total</span><strong>{rupees(total)}</strong></div><button className="btn btn-green full" onClick={checkout}>Place demo order ↗</button><Link className="continue-link" to="/products">← Continue shopping</Link><small className="disclaimer">Demo only. No payment is collected.</small></aside></div>}
  </section>
}

function Empty({ title, text, link, linkText }) {
  return <div className="empty-state"><span className="empty-symbol">↗</span><h2>{title}</h2><p>{text}</p><Link to={link} className="btn btn-dark">{linkText}</Link></div>
}

export default App
