import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="h-fit bg-gray-900 p-5 rounded-md">
      <h2 className="font-bold text-xl">My Profile</h2>
      <section className="relative w-full py-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYO0HBlSwjaclJpc1omQSTgeaTV9sZi9aFw&s"
          alt="Banner"
          className="rounded-md h-30 w-full"
        />
        <div className="flex justify-end mt-3">
          {user?.photo_profile ? (
            <img
              src={user.photo_profile}
              alt="Avatar"
              className="h-25 border-4 rounded-full bg-gray-900 absolute bottom-2 left-10"
            />
          ) : (
            <img
              src="https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
              alt="Avatar"
              className="h-25 border-4 rounded-full bg-gray-900 absolute bottom-2 left-10"
            />
          )}
          <Button variant="outline" className="rounded-2xl">
            Edit Profil
          </Button>
        </div>
      </section>
      <div className="space-y-2">
        <h3 className="font-semibold text-2xl">{user!.full_name}</h3>
        <h4 className="text-gray-500">@{user!.username}</h4>
        <h5>Bio</h5>
        <section className="space-x-3">
          <span>Following</span>
          <span>Followers</span>
        </section>
      </div>
    </div>
  );
}
