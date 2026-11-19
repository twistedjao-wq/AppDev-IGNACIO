import { useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, Bell, ChevronDown, CircleUserRound, FileText, Grid2X2,
  Heart, HelpCircle, LayoutDashboard, LogOut, Menu, Plus, Search,
  ShieldCheck, UploadCloud, UserRound, X
} from 'lucide-react'
import './App.css'

const items = [
  {
    id: 1,
    title: 'Black Backpack',
    category: 'Bags',
    type: 'Found',
    location: 'Main Library',
    date: 'Nov 12, 2026',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2,
    title: 'iPhone 14',
    category: 'Electronics',
    type: 'Found',
    location: 'CEIT Building',
    date: 'Nov 11, 2026',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    title: 'Brown Wallet',
    category: 'Personal Items',
    type: 'Lost',
    location: 'University Food Court',
    date: 'Nov 10, 2026',
    status: 'Searching',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4,
    title: 'Silver Keyring',
    category: 'Keys',
    type: 'Found',
    location: 'CAVSU Gym',
    date: 'Nov 9, 2026',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 5,
    title: 'Blue Notebook',
    category: 'School Supplies',
    type: 'Lost',
    location: 'Room 304',
    date: 'Nov 8, 2026',
    status: 'Searching',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 6,
    title: 'ID Card',
    category: 'Documents',
    type: 'Found',
    location: 'Security Office',
    date: 'Nov 7, 2026',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=85',
  },
]

function Logo({ compact = false }) {
  return (
    <Link className="logo" to="/">
      <span className="logo-mark"><ShieldCheck size={22} strokeWidth={2.5} /></span>
      {!compact && <span><b>FindMate</b><small>CVSU LOST AND FOUND</small></span>}
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? 'nav open' : 'nav'}>
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/browse" onClick={() => setOpen(false)}>Browse Items</NavLink>
          <NavLink to="/report" onClick={() => setOpen(false)}>Report Item</NavLink>
          <NavLink to="/admin" onClick={() => setOpen(false)}>Admin</NavLink>
        </nav>
        <div className="header-actions">
          <Link className="notification-button" to="/notifications" aria-label="Notifications"><Bell size={20} /></Link>
          <Link className="login-button" to="/login">Sign In</Link>
          <Link className="button button-small" to="/register">Create Account</Link>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <Logo />
        <div><b>Quick Links</b><Link to="/browse">Browse Items</Link><Link to="/report">Report Item</Link></div>
        <div><b>Account</b><Link to="/login">Sign In</Link><Link to="/register">Create Account</Link></div>
        <div><b>Contact</b><span>Campus Lost and Found</span><span>CVSU Indang, Cavite</span></div>
      </div>
      <div className="footer-bottom">© 2026 FindMate — CvSU Lost and Found. All rights reserved.</div>
    </footer>
  )
}

function ItemCard({ item }) {
  return (
    <Link className="item-card" to={`/items/${item.id}`}>
      <div className="item-image">
        <img src={item.image} alt={item.title} />
        <span className={`type-badge ${item.type.toLowerCase()}`}>{item.type}</span>
      </div>
      <div className="item-card-body">
        <h3>{item.title}</h3>
        <p>{item.location}</p>
        <div className="item-meta"><span>{item.category}</span><span>{item.date}</span></div>
      </div>
    </Link>
  )
}

function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">CVSU CAMPUS COMMUNITY</span>
            <h1>Lost and Found<br />Management System</h1>
            <p>Helping the Cavite State University community reunite with their belongings.</p>
            <div className="hero-buttons">
              <Link className="button" to="/browse">Browse Items</Link>
              <Link className="button button-outline" to="/report">Report an Item</Link>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-circle">
              <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=650&q=85" alt="Found backpack" />
            </div>
          </div>
        </div>
        <div className="hero-stats">
          <div><b>1,248</b><span>Items Recovered</span></div>
          <div><b>988</b><span>Active Reports</span></div>
          <div><b>262</b><span>Pending Claims</span></div>
        </div>
      </section>

      <section className="section recent-section">
        <div className="section-heading">
          <div><span className="section-kicker">Recently reported</span><h2>Lost &amp; Found Items</h2></div>
          <Link to="/browse" className="text-link">View all items →</Link>
        </div>
        <div className="item-grid">{items.slice(0, 3).map(item => <ItemCard key={item.id} item={item} />)}</div>
      </section>

      <section className="how-section">
        <div className="section-heading centered">
          <span className="section-kicker">Simple and reliable</span>
          <h2>A simpler way back to your belongings</h2>
        </div>
        <div className="steps">
          <div><span>01</span><HelpCircle /><h3>Report</h3><p>Submit a lost or found item report with details and photos.</p></div>
          <div><span>02</span><Search /><h3>Search</h3><p>Browse and filter listings using item category or location.</p></div>
          <div><span>03</span><ShieldCheck /><h3>Claim</h3><p>Request a claim and let administrators verify your ownership.</p></div>
        </div>
      </section>
    </>
  )
}

