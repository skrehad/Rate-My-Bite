"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Camera, ChevronsUpDown, Loader2, LogOut, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const profileFormSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    bio: z.string().max(160, {
        message: "Bio must not be longer than 160 characters.",
    }),
    urls: z.object({
        website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
        twitter: z.string().optional().or(z.literal("")),
        github: z.string().optional().or(z.literal("")),
    }),
    jobTitle: z.string().optional(),
    company: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "I'm a software developer based in New York. I specialize in building web applications using React and Next.js.",
    urls: {
        website: "https://johndoe.com",
        twitter: "johndoe",
        github: "johndoe",
    },
    jobTitle: "Senior Developer",
    company: "Acme Inc",
}

export default function ProfilePage() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })

    function onSubmit(data: ProfileFormValues) {
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            console.log(data)
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="container max-w-6xl py-10">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                    <p className="text-muted-foreground">Manage your account settings and set your preferences.</p>
                </div>

                <div className="grid grid-cols-1 border-2 border-red-400 gap-8 md:grid-cols-[1fr_3fr]">
                    {/* Profile sidebar */}
                    <div className="flex flex-col gap-6">
                        <Card>
                            <CardContent className="p-6 flex flex-col items-center gap-4">
                                <div className="relative">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background"
                                    >
                                        <Camera className="h-4 w-4" />
                                        <span className="sr-only">Change profile picture</span>
                                    </Button>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <h2 className="text-xl font-semibold">{defaultValues.name}</h2>
                                    <p className="text-sm text-muted-foreground">{defaultValues.jobTitle}</p>
                                </div>
                                <div className="flex gap-2">
                                    {/* <Button variant="outline" size="sm" className="w-full">
                                        <Mail className="mr-2 h-4 w-4" />
                                        Message
                                    </Button> */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full">
                                                <User className="mr-2 h-4 w-4" />
                                                Account
                                                <ChevronsUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Settings</DropdownMenuItem>
                                            <DropdownMenuItem>Support</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Log out
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">Member since</p>
                                    <p className="text-sm text-muted-foreground">Jan 2023</p>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">Projects</p>
                                    <p className="text-sm text-muted-foreground">12</p>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">Contributions</p>
                                    <p className="text-sm text-muted-foreground">248</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main content */}
                    <div className="flex flex-col border-2 border-green-400 gap-8">
                        <Tabs defaultValue="profile" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="profile">Profile</TabsTrigger>
                                <TabsTrigger value="account">Account</TabsTrigger>
                                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                            </TabsList>

                            {/* Profile Tab */}
                            <TabsContent value="profile">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Profile Information</CardTitle>
                                        <CardDescription>
                                            Update your profile information. This information will be displayed publicly.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                                <div className="grid gap-5">
                                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                                        <FormField
                                                            control={form.control}
                                                            name="name"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Your name" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="email"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Email</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Your email" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                                        <FormField
                                                            control={form.control}
                                                            name="jobTitle"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Job Title</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Your job title" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="company"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Company</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="Your company" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <FormField
                                                        control={form.control}
                                                        name="bio"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Bio</FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        placeholder="Tell us a little bit about yourself"
                                                                        className="resize-none"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormDescription>
                                                                    You can <span>@mention</span> other users and organizations.
                                                                </FormDescription>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <div>
                                                        <h3 className="mb-4 text-sm font-medium">Social Links</h3>
                                                        <div className="grid gap-5">
                                                            <FormField
                                                                control={form.control}
                                                                name="urls.website"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Website</FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="https://example.com" {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                                                <FormField
                                                                    control={form.control}
                                                                    name="urls.twitter"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>Twitter</FormLabel>
                                                                            <FormControl>
                                                                                <Input placeholder="@username" {...field} />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={form.control}
                                                                    name="urls.github"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>GitHub</FormLabel>
                                                                            <FormControl>
                                                                                <Input placeholder="username" {...field} />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button type="submit" disabled={isLoading}>
                                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                    {isLoading ? "Saving..." : "Save changes"}
                                                </Button>
                                            </form>
                                        </Form>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Account Tab */}
                            <TabsContent value="account">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Account Settings</CardTitle>
                                        <CardDescription>Manage your account settings and preferences.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Email Preferences</h3>
                                            <div className="grid gap-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="marketing">Marketing emails</Label>
                                                        <p className="text-sm text-muted-foreground">
                                                            Receive emails about new products, features, and more.
                                                        </p>
                                                    </div>
                                                    <Switch id="marketing" defaultChecked />
                                                </div>
                                                <Separator />
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="updates">Product updates</Label>
                                                        <p className="text-sm text-muted-foreground">
                                                            Receive emails about product updates and changes.
                                                        </p>
                                                    </div>
                                                    <Switch id="updates" defaultChecked />
                                                </div>
                                                <Separator />
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="comments">Comments</Label>
                                                        <p className="text-sm text-muted-foreground">
                                                            Receive emails when someone comments on your posts.
                                                        </p>
                                                    </div>
                                                    <Switch id="comments" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Language and Region</h3>
                                            <div className="grid gap-4">
                                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="language">Language</Label>
                                                        <Select defaultValue="en">
                                                            <SelectTrigger id="language">
                                                                <SelectValue placeholder="Select language" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="en">English</SelectItem>
                                                                <SelectItem value="fr">French</SelectItem>
                                                                <SelectItem value="de">German</SelectItem>
                                                                <SelectItem value="es">Spanish</SelectItem>
                                                                <SelectItem value="pt">Portuguese</SelectItem>
                                                                <SelectItem value="ja">Japanese</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="timezone">Timezone</Label>
                                                        <Select defaultValue="utc-5">
                                                            <SelectTrigger id="timezone">
                                                                <SelectValue placeholder="Select timezone" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="utc-12">UTC-12:00</SelectItem>
                                                                <SelectItem value="utc-11">UTC-11:00</SelectItem>
                                                                <SelectItem value="utc-10">UTC-10:00</SelectItem>
                                                                <SelectItem value="utc-9">UTC-09:00</SelectItem>
                                                                <SelectItem value="utc-8">UTC-08:00</SelectItem>
                                                                <SelectItem value="utc-7">UTC-07:00</SelectItem>
                                                                <SelectItem value="utc-6">UTC-06:00</SelectItem>
                                                                <SelectItem value="utc-5">UTC-05:00</SelectItem>
                                                                <SelectItem value="utc-4">UTC-04:00</SelectItem>
                                                                <SelectItem value="utc-3">UTC-03:00</SelectItem>
                                                                <SelectItem value="utc-2">UTC-02:00</SelectItem>
                                                                <SelectItem value="utc-1">UTC-01:00</SelectItem>
                                                                <SelectItem value="utc">UTC</SelectItem>
                                                                <SelectItem value="utc+1">UTC+01:00</SelectItem>
                                                                <SelectItem value="utc+2">UTC+02:00</SelectItem>
                                                                <SelectItem value="utc+3">UTC+03:00</SelectItem>
                                                                <SelectItem value="utc+4">UTC+04:00</SelectItem>
                                                                <SelectItem value="utc+5">UTC+05:00</SelectItem>
                                                                <SelectItem value="utc+6">UTC+06:00</SelectItem>
                                                                <SelectItem value="utc+7">UTC+07:00</SelectItem>
                                                                <SelectItem value="utc+8">UTC+08:00</SelectItem>
                                                                <SelectItem value="utc+9">UTC+09:00</SelectItem>
                                                                <SelectItem value="utc+10">UTC+10:00</SelectItem>
                                                                <SelectItem value="utc+11">UTC+11:00</SelectItem>
                                                                <SelectItem value="utc+12">UTC+12:00</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Security</h3>
                                            <div className="grid gap-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="2fa">Two-factor authentication</Label>
                                                        <p className="text-sm text-muted-foreground">
                                                            Add an extra layer of security to your account.
                                                        </p>
                                                    </div>
                                                    <Switch id="2fa" />
                                                </div>
                                                <Separator />
                                                <div className="flex flex-col gap-2">
                                                    <Label htmlFor="password">Change password</Label>
                                                    <div className="flex gap-2">
                                                        <Input id="password" type="password" placeholder="••••••••" />
                                                        <Button variant="outline">Change</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save account settings</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            {/* Notifications Tab */}
                            <TabsContent value="notifications">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Notification Preferences</CardTitle>
                                        <CardDescription>Choose how you want to be notified about activity.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Push Notifications</h3>
                                            <div className="grid gap-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="push-all">All notifications</Label>
                                                        <p className="text-sm text-muted-foreground">Receive all push notifications.</p>
                                                    </div>
                                                    <Switch id="push-all" defaultChecked />
                                                </div>
                                                <Separator />
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="push-mentions">Mentions</Label>
                                                        <p className="text-sm text-muted-foreground">
                                                            Receive push notifications when you are mentioned.
                                                        </p>
                                                    </div>
                                                    <Switch id="push-mentions" defaultChecked />
                                                </div>
                                                <Separator />
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="push-messages">Direct messages</Label>
                                                        <p className="text-sm text-muted-foreground">
                                                            Receive push notifications for direct messages.
                                                        </p>
                                                    </div>
                                                    <Switch id="push-messages" defaultChecked />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium">Email Notifications</h3>
                                            <div className="grid gap-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="email-all">All notifications</Label>
                                                        <p className="text-sm text-muted-foreground">Receive all notifications via email.</p>
                                                    </div>
                                                    <Switch id="email-all" />
                                                </div>
                                                <Separator />
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="email-mentions">Mentions</Label>
                                                        <p className="text-sm text-muted-foreground">
                                                            Receive email notifications when you are mentioned.
                                                        </p>
                                                    </div>
                                                    <Switch id="email-mentions" defaultChecked />
                                                </div>
                                                <Separator />
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="email-messages">Direct messages</Label>
                                                        <p className="text-sm text-muted-foreground">
                                                            Receive email notifications for direct messages.
                                                        </p>
                                                    </div>
                                                    <Switch id="email-messages" />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save notification preferences</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

