import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function ForgotPasswordForm() {
  return (
    <Card className="w-full max-w-sm border-neutral-800 bg-neutral-900/80 text-neutral-50 shadow-sm">
      <CardHeader className="flex flex-col space-y-1.5">
        <CardTitle className="text-3xl font-semibold leading-none tracking-tight">Forgot password</CardTitle>
        <CardDescription className="text-sm text-neutral-400">
          Enter your email and we'll send you a reset link.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <form className="space-y-4">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              placeholder="you@example.com"
              type="email"
              className="text-neutral-100 bg-neutral-900 placeholder:text-neutral-500"
            />
          </Field>

          <Button type="submit" className="w-full">
            Send reset link
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center pt-0">
        <p className="text-sm text-neutral-500">
          Remember your password?{' '}
          <a href="/auth/sign-in" className="text-neutral-200 underline underline-offset-4 hover:text-white">
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