function Browse() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All Categories')
  const filtered = items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) &&
    (category === 'All Categories' || item.category === category)
  )
  return (
    <main className="page-shell">
      <div className="page-heading">
        <span className="section-kicker">Community listings</span>
        <h1>Browse Lost and Found Items</h1>
        <p>Find reported items from around the CvSU campus.</p>
      </div>
      <div className="browse-layout">
        <aside className="filters">
          <h3>Filters</h3>
          <label>Search<input value={query} onChange={e => setQuery(e.target.value)} placeholder="Item name..." /></label>
          <label>Category<select value={category} onChange={e => setCategory(e.target.value)}>
            <option>All Categories</option>
            {[...new Set(items.map(item => item.category))].map(name => <option key={name}>{name}</option>)}
          </select></label>
          <label>Status<select><option>All Status</option><option>Available</option><option>Searching</option></select></label>
        </aside>
        <section className="browse-results">
          <div className="results-bar"><b>{filtered.length} items found</b><button>Newest first <ChevronDown size={16} /></button></div>
          <div className="item-grid browse-grid">{filtered.map(item => <ItemCard key={item.id} item={item} />)}</div>
        </section>
      </div>
    </main>
  )
}

function ItemDetails() {
  const { id } = useParams()
  const item = items.find(item => item.id === Number(id)) || items[0]
  const navigate = useNavigate()
  const [claimed, setClaimed] = useState(false)
  return (
    <main className="page-shell detail-shell">
      <button className="back-button" onClick={() => navigate(-1)}><ArrowLeft size={18} /> Back to items</button>
      <div className="detail-layout">
        <div className="detail-image"><img src={item.image} alt={item.title} /></div>
        <div className="detail-content">
          <span className={`type-badge ${item.type.toLowerCase()}`}>{item.type} Item</span>
          <h1>{item.title}</h1>
          <p className="detail-description">This item was reported near the {item.location}. Please include specific ownership details when submitting a claim.</p>
          <dl>
            <div><dt>Category</dt><dd>{item.category}</dd></div>
            <div><dt>Location</dt><dd>{item.location}</dd></div>
            <div><dt>Date reported</dt><dd>{item.date}</dd></div>
            <div><dt>Status</dt><dd><span className="status-dot" /> {item.status}</dd></div>
          </dl>
          {claimed
            ? <div className="claim-success"><ShieldCheck /> Claim request submitted for review.</div>
            : <button className="button full-button" onClick={() => setClaimed(true)}>Submit Claim Request</button>}
        </div>
      </div>
    </main>
  )
}

function Report() {
  const [submitted, setSubmitted] = useState(false)
  if (submitted) return (
    <main className="page-shell success-shell">
      <div className="success-card"><ShieldCheck size={52} /><h1>Report submitted</h1><p>Your report is now pending administrator review.</p><Link className="button" to="/browse">Browse Items</Link></div>
    </main>
  )
  return (
    <main className="page-shell form-shell">
      <div className="form-heading"><span className="section-kicker">Community report</span><h1>Report an Item</h1><p>Provide clear details to help the community identify the item.</p></div>
      <form className="report-form" onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
        <section>
          <h2>Item information</h2>
          <div className="form-grid">
            <label>Item title<input required placeholder="e.g. Black backpack" /></label>
            <label>Report type<select required><option>Lost</option><option>Found</option></select></label>
            <label>Category<select required><option>Bags</option><option>Electronics</option><option>Keys</option><option>Documents</option><option>Personal Items</option></select></label>
            <label>Date <input required type="date" /></label>
          </div>
          <label>Location found or lost<input required placeholder="e.g. Main Library" /></label>
          <label>Description<textarea required rows="5" placeholder="Describe the item, color, brand, and other identifying details..." /></label>
        </section>
        <section>
          <h2>Item photo</h2>
          <label className="upload-box"><UploadCloud size={34} /><b>Upload a photo</b><span>PNG or JPG up to 10MB</span><input type="file" accept="image/*" /></label>
        </section>
        <button className="button full-button" type="submit">Submit Report</button>
      </form>
    </main>
  )
}

