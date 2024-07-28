export const loginUser = async (email: string, password: string, useAuth0: boolean) => {
    try {
        if (useAuth0) {
            // Lógica para Auth0
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Aquí se asume que Auth0 redirige automáticamente al usuario,
                // así que podrías no necesitar hacer nada más aquí.
                return response.json(); 
            } else {
                const errorResponse = await response.json();
                let errorMessage = 'Error durante el inicio de sesión con Auth0';

                if (response.status === 401) {
                    errorMessage = 'Credenciales incorrectas para Auth0';
                }

                throw new Error(errorMessage);
            }
        } else {
            // Lógica para la autenticación propia
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
        }
    } catch (error) {
        console.error('Error en loginUser:', error);
        throw error;
    }
};
