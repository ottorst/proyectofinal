/* 'use client';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser} from '@auth0/nextjs-auth0/client';
import { NextPage } from 'next';
import { useAuth } from '../AuthContext';
 

const ProfileClient: React.FC = (props) => {
  const { user: auth0User, error, isLoading } = useUser();
  const { user: localUser } = useAuth(); // Utiliza el contexto de autenticación
  const currentUser = auth0User || localUser; // Prioriza el usuario de Auth0, si existe
  
    


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    currentUser && (
      <div>
        <h2>{currentUser.name}</h2>
        <p>{currentUser.email}</p>
      </div>
    )
  );
}
export const getServerSideProps = withPageAuthRequired ({
    getServerSideProps(){
        return {
            props: { foo: 'bar' },
    }
})
export default ProfileClient */

/* import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx: GetServerSidePropsContext) {
    const session = await getSession(ctx.req, ctx.res);
    const token = session?.accessToken;

    // Envía el token y el usuario al backend
    const response = await fetch('http://localhost:3001/auth/auth0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ user: session?.user })
    });

    const data = await response.json();

    return {
      props: {
        data,
      },
    };
  },
});

const ProfileClient = ({ data }: { data: any }) => {
  return (
    <div>
      <h2>Datos Protegidos</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProfileClient;
 */

