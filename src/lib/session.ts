import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const getCurrentUser = async () => {
    const session = await getServerSession(authOptions);

    return session?.user;
}
export default getCurrentUser;