import myAxios from "../plugins/myAxios";
import {setCurrentUserState, getCurrentUserState} from "../states/user";
import {AxiosResponse} from "axios";

export const getCurrentUser = async () => {
    const currentUser = getCurrentUserState();
    if (currentUser) {
        return currentUser;
    }
    // 不存在则从远程获取
    const res: AxiosResponse['data'] = await myAxios.get('/user/current');
    if (res.code === 0) {
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}

