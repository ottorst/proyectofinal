//vendors
import Image from "next/image"


const Home:React.FC = () => {
  return (
    
    <div className="flex flex-col md:flex-col items-start justify-between p-4 space-y-8 md:space-y-0">

<div className={`flex flex-col lg:flex-row items-center justify-between w-full space-y-4 md:space-y-0 md:space-x-4 bg-smokegrey`}>
        <div className="relative w-full md:w-[509px] md:h-[423px] flex items-center text-center font-serif text-[20px] md:text-[25px]">
          <p className="text-center px-4">Chef Mike is committed to using only the highest quality ingredients in his culinary creations. He meticulously sources fresh, organic produce, sustainably caught seafood, and ethically raised meats to ensure every dish meets the highest standards of flavor and nutrition. </p>
        </div>
        <div className="relative flex-shrink-0 w-full md:w-auto">
          <Image src="/assets/tablacomida.png" alt="Tabla Carnes frias" width={500} height={450}/>
        </div>
      </div>
    
   <div className="flex flex-col lg:flex-row items-center justify-between w-full space-y-4 md:space-y-0 md:space-x-4">
        
        <div className="relative flex-shrink-0 w-full md:w-auto order-2 lg:order-1">
          <Image src="/assets/chef.png" alt="Tabla Carnes frias" width={350} height={250} />
        </div>

        <div className="relative w-full md:w-[509px] md:h-[423px] flex items-center text-center font-serif text-[20px] md:text-[25px] order-1 lg:order-2">
          <h1>Chef Mike is a seasoned culinary expert renowned for his innovative approach to traditional cuisine. With over 15 years of experience in the culinary industry, he excels in creating exquisite dishes that blend classic flavors with contemporary techniques.</h1>
        </div>
      </div>

    </div>
    
  )
}

export default Home