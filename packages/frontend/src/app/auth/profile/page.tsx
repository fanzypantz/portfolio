import { redirect } from "next/navigation";
import { getSessionPayload } from "@lib/Auth/sessions";
import { getUser } from "@lib/Auth/getters/getUser";

const ProfilePage = async () => {
  const session = await getSessionPayload();
  if (!session) {
    return redirect("/auth/login");
  }

  const user = await getUser(session.id);
  if (!user) {
    return redirect("/auth/login");
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default ProfilePage;
