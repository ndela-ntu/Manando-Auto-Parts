import { categories } from '../models/categories';
import CategoryCard from './category-card';

export default function Main() {
  return (
    <div className='flex flex-col items-center justify-center px-10'>
      <h3 className="text-xl">We have:</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-5'>
      {categories.map((category, i) => (
        <CategoryCard
          key={i}
          name={category.split('_').join(' ')}
          imageSRC={`/${category}.jpeg`}
        />
      ))}
      </div>
    </div>
  );
}
