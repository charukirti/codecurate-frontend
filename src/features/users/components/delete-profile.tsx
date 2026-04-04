import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDeleteProfile } from '@/features/users/mutations/use-delete-profile';
import { deleteProfileSchema, type DeleteProfileInput } from '@/features/users/schemas/users.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function DeleteProfile() {
  const { mutate } = useDeleteProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeleteProfileInput>({
    resolver: zodResolver(deleteProfileSchema),
    defaultValues: {
      password: '',
    },
  });

  function onSubmit(data: DeleteProfileInput) {
    mutate(data);
  }
  return (
    <form id="delete-profile-form" className="flex flex-col gap-5 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          className="w-full"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
    </form>
  );
}
