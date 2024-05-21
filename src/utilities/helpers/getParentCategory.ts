import { Category } from "../types/types";

function getParentCategory(category: Category, categories: Category[]): Category | null {
    if (category.parent_id) {
        const parentCategory = categories.find(randomCategory => randomCategory.id === category.parent_id);

        if (parentCategory) {
            return parentCategory;
        }
    }

    return null
}

export default getParentCategory;