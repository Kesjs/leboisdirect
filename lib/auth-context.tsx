'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

type AuthContextValue = {
  user: User | null
  isAdmin: boolean
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), [])
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const resolveRole = useCallback(async (currentUser: User | null) => {
    if (!currentUser) {
      setIsAdmin(false)
      return
    }
    const { data } = await supabase
      .from('braviko_admins')
      .select('active')
      .eq('user_id', currentUser.id)
      .maybeSingle()
    setIsAdmin(Boolean(data?.active))
  }, [supabase])

  useEffect(() => {
    let active = true
    const fallback = window.setTimeout(() => {
      if (active) setLoading(false)
    }, 5000)
    supabase.auth.getUser().then(async ({ data }: { data: { user: User | null } }) => {
      if (!active) return
      window.clearTimeout(fallback)
      const currentUser = data.user ?? null
      setUser(currentUser)
      await resolveRole(currentUser)
      setLoading(false)
    }).catch(() => { if (active) { window.clearTimeout(fallback); setUser(null); setIsAdmin(false); setLoading(false) } })
    const { data: listener } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      window.setTimeout(async () => {
        await resolveRole(currentUser)
        setLoading(false)
      }, 0)
    })
    return () => {
      active = false
      window.clearTimeout(fallback)
      listener.subscription.unsubscribe()
    }
  }, [resolveRole, supabase])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut({ scope: 'local' })
    setIsAdmin(false)
  }, [supabase])

  const value = useMemo(() => ({ user, isAdmin, loading, signOut }), [user, isAdmin, loading, signOut])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
