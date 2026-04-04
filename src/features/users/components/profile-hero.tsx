import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useGetCurrentUser } from '@/features/auth/queries/useGetCurrentUser';
import { DeleteProfile } from '@/features/users/components/delete-profile';
import { UpdateProfile } from '@/features/users/components/update-profile';
import type { PublicProfile } from '@/features/users/types/users.types';
import { CalendarDays } from 'lucide-react';
import { useState } from 'react';

interface ProfileHeroProps {
  profile: PublicProfile;
}

export function ProfileHero({ profile }: ProfileHeroProps) {
  const [open, setIsOpen] = useState(false);
  const { data } = useGetCurrentUser();
  const isOwner = data?.data.username === profile.username;
  return (
    <section className="border-b border-neutral-800 py-10 flex gap-4">
      <div className="container mx-auto px-4 ">
        <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center text-neutral-100 font-bold text-lg mb-4">
          {profile.username[0].toUpperCase()}
        </div>

        <h1 className="text-3xl font-bold text-neutral-100 mb-1 capitalize">{profile.name}</h1>
        <h3 className="text-lg font-bold text-neutral-100 mb-1">@{profile.username}</h3>

        <div className="flex items-center gap-1.5 text-neutral-500 text-sm">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>
            Joined{' '}
            {new Date(profile.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
      {isOwner && (
        <Dialog open={open} onOpenChange={setIsOpen}>
          <DialogTrigger
            render={
              <Button variant={'outline'} size="sm" className=" text-white text-xs">
                Edit Profile
              </Button>
            }
          />

          <DialogContent className="bg-neutral-900 border-neutral-800 max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-neutral-100">Update your profile</DialogTitle>
            </DialogHeader>

            <UpdateProfile currentName={profile.name} currentUsername={profile.username} />
          </DialogContent>
        </Dialog>
      )}

      {isOwner && (
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant={'destructive'}>Delete Profile</Button>} />

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="mb-2">
                Are you sure you want to delete your profile? This action cannot be undone.
              </AlertDialogTitle>

              <DeleteProfile />
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction form="delete-profile-form" type="submit" className="bg-red-500 hover:bg-red-600">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </section>
  );
}
