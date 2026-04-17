import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000';

export const useRole = () => {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/general/get-role`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include' // Important for authMiddleware to receive cookies/session
                });

                if (response.ok) {
                    const data = await response.json();
                    // Assumes backend responds with { userRole: '...' }
                    setRole(data.userRole); 
                } else {
                    console.error('Failed to fetch role');
                }
            } catch (err) {
                console.error('Error fetching role:', err);
            }
        };

        fetchRole();
    }, []);

    return role;
};

// Aliased as getRole if you strictly want to use that name, 
// but note that React strictly requires hooks to start with "use",
// so using `getRole()` inside a component might throw a linter error.
export const getRole = useRole;
