import { AxiosRequestConfig } from "axios";

export interface IActions {
	endpoint: string;
	pendingMessage?: string;
	successMessage?: string;
	failureMessage?: string;
	role?: "USER" | "ADMIN";
}

export const SERVER_ROOT_URL = "http://webserver:4000";
// process.env.NODE_ENV === "production"
// 	? "https://taxtds.herokuapp.com"
// 	: "http://localhost:4000";
export const JWT_AUTH = "jwtAuth";
export const LAST_LOGIN = "lastLogin";

export const defaultHeader: AxiosRequestConfig<string> = {
	headers: {
		"Content-type": "application/json",
	},
};

export const tokenHeader: AxiosRequestConfig<string> = {
	headers: {
		...defaultHeader.headers,
		Authorization: localStorage.getItem(JWT_AUTH) || "",
	},
};

export const formatResponseMessage = (msg?: string) => {
	if (msg) {
		return msg.replaceAll("\\", "").replaceAll('"', "");
	}
};

export const cloudinaryInitial = `https://res.cloudinary.com/${process.env.NODE_ENV === "production" ? "taxtds" : "drdo5t5sl"}/image/upload/`;
