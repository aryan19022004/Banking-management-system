const API_BASE_URL = 'http://localhost:5000/transaction';

export const withdrawMoneyATM = async (atmCardNumber: string, AtmPin: string, amount: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/withdraw-atm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                atmCardNumber,
                AtmPin,
                amount
            })
        })
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error('Error withdrawing money:', err);
        throw err;
    }
}

export const withdrawMoneyByAccountNumber = async (accountNumber: string, amount: string, ifsc: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/withdraw-account-number`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                accountNumber,
                amount,
                ifsc
            })
        })
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error('Error withdrawing money:', err);
        throw err;
    }
}


export const depositeMoney = async (accountNumber: string, amount: string, ifsc: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/deposite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                accountNumber,
                amount,
                ifsc
            })
        })
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error('Error depositing money:', err);
        throw err;
    }
}


export const transactionHistory = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/transaction-history`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = response.json();
        return data;
    }
    catch (err) {
        console.error('Error fetching transaction history:', err);
        throw err;
    }
}


export const depositeHistory = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/deposite-history`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = response.json();
        return data;
    }
    catch (err) {
        console.error('Error fetching deposite history:', err);
        throw err;
    }
}

export const withdrawnHistory = async () => {
    try {
        const respone = await fetch(`${API_BASE_URL}/withdrawn-history`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = respone.json();
        return data;
    }
    catch (err) {
        console.error('Error fetching withdrawn history:', err);
        throw err;
    }
}

export const transferMoney = async (senderAccountNumber: string, receiverAccountNumber: string, amount: string, senderifsc: string, receiverifsc: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/transfer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                senderAccountNumber,
                receiverAccountNumber,
                amount,
                senderifsc,
                receiverifsc
            })
        })
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error('Error transferring money:', err);
        throw err;
    }
}










