import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/variables.css'
import '../styles/theme.css'

const roles = [
  {
    key: 'user',
    emoji: '🍽️',
    title: "I'm a Customer",
    desc: 'Discover food, browse menus, and get your favourite meals delivered.',
    tag: 'Hungry?',
    loginPath: '/user/login',
    registerPath: '/user/register',
    registerLabel: 'Create Account',
  },
  {
    key: 'partner',
    emoji: '🍳',
    title: "I'm a Food Partner",
    desc: 'Manage your restaurant, update menus, and track orders on Munchly.',
    tag: 'Restaurant',
    loginPath: '/food-partner/login',
    registerPath: '/food-partner/register',
    registerLabel: 'List My Restaurant',
  },
]

const RoleSelect = () => {
  const navigate = useNavigate()

  return (
    <div className="role-page">
      <div className="role-inner">

        <div className="role-logo">
          <span>🍔</span>
          <span className="role-logo-name">munchly</span>
        </div>

        <h1 className="role-heading">Who's joining<br />the feast?</h1>
        <p className="role-sub">Choose your role to get started.</p>

        <div className="role-cards">
          {roles.map((role) => (
            <div key={role.key} className={`role-card role-card--${role.key}`}>
              <div className="role-card-tag">{role.tag}</div>
              <div className="role-card-icon">{role.emoji}</div>
              <h2 className="role-card-title">{role.title}</h2>
              <p className="role-card-desc">{role.desc}</p>
              <div className="role-card-actions">
                <button
                  className="role-btn role-btn--primary"
                  onClick={() => navigate(role.loginPath)}
                >
                  Sign In
                </button>
                <button
                  className="role-btn role-btn--ghost"
                  onClick={() => navigate(role.registerPath)}
                >
                  {role.registerLabel}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .role-page {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
          background: var(--bg);
          background-image:
            radial-gradient(ellipse 70% 50% at 15% 10%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 60%),
            radial-gradient(ellipse 60% 60% at 85% 85%, color-mix(in srgb, var(--accent) 6%, transparent), transparent 60%);
        }
        .role-inner {
          width: 100%;
          max-width: 760px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: roleFadeUp 0.45s ease both;
        }
        .role-logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 7px 18px;
          margin-bottom: 36px;
          box-shadow: var(--shadow);
        }
        .role-logo span:first-child { font-size: 18px; }
        .role-logo-name {
          font-size: 16px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.3px;
        }
        .role-heading {
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 700;
          color: var(--text);
          line-height: 1.2;
          letter-spacing: -0.5px;
          margin-bottom: 10px;
        }
        .role-sub {
          font-size: 15px;
          color: var(--muted);
          margin-bottom: 44px;
        }
        .role-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          width: 100%;
        }
        @media (max-width: 560px) {
          .role-cards { grid-template-columns: 1fr; }
        }
        .role-card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: var(--radius);
          padding: 32px 28px 28px;
          text-align: left;
          position: relative;
          box-shadow: var(--shadow);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          overflow: hidden;
        }
        .role-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
          border-radius: 0 0 var(--radius) var(--radius);
          background: var(--accent);
        }
        .role-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 48px rgba(15, 23, 42, 0.13);
          border-color: var(--accent);
        }
        .role-card:hover::after { transform: scaleX(1); }
        .role-card-tag {
          position: absolute;
          top: 16px; right: 16px;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 100px;
          background: color-mix(in srgb, var(--accent) 12%, transparent);
          color: var(--accent);
          letter-spacing: 0.3px;
        }
        .role-card-icon {
          font-size: 28px;
          margin-bottom: 16px;
          width: 52px; height: 52px;
          display: flex; align-items: center; justify-content: center;
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          border-radius: 14px;
        }
        .role-card-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 8px;
          letter-spacing: -0.2px;
        }
        .role-card-desc {
          font-size: 13.5px;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .role-card-actions {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .role-btn {
          width: 100%;
          padding: 11px 16px;
          border-radius: var(--radius);
          font: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: opacity 0.15s, transform 0.15s, background 0.15s;
          letter-spacing: 0.3px;
        }
        .role-btn:active { transform: scale(0.97); }
        .role-btn--primary { background: var(--accent); color: #fff; }
        .role-btn--primary:hover { background: var(--accent-600); }
        .role-btn--ghost {
          background: transparent;
          border: 1.5px solid var(--border);
          color: var(--text);
        }
        .role-btn--ghost:hover {
          background: color-mix(in srgb, var(--text) 6%, transparent);
        }
        @keyframes roleFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default RoleSelect
