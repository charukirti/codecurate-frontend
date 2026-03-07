import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForgotPassword } from '@/features/auth/mutations/use-forgot-password';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/features/auth/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate, isPending, isSuccess } = useForgotPassword();

  const onSubmit = (data: ForgotPasswordInput) => {
    mutate(data.email);
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-sm border-neutral-800 bg-neutral-900/80 text-neutral-50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription className="text-neutral-400">
            We've sent a password reset link to your email. Check your inbox.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link to="/auth/sign-in" className="text-sm text-neutral-200 underline underline-offset-4 hover:text-white">
            Back to sign in
          </Link>
        </CardFooter>
      </Card>
    );
  }
  return (
    <Card className="w-full max-w-sm border-neutral-800 bg-neutral-900/80 text-neutral-50 shadow-sm">
      <CardHeader className="flex flex-col space-y-1.5">
        <CardTitle className="text-3xl font-semibold leading-none tracking-tight">Forgot password</CardTitle>
        <CardDescription className="text-sm text-neutral-400">
          Enter your email and we'll send you a reset link.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              placeholder="you@example.com"
              type="email"
              className="text-neutral-100 bg-neutral-900 placeholder:text-neutral-500"
              {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </Field>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Sending...' : 'Send reset link'}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center pt-0">
        <p className="text-sm text-neutral-500">
          Remember your password?{' '}
          <Link to="/auth/sign-in" className="text-neutral-200 underline underline-offset-4 hover:text-white">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
