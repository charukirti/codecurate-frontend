import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, type SignInInput } from '@/features/auth/schemas/auth.schema';
import { useNavigate } from '@tanstack/react-router';
import { useSignInMutation } from '@/features/auth/mutations/use-sign-in';

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const navigate = useNavigate();

  const { mutate: signIn } = useSignInMutation();

  const onSubmit = (data: SignInInput) => {
    signIn(data, {
      onSuccess: () => {
        navigate({ to: '/' });
      },
    });
  };
  return (
    <Card className="w-full max-w-sm border-neutral-800 bg-neutral-900/80 text-neutral-50 shadow-sm">
      <CardHeader className="flex flex-col space-y-1.5 ">
        <CardTitle className="text-3xl font-semibold leading-none tracking-tight">Sign in</CardTitle>
        <CardDescription className="text-sm text-neutral-400">
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              placeholder="you@example.com"
              className="text-neutral-100 bg-neutral-900 placeholder:text-neutral-500"
              type="email"
              {...register('email')}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              placeholder="••••••••"
              className="text-neutral-100 bg-neutral-900 placeholder:text-neutral-500"
              type="password"
              {...register('password')}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </Field>
          <Button type="submit" className="w-full" disabled={isSubmitting} variant={'default'}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center p-6 pt-0">
        <p className="text-sm text-neutral-500">
          Don't have an account?{' '}
          <a href="/sign-up" className="text-neutral-200 underline underline-offset-4 hover:text-white">
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
