import { ArrowRightIcon } from "../assets/icons/SvgIcon";
import type { Recipe } from "../types/index";
import { TimeIcon } from "../assets/icons/SvgIcon";

type RecipeCardProps = {
    recipe: Recipe;
    onSelect: (recipe: Recipe) => void;
};

export default function RecipeCard({ recipe, onSelect }: RecipeCardProps) {
    return (
        <div className="max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow-sm ">
            <a>
                <img className="rounded-t-lg w-full h-48 object-cover" src={recipe.image} alt={recipe.title} />
            </a>
            <div className="p-5">
                <a>
                    <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">{recipe.title}</h5>
                </a>
                <p className="mb-3 font-normal">{recipe.description}</p>
                <p className="flex items-center gap-1 text-gray-700 font-medium mb-3">
                    <TimeIcon />
                    Tempo aproximado: {recipe.time} min</p>
                <button
                    onClick={() => onSelect(recipe)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 cursor-pointer">Ver receita
                    <ArrowRightIcon />
                </button>
            </div>
        </div>
    );
}

