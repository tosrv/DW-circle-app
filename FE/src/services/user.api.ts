import { api } from "./api";

export async function getUsers() {
    return await api.get("/users", { withCredentials: true });
}