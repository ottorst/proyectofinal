"use client"

//Vendors
import Image from "next/image"
import Link from "next/link"
//Contexts
import { useAuth } from "../AuthContext"


const Home:React.FC = () => {
const {user} = useAuth();

  return (

    <div>
       <title>Home</title>
       <header className="text-gray-100 text-4xl font-bold md:text-4xl text-center mb-28 mt-12">{user?`Welcome ${user.name}`:"WELCOME"}</header>

        <section className="wrapper grid gap-8 items-center justify-center font-lora mx-auto
        md:grid-cols-2 mb-24 
        ">
                <Image src={"/assets/enplatado-chef.jpg"} alt="enplatado chef tony" width={400} height={400}
                className="rounded-md w-full max-w-lg mx-auto"
                />
                <div className="space-y-8 text-slate-100 leading-loose text-center md:text-left text-xl">

                <h1 className="text-gray-100 text-3xl font-bold md:text-4xl underline">Experience Culinary Excellence with Chef Tony Stephen</h1>

                <p> Chef Tony Stephen offers an unparalleled culinary experience, 
                    meticulously crafting each dish to perfection. 
                    Our events are tailored to provide an unforgettable atmosphere with gourmet food, 
                    exceptional service, and live music to set the perfect ambiance. Whether it's a private dinner, 
                    a corporate event, or a special celebration, 
                    Chef Tony ensures the highest quality and attention to detail, 
                    creating a dining experience that will be remembered long after the last bite.</p>

                </div>
                
        </section>

        <section className="wrapper grid gap-8 items-center justify-center font-lora mx-auto
         mb-24  bg-gray-500-50 rounded-md
        ">
                <div className="space-y-8 text-slate-100 leading-loose text-center md:text-center text-xl">

                <Image src={"/assets/events.jpg"} alt="enplatado chef tony" width={400} height={400}
                className="rounded-md w-full max-w-lg mx-auto mt-4"
                />

                <h1 className="text-gray-100 text-3xl font-bold md:text-4xl underline"><Link href={"/experience"} className="hover:text-yellow-500">Events</Link></h1>

                <p> Chef Tony Stephen provides an exceptional and immersive culinary experience for all types of special events. 
                    From intimate private dinners to grand corporate gatherings and elegant weddings, 
                    every event is crafted with precision and flair. 
                    Tony’s approach includes bespoke menus tailored to your preferences, top-tier ingredients, 
                    and a seamless blend of gourmet cuisine with live music and personalized service. 
                    Every detail is meticulously planned, from the presentation of the dishes to the ambiance, 
                    ensuring a memorable and luxurious experience that exceeds expectations.</p>


                </div>

                
                
        </section>


        <section className="wrapper grid gap-32 items-center justify-center font-lora mx-auto
        md:grid-cols-2 mb-24 
        ">
                <Image src={"/assets/reserved.jpg"} alt="enplatado chef tony" width={400} height={400}
                className="rounded-md w-full max-w-lg md:order-2 mx-auto" 
                />
                <div className="space-y-8 text-slate-100 text-center leading-loose md:text-center text-xl grid">

                <h1 className="text-gray-100 text-3xl font-bold md:text-4xl underline">Booking</h1>

                <p> To make a reservation, please click the link below to be redirected to our experiences page, 
                    where you can view the current events Chef Tony is offering.</p>

                <Link href={"/experience"} className="bg-yellow-500 text-black px-8 py-6 rounded-3xl text-center
                text-3xl hover:bg-yellow-300 active:text-black active:bg-white
                ">Book Now</Link>
                </div>
                
        </section>
    </div>



  )

}

export default Home