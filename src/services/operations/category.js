

import { toast } from 'react-hot-toast';
import { categoryEndpoints } from '../api';
import { apiconnector } from '../apiconnector';
import axios from 'axios';
const {CREATECATEGORY, GET_ALL_CATEGORY , GET_CATEGORY_BY_ID, DELETE_CATEGORY_BY_ID } = categoryEndpoints




export const createCategory = async (categoryData,token) => {
    const toastId = toast.loading("Creating category...");
    console.log("token ", token)
    try {
        // Define headers
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,  // replace `token` with the actual authorization token
        };

        // Send request with headers and JSON data
        const response = await axios.post(CREATECATEGORY, categoryData, { headers });

        // Handle success response
        if (response?.data?.success) {
            toast.success("Category created successfully");
            return response.data.category;
        } else {
            throw new Error(response.data.message || "Failed to create category");
        }
    } catch (error) {
        // Handle error response
        toast.error("Failed to create category");
        console.error("CREATE CATEGORY ERROR:", error);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};


export const fetchCategoryById = async (id) => {
    const toastId = toast.loading("Loading category...");
    try {
        const response = await apiconnector("GET", GET_CATEGORY_BY_ID(id));
        
        if (response?.data?.success) {
            toast.success("Category fetched successfully");
            console.log("RESPONSE FROM FETCH ALL CATEGORY ", response )
            return response.data.category; 
        } else {
            throw new Error("Category not found");
        }
    } catch (error) {
        toast.error("Failed to fetch category");
        console.error("FETCH CATEGORY ERROR:", error);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};

export const deleteCategoryById = async (id, token) => {
    const toastId = toast.loading("Deleting category...");
    try {
        const response = await fetch(DELETE_CATEGORY_BY_ID(id), {
            method: 'DELETE',  // Specify the DELETE request method
            headers: {
                'Authorization': `Bearer ${token}`,  // Pass token in the Authorization header
                'Content-Type': 'application/json'  
            }
        });
        console.log("Response from deleting category: ", response);


        const data = await response.json(); 

        if (response.ok && data.success) {
            toast.success("Category deleted successfully");
            console.log("Response from deleting category: ", data);
            return data.category;  
        } else {
            throw new Error(data.message || 'Failed to delete category');
        }
    } catch (error) {
        toast.error("Failed to delete category");
        console.error("DELETE CATEGORY ERROR:", error);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};




export const fetchAllCategories = async () => {
    const toastId = toast.loading("Loading categories...");
    try {
        const response = await apiconnector("GET", GET_ALL_CATEGORY);
        console.log("RESPONSE FROM FETCH ALL CATEGORY ", response )
        if (response?.data?.success) {
            toast.success("Categories fetched successfully");
            console.log("DATA FROM ALL CATEGORY ", response.data.categories )
            return response.data.categories; 
        } else {
            throw new Error("Failed to fetch categories");
        }
    } catch (error) {
        toast.error("Failed to fetch categories");
        console.error("FETCH ALL CATEGORIES ERROR:", error);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};


// export const updateCategoryById = async (id, categoryData) => {
//     const toastId = toast.loading("Updating category...");
//     try {
//         const response = await apiconnector("PUT", UPDATE_CATEGORY_BY_ID(id), categoryData);
//         if (response?.data?.success) {
//             toast.success("Category updated successfully");
//             return response.data.category; 
//         } else {
//             throw new Error("Failed to update category");
//         }
//     } catch (error) {
//         toast.error("Failed to update category");
//         console.error("UPDATE CATEGORY ERROR:", error);
//         return null;
//     } finally {
//         toast.dismiss(toastId);
//     }
// };

// export const deleteCategoryById = async (id) => {
//     const toastId = toast.loading("Deleting category...");
//     try {
//         const response = await apiconnector("DELETE", DELETE_CATEGORY_BY_ID(id));
//         if (response?.data?.success) {
//             toast.success("Category deleted successfully");
//             return response.data; 
//         } else {
//             throw new Error("Failed to delete category");
//         }
//     } catch (error) {
//         toast.error("Failed to delete category");
//         console.error("DELETE CATEGORY ERROR:", error);
//         return null;
//     } finally {
//         toast.dismiss(toastId);
//     }
// };
