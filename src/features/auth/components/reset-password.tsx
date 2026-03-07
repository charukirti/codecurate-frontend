import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useResetPassword } from '@/features/auth/mutations/use-reset-password';
import { resetPasswordSchema, type ResetPasswordInput } from '@/features/auth/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

export function ResetPassword() {
  const { token } = useSearch({ from: '/auth/reset-password' });
  const navigate = useNavigate();
  const { mutate, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token },
  });

  const onSubmit = (data: ResetPasswordInput) => {
    mutate(data, {
      onSuccess: () => navigate({ to: '/auth/sign-in' }),
    });
  };

  return (
    <Card className="w-full max-w-md border-neutral-800 bg-neutral-900/80 text-neutral-50 shadow-sm">
      <CardHeader className="flex flex-col space-y-1.5">
        <CardTitle className="text-3xl font-semibold leading-none">Reset Password</CardTitle>
        <CardDescription className="text-sm text-neutral-400">
          Please enter your new password below. Make sure to choose a strong and secure password to protect your
          account.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <FieldLabel htmlFor="password">New Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your new password"
              className="text-neutral-100 bg-neutral-900 placeholder:text-neutral-500"
              {...register('newPassword')}
            />
            {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
          </Field>

          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
            <Input
              id="confirm-password"
              placeholder="••••••••"
              type="password"
              className="text-neutral-100 bg-neutral-900 placeholder:text-neutral-500"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </Field>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Resetting...' : 'Reset password'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center pt-0">
        <p className="text-sm text-neutral-500">
          Back to{' '}
          <Link to="/auth/sign-in" className="text-neutral-200 underline underline-offset-4 hover:text-white">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
