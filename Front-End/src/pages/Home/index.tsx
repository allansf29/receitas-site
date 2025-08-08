import Carousel from "../../components/Carousel";
import imageSalada from "../../assets/img/imageSalada.png";
import imageKibe from "../../assets/img/imageKibe.png";
import imageBaiao from "../../assets/img/imageBaiao.png";

function Home() {

  const recipes = [
    {
      id: Math.random().toString(36).substring(2, 15),
      title: "Baião de Dois",
      description: "Delicious Baião de Dois recipe with a mix of rice, beans, and spices.",
      image: imageBaiao
    },
    {
      id: Math.random().toString(36).substring(2, 15),
      title: "Yakisoba",
      description: "Delicious Yakisoba recipe with a savory stir-fry and vegetables.",
      image: imageSalada
    },
    {
      id: Math.random().toString(36).substring(2, 15),
      title: "Kibe de Forno",
      description: "Delicious Kibe de Forno recipe with a crispy crust and savory filling.",
      image: imageKibe
    },

  ];

  return (
    <>
      <Carousel />
      <section className="max-w-7xl mx-auto h-20 px-6 py-4 flex flex-wrap gap-5">
        <h2 className="w-full text-3xl font-bold text-center">Receitas em destaque</h2>
        {recipes.map((item, index) => (
          <div key={index} className="max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow-sm ">
            <a href="#">
              <img className="rounded-t-lg w-full h-48 object-cover" src={item.image} alt={item.title} />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{item.title}</h5>
              </a>
              <p className="mb-3 font-normal">{item.description}</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ver receita
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>
        ))}

      </section>
    </>
  )
}

export default Home;