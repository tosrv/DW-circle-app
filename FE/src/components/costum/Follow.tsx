import { getUsers } from "@/services/user.api";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { User } from "@/types/user";
import { useEffect, useState } from "react";

export default function Follow() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();

        setUsers(res.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-3 bg-gray-900 rounded-md">
      <h2 className="font-bold text-xl">Suggested for you</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Card className="bg-transparent border-0 pb-0">
              <CardContent className="flex justify-between py-0 px-2">
                <CardHeader className="p-0 w-full">
                  <div className="flex gap-3">
                    <img
                      src="https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
                      alt="Avatar"
                      className="w-12 rounded-full"
                    />
                    <CardTitle className="w-full space-y-1">
                      <h3>{user.full_name}</h3>
                      <h4 className="text-gray-500">@{user.username}</h4>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardAction>
                  <Button variant="outline" className="rounded-2xl">
                    Follow
                  </Button>
                </CardAction>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