function Auth({ mode }) {
  const isLogin = mode === 'login'
  return (
    <main className="auth-shell">
      <div className="auth-brand"><Logo /><div><h1>{isLogin ? 'Welcome back.' : 'Join the good side.'}</h1><p>{isLogin ? 'Sign in to manage reports and claims.' : 'Create an account to report and claim items.'}</p></div></div>
      <form className="auth-card" onSubmit={e => e.preventDefault()}>
        <h2>{isLogin ? 'Sign in to FindMate' : 'Create account'}</h2>
        {!isLogin && <label>Full name<input required placeholder="Your full name" /></label>}
        <label>Email address<input required type="email" placeholder="name@cvsu.edu.ph" /></label>
        <label>Password<div className="password-input"><input required type="password" placeholder="••••••••" /></div></label>
        {isLogin && <div className="auth-row"><label className="checkbox"><input type="checkbox" /> Remember me</label><a href="#forgot">Forgot password?</a></div>}
        <button className="button full-button" type="submit">{isLogin ? 'Sign In' : 'Create Account'}</button>
        <p className="auth-switch">{isLogin ? 'No account yet?' : 'Already have an account?'} <Link to={isLogin ? '/register' : '/login'}>{isLogin ? 'Create one' : 'Sign in'}</Link></p>
      </form>
    </main>
  )
}

function Notifications() {
  return (
    <main className="page-shell compact-shell">
      <div className="page-heading"><h1>Notifications</h1></div>
      <div className="notification-list">
        <div><span className="notice-icon"><ShieldCheck /></span><p><b>Your report was approved</b><small>The black backpack listing is now visible.</small></p><time>1h ago</time></div>
        <div><span className="notice-icon"><UserRound /></span><p><b>A claim request was received</b><small>Someone submitted a claim for the ID card.</small></p><time>3h ago</time></div>
      </div>
    </main>
  )
}

function Admin() {
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Logo />
        <nav><Link className="active" to="/admin"><LayoutDashboard /> Dashboard</Link><Link to="/browse"><Grid2X2 /> Items</Link><Link to="/notifications"><Bell /> Claims</Link><Link to="/admin"><FileText /> Reports</Link></nav>
        <Link className="admin-profile" to="/profile"><CircleUserRound /><span><b>Admin User</b><small>Administrator</small></span></Link>
      </aside>
      <section className="admin-content">
        <div className="admin-heading"><div><span>Administrator</span><h1>Dashboard</h1></div><button className="button button-small"><Plus size={16} /> Add Item</button></div>
        <div className="admin-stats">
          <div><span>Total items</span><b>1,248</b><small>+12 this week</small></div>
          <div><span>Pending claims</span><b>262</b><small>18 need review</small></div>
          <div><span>Recovered</span><b>988</b><small>79.1% success</small></div>
        </div>
        <div className="admin-table-card">
          <div className="table-heading"><h2>Recent reports</h2><button>View all</button></div>
          <table><thead><tr><th>Item</th><th>Category</th><th>Reported</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{items.slice(0, 5).map(item => <tr key={item.id}><td><img src={item.image} alt="" /><b>{item.title}</b></td><td>{item.category}</td><td>{item.date}</td><td><span className="table-status">{item.status}</span></td><td><button>Review</button></td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

function Profile() {
  return (
    <main className="page-shell compact-shell">
      <div className="profile-card">
        <div className="profile-top"><div className="profile-avatar">AM</div><div><h1>Alex Morgan</h1><p>alex.morgan@cvsu.edu.ph</p></div></div>
        <div className="profile-stats"><div><b>05</b><span>Reports</span></div><div><b>03</b><span>Claims</span></div><div><b>02</b><span>Returned</span></div></div>
        <div className="profile-menu"><button><UserRound /> Edit Profile <span>›</span></button><button><Heart /> Saved Items <span>›</span></button><button><ShieldCheck /> Privacy &amp; Security <span>›</span></button><button><LogOut /> Log Out <span>›</span></button></div>
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<><Header /><Auth mode="login" /></>} />
        <Route path="/register" element={<><Header /><Auth mode="register" /></>} />
        <Route path="*" element={<><Header /><Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/report" element={<Report />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes><Footer /></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
