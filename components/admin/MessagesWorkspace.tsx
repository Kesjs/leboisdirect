'use client'

import { useEffect, useMemo, useState } from 'react'

export type ContactMessageStatus = 'new' | 'read' | 'replied' | 'archived'

export type AdminContactMessage = {
  id: string
  name: string
  email: string
  order_ref?: string | null
  subject: string
  message: string
  locale: string
  status: string
  created_at: string
}

type Props = {
  messages: AdminContactMessage[]
  loading: boolean
  error: string
  onRefresh: () => void
  onUpdateStatus: (id: string, status: ContactMessageStatus) => Promise<void>
}

const STATUS_META: Record<ContactMessageStatus, { label: string; badgeClass: string }> = {
  new: {
    label: 'Nouveau',
    badgeClass: 'border-braise/30 bg-braise/10 text-braise',
  },
  read: {
    label: 'Lu',
    badgeClass: 'border-hairline bg-sand text-charcoal',
  },
  replied: {
    label: 'Répondu',
    badgeClass: 'border-forest/25 bg-forest/10 text-forest',
  },
  archived: {
    label: 'Archivé',
    badgeClass: 'border-hairline bg-ivory text-smoke',
  },
}

function normalizeStatus(status: string): ContactMessageStatus {
  if (status === 'read' || status === 'replied' || status === 'archived') return status
  return 'new'
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export default function MessagesWorkspace({
  messages,
  loading,
  error,
  onRefresh,
  onUpdateStatus,
}: Props) {
  const [filterStatus, setFilterStatus] = useState<'all' | ContactMessageStatus>('all')
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const counts = useMemo(() => {
    const result = { all: messages.length, new: 0, read: 0, replied: 0, archived: 0 }
    for (const item of messages) {
      result[normalizeStatus(item.status)] += 1
    }
    return result
  }, [messages])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return messages.filter((item) => {
      const normalized = normalizeStatus(item.status)
      if (filterStatus !== 'all' && normalized !== filterStatus) return false
      if (!query) return true
      return (
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.subject.toLowerCase().includes(query) ||
        item.message.toLowerCase().includes(query) ||
        (item.order_ref || '').toLowerCase().includes(query)
      )
    })
  }, [filterStatus, messages, search])

  useEffect(() => {
    if (!filtered.length) {
      setSelectedId(null)
      return
    }
    if (!selectedId || !filtered.some((m) => m.id === selectedId)) {
      setSelectedId(filtered[0].id)
    }
  }, [filtered, selectedId])

  const selectedMessage = useMemo(
    () => filtered.find((m) => m.id === selectedId) || null,
    [filtered, selectedId],
  )

  async function handleSelect(msg: AdminContactMessage) {
    setSelectedId(msg.id)
    if (normalizeStatus(msg.status) === 'new') {
      await handleStatusChange(msg.id, 'read')
    }
  }

  async function handleStatusChange(id: string, status: ContactMessageStatus) {
    setUpdatingId(id)
    try {
      await onUpdateStatus(id, status)
    } finally {
      setUpdatingId(null)
    }
  }

  async function copySenderEmail(email: string) {
    try {
      await navigator.clipboard.writeText(email)
      setCopiedEmail(true)
      window.setTimeout(() => setCopiedEmail(false), 1800)
    } catch {
      /* Clipboard unavailable; mailto remains clickable. */
    }
  }

  const filterTabs: Array<{ key: 'all' | ContactMessageStatus; label: string; count: number }> = [
    { key: 'all', label: 'Tous', count: counts.all },
    { key: 'new', label: 'Nouveaux', count: counts.new },
    { key: 'read', label: 'Lus', count: counts.read },
    { key: 'replied', label: 'Répondus', count: counts.replied },
    { key: 'archived', label: 'Archivés', count: counts.archived },
  ]

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[14px] border border-hairline bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => {
            const active = filterStatus === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilterStatus(tab.key)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition sm:text-sm ${
                  active
                    ? 'border-charcoal bg-charcoal text-white'
                    : 'border-hairline bg-ivory text-smoke hover:border-charcoal hover:text-charcoal'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            )
          })}
        </div>

        <div className="flex flex-1 items-center gap-2 sm:max-w-md sm:justify-end">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher nom, email, objet, référence…"
            className="min-w-0 flex-1 rounded-[10px] border border-hairline bg-ivory px-3.5 py-2 text-sm text-charcoal outline-none transition focus:border-charcoal focus:bg-white"
          />
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="shrink-0 rounded-[10px] border border-hairline px-3.5 py-2 text-xs font-medium text-charcoal transition hover:border-charcoal disabled:opacity-50 sm:text-sm"
          >
            {loading ? 'Chargement…' : 'Actualiser'}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-[12px] border border-braise/30 bg-braise/5 px-4 py-3 text-sm text-braise">
          {error}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-[14px] border border-hairline bg-white px-6 py-16 text-center">
          <p className="text-base font-medium text-charcoal">
            {messages.length === 0
              ? 'Aucun message client enregistré pour le moment.'
              : 'Aucun message ne correspond à ce filtre.'}
          </p>
          <p className="mt-2 text-sm text-smoke">
            Toutes les demandes envoyées depuis /contact apparaîtront ici dès leur réception.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="divide-y divide-hairline overflow-hidden rounded-[14px] border border-hairline bg-white">
            {filtered.map((msg) => {
              const status = normalizeStatus(msg.status)
              const meta = STATUS_META[status]
              const isSelected = msg.id === selectedMessage?.id
              return (
                <button
                  key={msg.id}
                  type="button"
                  onClick={() => handleSelect(msg)}
                  className={`block w-full px-4 py-4 text-left transition sm:px-5 ${
                    isSelected
                      ? 'bg-sand/70 ring-1 ring-inset ring-charcoal/20'
                      : 'hover:bg-ivory'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-charcoal">
                      {msg.name}
                    </span>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${meta.badgeClass}`}
                    >
                      {meta.label}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-smoke">{msg.email}</p>
                  <p className="mt-2 truncate text-sm font-medium text-charcoal">
                    {msg.subject}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-smoke">
                    {msg.message}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between gap-2 text-[11px] text-smoke">
                    <span>{formatDate(msg.created_at)}</span>
                    {msg.order_ref && (
                      <span className="rounded bg-ivory px-2 py-0.5 font-mono text-[10px] text-charcoal">
                        {msg.order_ref}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {selectedMessage && (
            <article className="sticky top-6 rounded-[14px] border border-hairline bg-white p-5 sm:p-7">
              {(() => {
                const status = normalizeStatus(selectedMessage.status)
                const meta = STATUS_META[status]
                const replySubject = `Re: ${selectedMessage.subject}`
                const replyBody = `\n\n---\nMessage original (${selectedMessage.name}) :\n${selectedMessage.message}`
                const mailtoHref = `mailto:${selectedMessage.email}?subject=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(replyBody)}`

                return (
                  <>
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-hairline pb-5">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${meta.badgeClass}`}
                          >
                            {meta.label}
                          </span>
                          <span className="rounded bg-ivory px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-smoke">
                            {selectedMessage.locale || 'it'}
                          </span>
                          {selectedMessage.order_ref && (
                            <span className="rounded border border-hairline bg-ivory px-2.5 py-0.5 font-mono text-xs text-charcoal">
                              Réf : {selectedMessage.order_ref}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-3 text-xl font-semibold tracking-tight text-charcoal">
                          {selectedMessage.subject}
                        </h3>
                        <p className="mt-1 text-sm text-charcoal">
                          <strong>{selectedMessage.name}</strong> ·{' '}
                          <a
                            href={`mailto:${selectedMessage.email}`}
                            className="underline decoration-hairline underline-offset-4 hover:text-braise"
                          >
                            {selectedMessage.email}
                          </a>
                          <button
                            type="button"
                            onClick={() => copySenderEmail(selectedMessage.email)}
                            className="ml-2 rounded border border-hairline px-2 py-0.5 text-[11px] text-smoke transition hover:border-charcoal hover:text-charcoal"
                          >
                            {copiedEmail ? 'Copié' : 'Copier'}
                          </button>
                        </p>
                      </div>
                      <p className="text-xs text-smoke">
                        {formatDate(selectedMessage.created_at)}
                      </p>
                    </div>

                    <div className="py-6">
                      <p className="whitespace-pre-wrap text-sm leading-7 text-charcoal sm:text-[15px]">
                        {selectedMessage.message}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 border-t border-hairline pt-5">
                      <a
                        href={mailtoHref}
                        onClick={() => {
                          if (status !== 'replied') {
                            void handleStatusChange(selectedMessage.id, 'replied')
                          }
                        }}
                        className="inline-flex items-center gap-2 rounded-[8px] bg-charcoal px-4 py-2.5 text-xs font-medium text-white transition hover:bg-braise sm:text-sm"
                      >
                        Répondre via votre messagerie <span aria-hidden="true">↗</span>
                      </a>

                      {status !== 'replied' && (
                        <button
                          type="button"
                          disabled={updatingId === selectedMessage.id}
                          onClick={() => handleStatusChange(selectedMessage.id, 'replied')}
                          className="rounded-[8px] border border-hairline px-3.5 py-2.5 text-xs font-medium text-charcoal transition hover:border-charcoal disabled:opacity-50 sm:text-sm"
                        >
                          Marquer comme répondu
                        </button>
                      )}

                      {status !== 'archived' ? (
                        <button
                          type="button"
                          disabled={updatingId === selectedMessage.id}
                          onClick={() => handleStatusChange(selectedMessage.id, 'archived')}
                          className="rounded-[8px] border border-hairline px-3.5 py-2.5 text-xs font-medium text-smoke transition hover:border-charcoal hover:text-charcoal disabled:opacity-50 sm:text-sm"
                        >
                          Archiver
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={updatingId === selectedMessage.id}
                          onClick={() => handleStatusChange(selectedMessage.id, 'read')}
                          className="rounded-[8px] border border-hairline px-3.5 py-2.5 text-xs font-medium text-charcoal transition hover:border-charcoal disabled:opacity-50 sm:text-sm"
                        >
                          Désarchiver
                        </button>
                      )}
                    </div>
                  </>
                )
              })()}
            </article>
          )}
        </div>
      )}
    </section>
  )
}
