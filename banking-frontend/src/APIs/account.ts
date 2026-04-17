const API_BASE_URL = 'http://localhost:5000';

export const createAccount = async (accountType: string, balance: number, branchId: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/account/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accountType, balance, branchId }),
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to Create the account");
        }
        return data;
    } catch (err) {
        console.error('Error creating account:', err);
        throw err;
    }
}

export const getMyAccount = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/account`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to Fetch the account");
        }
        return data;
    } catch (err) {
        console.error('Error fetching account:', err);
        throw err;
    }
}

export const deleteMyAccount = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/account/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to Delete the account");
        }
        return data;
    } catch (err) {
        console.error('Error deleting account:', err);
        throw err;
    }
}

export const requestAtmCard = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/account/request-atm-card`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        const data = await response.json();


        if (!response.ok) {
            throw new Error(data.message || "Failed to Apply for The ATM card");
        }
        return data;
    } catch (err) {
        console.error('Error requesting ATM card:', err);
        throw err;
    }
}


export const getAccountByAtm = async (atmCardNumber: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/account/get-account-by-atm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ atmCardNumber }),
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to Fetch Account By ATM Number");
        }
        return data;
    } catch (err) {
        console.error('Error fetching account by ATM card:', err);
        throw err;
    }
}

export const updateAccount = async (type: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/account/update-account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type }),
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to Update the account");
        }

        return data;
    } catch (err) {
        console.log("Getting error", err)
    }

}

export const getBalance = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/account/get-balance`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to Fetch the Balance");
        }
        return data;

    } catch (err) {
        console.log(err)
    }

}

export const getBalanceByAtm = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/account/get-balance-by-atm`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to Fetch the Balance By Atm");
        }
        return data;
    } catch (err) {
        console.error('Error fetching balance by ATM card:', err);
        throw err;
    }
}


