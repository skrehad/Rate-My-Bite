"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowLeft, CheckCircle2, Eye, EyeOff, KeyRound } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function ResetPassword() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const calculatePasswordStrength = (password: string): number => {
        if (!password) return 0

        let strength = 0
        if (password.length >= 8) strength += 25
        if (/[A-Z]/.test(password)) strength += 25
        if (/[0-9]/.test(password)) strength += 25
        if (/[^A-Za-z0-9]/.test(password)) strength += 25

        return strength
    }

    const passwordStrength = calculatePasswordStrength(password)

    const getStrengthColor = (strength: number): string => {
        if (strength <= 25) return "bg-red-500"
        if (strength <= 50) return "bg-orange-500"
        if (strength <= 75) return "bg-yellow-500"
        return "bg-green-500"
    }

    const getStrengthText = (strength: number): string => {
        if (strength <= 25) return "Weak"
        if (strength <= 50) return "Fair"
        if (strength <= 75) return "Good"
        return "Strong"
    }

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        setTimeout(() => {
            if (password !== confirmPassword) {
                setError("Passwords do not match")
                setLoading(false)
                return
            }

            if (password.length < 8) {
                setError("Password must be at least 8 characters")
                setLoading(false)
                return
            }

            setLoading(false)
            setSuccess(true)
        }, 1500)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                        <KeyRound className="h-8 w-8 text-purple-600" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Reset your password</h1>
                    <p className="mt-2 text-sm text-gray-600">Create a strong password for your account</p>
                </div>

                <Card className="border-none shadow-lg shadow-purple-100">
                    <CardContent className="pt-6">
                        {error && (
                            <Alert variant="destructive" className="mb-4 animate-in fade-in slide-in-from-top-5">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {success ? (
                            <div className="animate-in fade-in slide-in-from-bottom-5">
                                <div className="mb-4 flex justify-center">
                                    <div className="rounded-full bg-green-100 p-3">
                                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                                    </div>
                                </div>
                                <h3 className="mb-2 text-center text-lg font-medium">Password updated</h3>
                                <p className="mb-4 text-center text-sm text-gray-600">
                                    Your password has been successfully reset. You can now log in with your new password.
                                </p>
                                <Button asChild className="w-full bg-purple-600 py-6 text-base font-medium hover:bg-purple-700">
                                    <Link href="/login">Go to Login</Link>
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleResetPassword} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium">
                                        New Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="h-11 pr-10 transition-all focus:ring-2 focus:ring-purple-600 focus:ring-offset-1"
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                        </Button>
                                    </div>

                                    {password && (
                                        <div className="mt-2 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-gray-500">Password strength:</span>
                                                <span
                                                    className={`text-xs font-medium ${passwordStrength <= 25
                                                        ? "text-red-500"
                                                        : passwordStrength <= 50
                                                            ? "text-orange-500"
                                                            : passwordStrength <= 75
                                                                ? "text-yellow-500"
                                                                : "text-green-500"
                                                        }`}
                                                >
                                                    {getStrengthText(passwordStrength)}
                                                </span>
                                            </div>
                                            <Progress
                                                value={passwordStrength}
                                                className="h-1.5"
                                                indicatorClassName={getStrengthColor(passwordStrength)}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                        Confirm New Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="h-11 pr-10 transition-all focus:ring-2 focus:ring-purple-600 focus:ring-offset-1"
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                                        </Button>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-purple-600 py-6 text-base font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-600 focus:ring-offset-1"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            Updating...
                                        </div>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-center border-t p-4">
                        <Link
                            href="/login"
                            className="group flex items-center text-sm text-gray-600 transition-colors hover:text-purple-600"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to login
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
