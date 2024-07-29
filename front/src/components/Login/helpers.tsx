export const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch('http://localhost:3001/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            return response.json();
        } else {
            const errorResponse = await response.json();
            let errorMessage = 'Error durante el inicio de sesión';

            if (response.status === 404 && errorResponse.message === 'User not found') {
                errorMessage = 'Usuario no encontrado';
            } else if (response.status === 401 && errorResponse.message === 'Wrong credentials provided') {
                errorMessage = 'Credenciales incorrectas';
            }

            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error en loginUser:', error);
        throw error;
    }
};