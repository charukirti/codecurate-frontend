import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSignup } from '@/features/auth/mutations/use-signup';
import { signUpSchema, type SignUpInput } from '@/features/auth/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

export function SignUpForm() {
  const roleItems = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  const { mutate: signUp } = useSignup();

  const onSubmit = (data: SignUpInput) => {
    signUp(data, {
      onSuccess: () => {
        navigate({ to: '/auth/sign-in' });
      },
    });
  };

  return (
    <Card className="w-full max-w-md border-neutral-800 bg-neutral-900/80 text-neutral-50 shadow-sm">
      <CardHeader className="flex flex-col space-y-1.5 ">
        <CardTitle className="text-3xl font-semibold leading-none tracking-tight">Sign up</CardTitle>
        <CardDescription className="text-sm text-neutral-400">
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="name">Enter your name</FieldLabel>
              <Input
                id="name"
                placeholder="Enter your name"
                className="text-neutral-100 bg-neutral-900 placeholder:text-neutral-500"
                type="text"
                {...register('name')}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Enter your username</FieldLabel>
              <Input
                id="username"
                placeholder="Enter your username"
                className="text-neutral-100 bg-neutral-900 placeholder:text-neutral-500"
                type="text"
                {...register('username')}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Enter your email</FieldLabel>
            <Input
              id="email"
              placeholder="you@example.com"
              className="text-neutral-100 bg-neutral-900 placeholder:text-neutral-500"
              type="email"
              {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Enter your password</FieldLabel>
            <Input
              id="password"
              placeholder="••••••••"
              className="text-neutral-100 bg-neutral-900 placeholder:text-neutral-500"
              type="password"
              {...register('password')}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </Field>

          <Field>
            <FieldLabel htmlFor="small-form-role">Select your role</FieldLabel>
            <Select items={roleItems} defaultValue={roleItems[0].value}>
              <SelectTrigger id="small-form-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {roleItems.map((item) => (
                    <SelectItem key={item.value} value={item.value} {...register('role')}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
          </Field>

          <Button type="submit" className="w-full">
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center pt-0">
        <p className="text-sm text-neutral-500">
          Already have an account?{' '}
          <a href="/sign-in" className="text-neutral-200 underline underline-offset-4 hover:text-white">
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
