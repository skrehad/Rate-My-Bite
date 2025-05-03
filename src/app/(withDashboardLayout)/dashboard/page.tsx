"use client"
import AdminDashboard from '@/components/module/dashboard/admin/AdminDashboard'
import UserDashboard from '@/components/module/dashboard/user/UserDashboard'
import { useAuth } from '@/provider/UserProvider'
import React from 'react'

export default function DashboardPage() {
    const { user } = useAuth()!

    return (
        <div>
            {
                user?.role === "ADMIN" ? <AdminDashboard /> : <UserDashboard />
            }
        </div>
    )
}
