import type { Recipe } from "../types/index";
import { TimeIcon } from "../assets/icons/SvgIcon";
import { DrawOutlineButton } from "../components/Button";

type RecipeCardProps = {
    recipe: Recipe;
    onSelect: (recipe: Recipe) => void;
};

export default function RecipeCard({ recipe, onSelect }: RecipeCardProps) {
    return (
        <div className="max-w-sm 
            bg-background border- border-secondary rounded-lg shadow-sm 
            dark:bg-gray-900 dark:text-amber-50 dark:border-gray-700 
            hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
            <a>
                <img className="rounded-t-lg w-full h-48 object-cover" src={recipe.image} alt={recipe.title} />
            </a>
            <div className="p-5">
                <a>
                    <h5 className="mb-3 text-2xl font-bold tracking-tight text-primary dark:text-amber-50">
                        {recipe.title}
                    </h5>
                </a>
                <p className="mb-3 font-normal text-[var(--color-text)] dark:text-gray-300">
                    {recipe.description}
                </p>
                <p className="flex items-center gap-1 text-secondary dark:text-gray-400 font-medium mb-3">
                    <TimeIcon />
                    Tempo aproximado: {recipe.time} min
                </p>
                <DrawOutlineButton onClick={() => onSelect(recipe)} className="bg-primary text-background hover:bg-secondary">
                    Ver receita
                </DrawOutlineButton>
            </div>
        </div>
    );
}

