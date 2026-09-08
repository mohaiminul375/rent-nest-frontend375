"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LoginAction } from "../_actions/authActions"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const LoginForm = () => {
    const [state, action, pending] = useActionState(LoginAction, false);
    useEffect(() => {
        if (!state) return
        if (state.success) {
            toast.success('Login Successfully');
        }
        if (!state.success) {
            toast.error('Login Successfully')
        }
    }, [state])
    return (
        <form className="space-y-4" action={action}>
            <Card className="p-5 space-y-4">
                <Input name="email" type="email" placeholder="enter your email" required />
                <Input name="password" type="password" placeholder="enter your password" required />
                <Button type="submit">
                    {
                        pending ? "submitting.." : "Login"
                    }
                </Button>
            </Card>
        </form>
    )
}

export default LoginForm
