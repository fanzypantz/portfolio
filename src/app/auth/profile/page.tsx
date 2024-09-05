import { getUserProfileAction } from "@lib/Auth/actions/getUserProfile";
import { redirect } from "next/navigation";
import { getSessionPayload } from "@lib/Auth/sessions";

const ProfilePage = async () => {
  const session = await getSessionPayload();
  if (!session) {
    return redirect("/auth/login");
  }

  const user = await getUserProfileAction(session.id);
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
