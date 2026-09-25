import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { API_BASE_URL } from './api.js'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navItems = [
  { to: '/activities', label: 'Activities', index: '01' },
  { to: '/leaderboard', label: 'Leaderboard', index: '02' },
  { to: '/teams', label: 'Teams', index: '03' },
  { to: '/users', label: 'Athletes', index: '04' },
  { to: '/workouts', label: 'Workouts', index: '05' },
]

function Dashboard() {
  return (
    <section className="dashboard">
      <div className="dashboard-copy">
        <p className="eyebrow">Mergington High / PE command center</p>
        <h1>Move with<br /><em>purpose.</em></h1>
        <p className="intro">A clear view of the activity, energy, and friendly competition shaping this week.</p>
        <Link className="primary-link" to="/activities">Open activity log <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="dashboard-mark" aria-hidden="true">
        <span>OF</span>
        <small>TRACK<br />TOGETHER</small>
      </div>
      <div className="dashboard-strip">
        <span>LIVE API</span>
        <strong>{API_BASE_URL.replace('/api', '')}</strong>
      </div>
    </section>
  )
}

function View({ title, kicker, children }) {
  return (
    <section className="view-section">
      <p className="eyebrow">{kicker}</p>
      <div className="view-heading"><h1>{title}</h1><span className="view-count">OctoFit tracker</span></div>
      {children}
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/"><img className="brand-mark" src="/octofitapp-small.png" alt="" /><span>OctoFit <b>Tracker</b></span></Link>
        <nav aria-label="Main navigation">
          {navItems.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'active' : ''}><small>{item.index}</small>{item.label}</NavLink>)}
        </nav>
        <span className="status-dot">API online</span>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<View title="Activity log" kicker="01 / Momentum"><Activities /></View>} />
          <Route path="/leaderboard" element={<View title="Leaderboard" kicker="02 / Friendly fire"><Leaderboard /></View>} />
          <Route path="/teams" element={<View title="Teams" kicker="03 / Together"><Teams /></View>} />
          <Route path="/users" element={<View title="Athletes" kicker="04 / The roster"><Users /></View>} />
          <Route path="/workouts" element={<View title="Workouts" kicker="05 / Next up"><Workouts /></View>} />
        </Routes>
      </main>

      <footer><span>OCTOFIT / 2026</span><span>Built for consistent effort.</span></footer>
    </div>
  )
}

export default App
