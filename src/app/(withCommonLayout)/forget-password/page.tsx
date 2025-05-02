"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowLeft, CheckCircle2, Mail } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            setSuccess(true)
        }, 1500)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                        <Mail className="h-8 w-8 text-purple-600" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Forgot your password?</h1>
                    <p className="mt-2 text-sm text-gray-600">No worries, we&apos;ll send you reset instructions.</p>
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
                                <h3 className="mb-2 text-center text-lg font-medium">Check your email</h3>
                                <p className="mb-4 text-center text-sm text-gray-600">
                                    We&apos;ve sent a password reset link to <span className="font-medium">{email || "your email"}</span>.
                                </p>
                                <p className="text-center text-xs text-gray-500">
                                    Didn&apos;t receive the email? Check your spam folder or{" "}
                                    <button className="text-purple-600 hover:text-purple-800 hover:underline">try another email</button>.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleResetPassword} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        Email address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-11 transition-all focus:ring-2 focus:ring-purple-600 focus:ring-offset-1"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-purple-600 py-6 text-base font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-600 focus:ring-offset-1"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            Sending...
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
