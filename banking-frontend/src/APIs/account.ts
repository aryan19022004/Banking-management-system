const API_BASE_URL = 'http://localhost:5000';

export const createAccount = async (accountType : string,balance :number, branchId: string) =>{
         try{
               const response = await fetch(`${API_BASE_URL}/account/create`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({accountType,balance,branchId}),
                credentials: 'include'
               });

               const data = await response.json();
               return data;
         }catch(err){
            console.error('Error creating account:', err);
            throw err;
         }
}

export const getMyAccount = async () =>{
    try{
        const response = await fetch(`${API_BASE_URL}/account`,{
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
            },
            credentials: 'include'
        });

        const data = await response.json();
        return data;
    }catch(err){
        console.error('Error fetching account:', err);
        throw err;
    }
}

export const deleteMyAccount = async () => {
    try{
        const response = await fetch(`${API_BASE_URL}/account/delete`,{ 
            method: 'DELETE',
            headers:{
                'Content-Type' : 'application/json',
            },
            credentials: 'include'
        }); 
        const data = await response.json();
        return data;
    }catch(err){
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
        return data;
    } catch (err) {
        console.error('Error fetching account by ATM card:', err);
        throw err;
    }
}

export const updateAccount = async (type:string) =>{
    try{
        const response = await fetch(`${API_BASE_URL}/account/update-account`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({type}),
        credentials:'include'
    });

    const data = await response.json();

    return data;
    }catch(err){
        console.log("Getting error",err)
    }
   
}

export const getBalance = async () =>{
    try{
        const response = await fetch(`${API_BASE_URL}/account/get-balance`,{
            method:'GET',
                 headers:{
                'Content-Type' : 'application/json',
            },
            credentials: 'include'

    });

    const data = await response.json();
    return data;

}catch(err){
    console.log(err)
}

}

