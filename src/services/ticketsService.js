import axiosInstance from "../utils/axios";

export const getTickets = async () => {
    try {
        const response = await axiosInstance.get("/getTickets");
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};