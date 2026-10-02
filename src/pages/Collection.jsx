import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Sparkle } from '@phosphor-icons/react';

export default function Collection() {
  const { filterType } = useParams();
  
  // Normalize the filter string for comparison
  const normalizedFilter = filterType ? filterType.toLowerCase() : '';

  let targetMetal = null;
  let targetCategory = null;
  let targetGender = null;

  const complexMatch = normalizedFilter.match(/^(gold|silver)-(.*?)-(men|women)$/);
  if (complexMatch) {
    targetMetal = complexMatch[1];
    
    let cat = complexMatch[2];
    if (cat === 'ring') targetCategory = 'rings';
    else if (cat === 'necklace') targetCategory = 'necklaces';
    else if (cat === 'earring') targetCategory = 'earrings';
    else if (cat === 'bangle-bracelet') targetCategory = 'bangles-bracelets';
    else if (cat === 'chain') targetCategory = 'chains';
    else targetCategory = cat;
    
    targetGender = complexMatch[3] === 'men' ? 'male' : 'female';
  }

  // Filter products by either complex match or basic metalType/category match
  const filteredProducts = products.filter(product => {
    if (targetMetal && targetCategory && targetGender) {
      const metalMatch = (product.metalType || '').toLowerCase() === targetMetal;
      const catMatch = (product.category || '').toLowerCase() === targetCategory;
      const genMatch = (product.gender || '').toLowerCase() === targetGender;
      return metalMatch && catMatch && genMatch;
    }

    return (
      (product.metalType || '').toLowerCase() === normalizedFilter ||
      (product.category || '').toLowerCase() === normalizedFilter
    );
  });

  // Capitalize for display
  const displayTitle = filterType 
    ? filterType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'All';

  return (
    <main className="flex-grow bg-[#fffcf6] min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Collection Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkle size={16} className="text-brand-gold animate-pulse" weight="fill" />
            <span className="text-xs uppercase font-bold text-brand-gold tracking-[0.3em]">
              Curated Selection
            </span>
            <Sparkle size={16} className="text-brand-gold animate-pulse" weight="fill" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold text-brand-dark-red tracking-wide uppercase mb-6">
            {displayTitle} Collection
          </h1>
          <div className="w-24 h-[2px] bg-brand-gold mx-auto rounded-full"></div>
          
          <p className="mt-6 text-sm sm:text-base text-text-body/70 max-w-2xl mx-auto font-light leading-relaxed">
            Explore our exclusive {displayTitle.toLowerCase()} masterpieces. Each piece is crafted with meticulous attention to detail and uncompromising purity.
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#e9e3e0] shadow-sm">
            <h3 className="font-serif text-2xl text-text-body mb-2">No pieces found</h3>
            <p className="text-text-body/60 text-sm">
              We couldn't find any items in the {displayTitle} collection at the moment.
            </p>
          </div>
        )}
        
      </div>
    </main>
  );
}
