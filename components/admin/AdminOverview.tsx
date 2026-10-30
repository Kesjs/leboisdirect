'use client'

import { useCallback, useEffect, useState } from 'react'

type AdminSection = 'overview' | 'orders' | 'customers'
type OverviewData = {
  metrics: { customers: number; orders: number; revenue: number; paidOrders: number; products: number; publishedProducts: number }
  statusCounts: Record<string, number>
  recentOrders: Array<{ id: string; reference: string; status: string; payment_status: string; total: number | string; customer_email: string; first_name: string; last_name: string; created_at: string }>
  recentCustomers: Array<{ user_id: string; email: string; first_name: string | null; last_name: string | null; created_at: string }>
}

const euro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
const date = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short' })
const statusLabels: Record<string, string> = { pending: 'En attente', confirmed: 'Confirmée', preparing: 'En préparation', shipped: 'Expédiée', delivered: 'Livrée', cancelled: 'Annulée' }
const paymentLabels: Record<string, string> = { unpaid: 'Non payé', pending: 'En vérification', paid: 'Payé', failed: 'Échec', refunded: 'Remboursé' }

function Status({ children, tone = 'neutral' }: { children: string; tone?: 'neutral' | 'success' | 'warning' | 'danger' }) {
  return <span className={`admin-status admin-status-${tone}`}>{children}</span>
}

function toneForStatus(status: string) {
  if (status === 'delivered' || status === 'confirmed') return 'success' as const
  if (status === 'cancelled') return 'danger' as const
  if (status === 'pending' || status === 'preparing') return 'warning' as const
  return 'neutral' as const
}

export default function AdminOverview({ section, onNavigate, catalogCounts }: { section: AdminSection; onNavigate: (section: 'overview' | 'orders' | 'customers' | 'products') => void; catalogCounts: { all: number; heating: number; pets: number } }) {
  const [data, setData] = useState<OverviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/overview', { cache: 'no-store' })
      const payload = await response.json() as OverviewData & { error?: string }
      if (!response.ok) throw new Error(payload.error || 'Impossible de charger le tableau de bord.')
      setData(payload)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Impossible de charger le tableau de bord.')
    } finally {
      setLoading(false)
    }
  }, [])
  useEffect(() => { void load() }, [load])

  if (loading) return <div className="admin-overview"><div className="admin-overview-heading"><div className="admin-skeleton admin-skeleton-title" /><div className="admin-skeleton admin-skeleton-control" /></div><div className="admin-metric-grid">{[1, 2, 3, 4].map((item) => <div className="admin-skeleton admin-skeleton-card" key={item} />)}</div><div className="admin-skeleton admin-skeleton-table" /></div>
  if (error || !data) return <div className="admin-empty-state"><p className="admin-eyebrow">Espace administrateur</p><h2>Le tableau de bord est indisponible.</h2><p>{error || 'Réessayez dans quelques secondes.'}</p><button className="admin-button admin-button-primary" onClick={() => void load()}>Réessayer</button></div>

  const { metrics, recentOrders, recentCustomers, statusCounts } = data
  const heading = section === 'orders' ? 'Commandes' : section === 'customers' ? 'Clients' : 'Tableau de bord'
  return <div className="admin-overview">
    <div className="admin-overview-heading"><div><p className="admin-eyebrow">Braviko / Espace opérationnel</p><h2>{heading}</h2><p className="admin-muted">Données réelles du catalogue, des commandes et des comptes connectés.</p></div><div className="admin-heading-actions"><button className="admin-button" onClick={() => void load()}>Actualiser</button><button className="admin-button admin-button-primary" onClick={() => onNavigate('products')}>Gérer les produits</button></div></div>
    <div className="admin-metric-grid">
      <div className="admin-metric"><span>Clients inscrits</span><strong>{metrics.customers}</strong><small>Profils clients actifs</small></div>
      <div className="admin-metric"><span>Commandes</span><strong>{metrics.orders}</strong><small>{metrics.paidOrders} paiements réussis</small></div>
      <div className="admin-metric"><span>Chiffre encaissé</span><strong>{euro.format(metrics.revenue)}</strong><small>Paiements confirmés</small></div>
      <div className="admin-metric"><span>Catalogue produits</span><strong>{metrics.products}</strong><small>{metrics.publishedProducts} publiés · {catalogCounts.heating} chauffage · {catalogCounts.pets} animaux</small></div>
    </div>
    {section === 'overview' && <div className="admin-overview-columns"><section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">Commandes récentes</p><h3>Suivre les dernières activités</h3></div><button className="admin-link-button" onClick={() => onNavigate('orders')}>Tout voir</button></div><OrderTable orders={recentOrders} compact /></section><section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">État opérationnel</p><h3>Points à surveiller</h3></div></div><div className="admin-status-list">{Object.entries(statusLabels).map(([key, label]) => <div key={key}><span>{label}</span><strong>{statusCounts[key] || 0}</strong></div>)}</div><div className="admin-panel-divider" /><div className="admin-panel-heading"><div><p className="admin-eyebrow">Clients récents</p><h3>Nouveaux comptes</h3></div><button className="admin-link-button" onClick={() => onNavigate('customers')}>Tout voir</button></div><CustomerList customers={recentCustomers.slice(0, 4)} /></section></div>}
    {section === 'orders' && <section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">Registre des commandes</p><h3>Toutes les commandes reçues</h3></div></div><OrderTable orders={recentOrders} /></section>}
    {section === 'customers' && <section className="admin-panel"><div className="admin-panel-heading"><div><p className="admin-eyebrow">Répertoire clients</p><h3>Clients inscrits récemment</h3></div></div><CustomerList customers={recentCustomers} /></section>}
  </div>
}

function OrderTable({ orders, compact = false }: { orders: OverviewData['recentOrders']; compact?: boolean }) {
  if (!orders.length) return <div className="admin-inline-empty">Aucune commande enregistrée.</div>
  return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Commande</th><th>Client</th><th>Statut</th><th>Total</th><th>Date</th></tr></thead><tbody>{orders.slice(0, compact ? 5 : 8).map((order) => <tr key={order.id}><td><strong>{order.reference}</strong><small>{paymentLabels[order.payment_status] || order.payment_status}</small></td><td>{order.first_name} {order.last_name}<small>{order.customer_email}</small></td><td><Status tone={toneForStatus(order.status)}>{statusLabels[order.status] || order.status}</Status></td><td>{euro.format(Number(order.total || 0))}</td><td>{date.format(new Date(order.created_at))}</td></tr>)}</tbody></table></div>
}

function CustomerList({ customers }: { customers: OverviewData['recentCustomers'] }) {
  if (!customers.length) return <div className="admin-inline-empty">Aucun client enregistré.</div>
  return <div className="admin-customer-list">{customers.map((customer) => <div key={customer.user_id}><span className="admin-avatar">{(customer.first_name || customer.email).slice(0, 1).toUpperCase()}</span><div><strong>{[customer.first_name, customer.last_name].filter(Boolean).join(' ') || 'Client Braviko'}</strong><small>{customer.email}</small></div><time>{date.format(new Date(customer.created_at))}</time></div>)}</div>
}
