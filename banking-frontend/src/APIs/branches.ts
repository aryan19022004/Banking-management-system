const API_BASE_URL = "http://localhost:5000/";

interface BranchData {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
}



export const getAllBranches = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/branch`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error fetching branches:', err);
        throw err;
    }
}

export const createBranch = async (branchData: BranchData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/branch`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(branchData)
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error creating branch:', err);
        throw err;
    }
}


export const deleteBranch = async (id: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/branch/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error deleting branch:', err);
        throw err;
    }
};


export const getBranchById = async (id: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/branch/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error fetching branch by ID:', err);
        throw err;
    }
}

export const updateBranch = async (id: string, branchData: BranchData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/branch/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(branchData)
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error updating branch:', err);
        throw err;
    }
}  