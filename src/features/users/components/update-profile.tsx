import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdateProfile } from '@/features/users/mutations/use-update-profile';
import { updateProfileSchema, type UpdateProfileInput } from '@/features/users/schemas/users.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface UpdateProfileProps {
  currentName: string;
  currentUsername: string;
}

export function UpdateProfile({ currentName, currentUsername }: UpdateProfileProps) {
  const { mutate, isPending, isError } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: currentName,
      username: currentUsername,
    },
  });

  function onSubmit(data: UpdateProfileInput) {
    const payload = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== '')) as {
      name?: string;
      username?: string;
    };

    mutate(payload);
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" {...register('name')} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="Enter your username" {...register('username')} />
        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
      </div>

      {isError && <p className="text-sm text-red-500">Failed to update profile. Please try again.</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  );
}
