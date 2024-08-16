import { _get } from "@utils/fetching";
import { getAuthToken } from "@utils/auth-server";

export const getRamosByUser = async () => {
    const authToken = await getAuthToken();
    
    return await _get(`/admin/branches_by_user`, authToken as string);
}
