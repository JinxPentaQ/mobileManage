import { http } from "@/utils/http/axios";
import { BaseResponse } from "../utils";

export interface BasicResponseModel<T = any> {
  code: string;
  message: string;
  data: T;
}

export type systemDetailResult = BaseResponse<{
  id: number;
  configName: string;
  configKey: string;
  configValue: string;
  status: number;
}>;

export type UserResult = {
  code: string;
  data: {
    nickname: string;
    roleName: string;
    originName: string;
    googleAuth: string;
    lastLoginTime: string;
    lastLoginIp: string;
  };
  message: string;
};

/**
 * @description: 用户登录
 */
export function login(params: any) {
  return http.request<BasicResponseModel>(
    {
      url: "/login",
      method: "POST",
      params: params,
    },
    {
      isTransformResponse: false,
    },
  );
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request(
    {
      url: "/user/getMyInfo",
      method: "get",
    },
    {
      isTransformResponse: false,
    },
  );
}

/**
 * @description: 用户登出
 */
export function doLogout() {
  return http.request({
    url: "/logout",
    method: "POST",
  });
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params: any, uid: any) {
  return http.request(
    {
      url: `/user/u${uid}/changepw`,
      method: "POST",
      params,
    },
    {
      isTransformResponse: false,
    },
  );
}

export const getSysConfig = () => {
  return http.request(
    {
      url: "/sysConfig",
      method: "get",
    },
    {
      isTransformResponse: false,
    },
  );
};
