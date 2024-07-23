import Link from 'next/link';
import Image from 'next/image';

const NotFoundPage = () => {
    return (
        <div style={{ textAlign: 'center', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '2rem' }}>
                <Image
                    src='/404.png'
                    alt="404 Not found"
                    width={500}
                    height={400}
                />
                <p className='pt-8'>Sorry. Can not seem to find the page you are looking for.</p>
            </div>
            <Link href="/" style={{ textDecoration: 'none', color: 'blue', paddingBottom: '4rem' }}>
                Return to Home Page.
            </Link>
        </div>
    );
};

export default NotFoundPage;
