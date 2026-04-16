//In this we will create the API calls related to authentication like login, logout, register etc.

const API_BASE_URL = 'http://localhost:5000'; // Change this to your backend URL

export const registerUser = async (name: string, email: string, phone: string, password: string) => {   
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'            },
            body: JSON.stringify({ name, email, phone, password }),
            credentials: 'include' // Include cookies for session management
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const Login = async (email:string , password:string) =>{
    try{
        const response = await fetch(`${API_BASE_URL}/auth/login`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password}),
            credentials: 'include'

        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;

    }
}