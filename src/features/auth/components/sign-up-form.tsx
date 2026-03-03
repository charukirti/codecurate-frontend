import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SignUpForm() {
  const roleItems = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
  ];
  return (
    <Card className="w-full max-w-md border-neutral-800 bg-neutral-900/80 text-neutral-50 shadow-sm">
      <CardHeader className="flex flex-col space-y-1.5 ">
        <CardTitle className="text-3xl font-semibold leading-none tracking-tight">Sign up</CardTitle>
        <CardDescription className="text-sm text-neutral-400">
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="name">Enter your name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                className="text-neutral-100 bg-neutral-900 placeholder:text-neutral-500"
                type="text"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Enter your username</FieldLabel>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username"
                className="text-neutral-100 bg-neutral-900 placeholder:text-neutral-500"
                type="text"
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Enter your email</FieldLabel>
            <Input
              id="email"
              name="email"
              placeholder="you@example.com"
              className="text-neutral-100 bg-neutral-900 placeholder:text-neutral-500"
              type="email"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Enter your password</FieldLabel>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              className="text-neutral-100 bg-neutral-900 placeholder:text-neutral-500"
              type="password"
            />
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
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Button type="submit" className="w-full">
            Sign up
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
