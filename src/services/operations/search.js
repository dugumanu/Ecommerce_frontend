

import { toast } from 'react-hot-toast';
import { apiconnector } from '../apiconnector';
import { searchEndpoints,  } from '../api';



export const searchByFilter = async ( formData) => {
    const toastId = toast.loading("Searching...");
    //console.log("FormData : ", formData)
    try {
        const response = await apiconnector("POST", searchEndpoints.SEARCH_BY_FILTER(formData.query), formData);
        //console.log("API Response: ", response);
        if (response?.data?.success) {
            toast.success("Search completed successfully");
            return response.data.products; 
        } else {
            throw new Error("Search failed");
        }
    } catch (error) {
        // toast.error("Failed to search");
        // console.error("SEARCH ERROR:", error);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};


export const searchAll = async (query) => {
    const toastId = toast.loading("Searching...");
    try {
        const response = await apiconnector("POST", searchEndpoints.SEARCH_ALL(query));
        if (response?.data?.success) {
            toast.success("Search completed successfully");
            return response.data.products; 
        } else {
            throw new Error("Search failed");
        }
    } catch (error) {
        // toast.error("Failed to search");
        // console.error("SEARCH ERROR:", error);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};

