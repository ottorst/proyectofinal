//Vendors
import Image from "next/image"


const Privacity:React.FC = () => {
  return (
    <div>
        <title>Privacity</title>
        <section className="wrapper pb-20 flex items-center
         justify-center flex-col font-lora text-xl
        ">

            <article className="text-center space-y-8 flex flex-col items-center justify-center mb-20">

            <div className="flex items-center space-x-4 mb-10">
            <Image src={"/assets/security-icon.svg"} alt="" width={100} height={100}
            ></Image>

             <h1 className=" text-gray-100 text-3xl font-bold md:text-4xl">Privacy Politics</h1>
            </div>

                <p>🗝️Welcome to Tonys Chef web security. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and disclose information about you when you visit our website tonyChef.com or use our services.</p>

            </article>


            <article className="text-center space-y-8 flex flex-col items-center justify-center mb-20">

            <div className="flex items-center space-x-4 mb-10">
            <Image src={"/assets/documents-icon.svg"} alt="" width={100} height={100}
            ></Image>

             <h1 className=" text-gray-100 text-3xl font-bold md:text-4xl">Information We Collect</h1>
            </div>

                <p>🗝️Personal Information: We may collect personal information that you provide to us directly, such as your name, email address, and phone number when you contact us or sign up for our services.</p>
                <p>🗝️Usage Data: We collect information about your interactions with our website, such as your IP address, browser type, and browsing activity.</p>
            </article>


             <article className="text-center space-y-8 flex flex-col items-center justify-center mb-20">

            <div className="flex items-center space-x-4 mb-10">
            <Image src={"/assets/info-icon.svg"} alt="" width={100} height={100}
            ></Image>

             <h1 className=" text-gray-100 text-3xl font-bold md:text-4xl">How We Use Your Information</h1>
            </div>

                <p>🗝️Communicate with you, including sending updates and promotional materials.</p>
                <p>🗝️Analyze website usage to enhance user experience.</p>
                <p>🗝️Provide and improve our services.</p>
            </article>


             <article className="text-center space-y-8 flex flex-col items-center justify-center mb-20">

            <div className="flex items-center space-x-4 mb-10">
            <Image src={"/assets/choice-icon.svg"} alt="" width={100} height={100}
            ></Image>

             <h1 className=" text-gray-100 text-3xl font-bold md:text-4xl">Your Choices</h1>
            </div>

                <p>🗝️Access and update your personal information.</p>
                <p>🗝️Opt-out of receiving marketing communications from us.</p>

                
            </article>


            <article className="text-center space-y-8 flex flex-col items-center justify-center mb-20">

            <div className="flex items-center space-x-4 mb-10">
            <Image src={"/assets/contact-icon.svg"} alt="" width={100} height={100}
            ></Image>

             <h1 className=" text-gray-100 text-3xl font-bold md:text-4xl">Contact Us</h1>
            </div>

                <p>📧chefTony_security@gmail.com</p>
                <p>📍123 Maple Street, Suite 456, Toronto, ON M5A 1A1, Canada.</p>
                <p>📱+1 (416) 555-1234</p>

                
            </article>

        </section>
    </div>
  )
}

export default Privacity