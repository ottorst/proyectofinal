//vendors
import Image from "next/image";
import { EventForm } from "../eventForm/EventForm";

const About: React.FC = () => {
  return (
    <div>
      <title>About</title>
      <section
        className="wrapper grid gap-8 justify-items-center 
      items-center pb-12 md:py-24 bg-gray-500-50 rounded-md mb-24 mt-12"
      >
        <h1 className=" text-gray-100 text-3xl font-bold md:text-4xl underline">
          Chef Tony Stephen
        </h1>

        <Image
          src={"/assets/chef.jpg"}
          alt=""
          width={500}
          height={500}
          className="w-full max-w-[800px] rounded-md"
        />

        <article className="text-center space-y-6 md:space-y-8 font-lora">
          <p className="text-slate-100 leading-loose md:text-center text-xl">
            Chef Tony Stephen's journey to culinary excellence began in his
            grandmother's kitchen, where he learned the art of cooking
            traditional dishes with love and care. As a teenager, he worked in
            local restaurants, quickly gaining a reputation for his creativity
            and attention to detail. After attending a prestigious culinary
            school, Tony traveled the world, honing his skills in renowned
            kitchens from Paris to Tokyo. His dedication and innovation have
            earned him numerous awards, including the coveted James Beard Award
            and the Michelin Star. Today, Chef Tony is celebrated not only for
            his exceptional culinary talent but also for his passion for sharing
            unforgettable dining experiences with others.
          </p>
        </article>
      </section>

      <section
        className="wrapper grid gap-8 justify-items-center 
      items-center pb-12 md:grid-cols-2 md:py-24"
      >
        <Image
          src={"/assets/ingredients.jpg"}
          alt=""
          width={500}
          height={500}
          className="w-full max-w-lg rounded-md md:order-2"
        />

        <article className="text-center space-y-6 md:space-y-8 font-lora">
          <h1 className=" text-gray-100 text-3xl font-bold md:text-4xl underline">
            Quality Ingredients
          </h1>

          <p className="text-slate-100 leading-loose md:text-right text-xl">
            Chef Tony Stephen is committed to using only the finest ingredients
            in all his culinary creations. Each dish is prepared with premium,
            locally-sourced, and seasonal ingredients to ensure the highest
            quality and freshness. Chef Tony believes that the foundation of
            exceptional cuisine lies in the quality of its ingredients, and he
            meticulously selects each component to enhance the flavors and
            textures of his dishes. From farm-fresh produce to
            sustainably-sourced seafood and ethically-raised meats, every
            ingredient reflects Chef Tony’s dedication to excellence and his
            passion for creating unforgettable culinary experiences.
          </p>
        </article>
      </section>

      <section
        className="wrapper grid gap-8 justify-items-center 
      items-center pb-12 md:grid-cols-2 md:py-24 bg-gray-500-50 rounded-md mb-12"
      >
        <Image
          src={"/assets/drinks.jpg"}
          alt=""
          width={500}
          height={500}
          className="w-full max-w-lg rounded-md md:order-1"
        />

        <article className="text-center space-y-6 md:space-y-8 font-lora order-1">
          <h1 className=" text-gray-100 text-3xl font-bold md:text-4xl underline">
            Crafting Exceptional Drinks for Exclusive Events
          </h1>

          <p className="text-slate-100 leading-loose md:text-left text-xl">
            Chef Tony elevates the dining experience with an array of
            extravagant beverages that perfectly complement his gourmet
            creations. Guests are treated to a curated selection of rare and
            luxurious wines, artisanal cocktails crafted with the finest spirits
            and unique ingredients, and bespoke non-alcoholic options that
            showcase innovative flavor profiles. Each beverage is thoughtfully
            paired with the menu, ensuring a harmonious balance between taste
            and presentation. Chef Tony’s commitment to excellence extends to
            every detail, making his beverage offerings as memorable and
            sophisticated as his culinary masterpieces.
          </p>
        </article>
      </section>
    </div>
  );
};

export default About;
