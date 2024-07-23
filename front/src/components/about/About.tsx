//vendors
import Image from "next/image"


const About:React.FC = () => {
    return (
      
      <div>
      <section className="wrapper grid gap-8 justify-items-center 
      items-center pb-12 md:grid-cols-2 md:py-24 bg-gray-500-50 rounded-md mb-24">
  
  <Image src={"/assets/chef.jpg"} alt="" width={500} height={500} className="w-full max-w-lg rounded-md"/>
  
        <article className="text-center space-y-6 md:space-y-8 font-lora">
  
          <h1 className=" text-gray-100 text-3xl font-bold md:text-4xl">Chef Tony Stephen</h1>
  
          <p className="text-slate-100 leading-loose md:text-left text-xl">Chef Tony is considered the best at cooking Japanese cuisine due to his mastery of both traditional and modern techniques, 
            honed over decades of experience. 
            His dedication to quality and fresh ingredients ensures authentic and exquisite flavors in every dish. Beyond his culinary skills, Chef Tony is also renowned for his impeccable presentation, turning each plate into a work of art that delights both the eyes and the palate.</p>
  
        </article>
        
      </section>
  
      <section className="wrapper grid gap-8 justify-items-center 
      items-center pb-12 md:grid-cols-2 md:py-24">
  
  <Image src={"/assets/comida-japonesa.jpg"} alt="" width={500} height={500} className="w-full max-w-lg rounded-md md:order-2"/>
  
        <article className="text-center space-y-6 md:space-y-8 font-lora">
  
          <h1 className= " text-gray-100 text-3xl font-bold md:text-4xl">Quality Ingredients</h1>
  
          <p className="text-slate-100 leading-loose md:text-right text-xl">Chef Tony is renowned for sourcing the finest ingredients to create exceptional Japanese cuisine. 
            His dedication to quality means he meticulously selects the freshest fish, premium rice, and authentic , ensuring every dish reflects the true essence of Japanese flavors.</p>
  
        </article>
        
      </section>
      </div>
      
    )
  }

export default About