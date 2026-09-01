import React, { useState, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// EXACT IMAGE IMPORTS PRESERVED AS REQUIRED
import food1 from '../assets/foods/food1.webp';
import food2 from '../assets/foods/food2.webp';
import food3 from '../assets/foods/food3.webp';
import food4 from '../assets/foods/food4.webp';
import food5 from '../assets/foods/food5.webp';
import food6 from '../assets/foods/food6.webp';
import food7 from '../assets/foods/food7.webp';
import food8 from '../assets/foods/food8.webp';
import food9 from '../assets/foods/food9.webp';
import food10 from '../assets/foods/food10.webp';
import onionring from '../assets/foods/onionring.webp';
import food11 from '../assets/foods/food11.webp';
import food12 from '../assets/foods/food12.webp';
import food13 from '../assets/foods/food13.webp';
import food14 from '../assets/foods/food14.webp';

export default function Menu() {
  const toastUrl = "https://order.toasttab.com/online/riptides-cocktail-and-grill-168-east-montauk-highway";

  // State Management
  const [activeTab, setActiveTab] = useState('FOOD'); // 'FOOD' or 'DRINKS'
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  // Toggle expand / collapse for categories
  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Smooth scroll handler for category navigation
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 130;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  // REAL RIPTIDES MENU DATA STRUCTURE
  const menuCategories = [
    {
      id: "small-plates",
      title: "Small Plates & Starters",
      type: "FOOD",
      image: onionring,
      items: [
        { name: "Beer-Battered Onion Rings", price: "$14.30", description: "Beer Battered Onion Rings served with a side of chipotle aioli." },
        { name: "Mozzarella Sticks", price: "$15.60", description: "Mozzarella Sticks served with marinara sauce." },
        { name: "Jumbo Pretzel Sticks", price: "$22.10", description: "Three jumbo pretzel sticks served with a choice of beer-cheese sauce, spicy brown mustard or honey mustard." },
        { name: "Disco Fries", price: "$16.90", description: "Disco Fries topped with melted mozzarella cheese and brown gravy." },
        { name: "Truffle Fries", price: "$18.20", description: "Truffle oil, parmesan cheese, parsley, side of chipotle aioli." },
        { name: "Old Bay Fries", price: "$14.30", description: "Crispy fries seasoned with signature Old Bay." },
        { name: "Chicken Tenders & Fries", price: "$20.80", description: "Crispy chicken tenders served with french fries." },
        { name: "Meatballs", price: "$23.40", description: "Served with our house-made sauce, topped with pecorino romano cheese and a side of ricotta with garlic bread." },
        { name: "Stuffed Mushrooms", price: "$16.90", description: "Savory house-stuffed mushroom caps." },
        { name: "Taco Dip", price: "$23.40", description: "Seasoned ground beef, melted shredded cheese, dollop of sour cream, side of tortilla chips." }
      ]
    },
    {
      id: "soups-salads",
      title: "Soups & Salads",
      type: "FOOD",
      image: food10,
      items: [
        { name: "French Onion Soup", price: "$12.00", description: "Classic rich broth with caramelized onions and melted cheese." },
        { name: "RipTides House Salad", price: "$13.00", description: "Fresh greens, seasonal vegetables, and house vinaigrette." },
        { name: "Classic Caesar Salad", price: "$14.00", description: "Crisp romaine, shaved parmesan, garlic croutons, caesar dressing." }
      ]
    },
    {
      id: "wings",
      title: "Wings",
      type: "FOOD",
      image: food1,
      items: [
        { name: "Chicken Wings", price: "$18.00", description: "Crispy wings tossed in your choice of Buffalo (hot, medium, mild), barbecue, or signature sauce, served with celery and blue cheese." }
      ]
    },
    {
      id: "tacos",
      title: "Tacos",
      type: "FOOD",
      image: food4,
      items: [
        { name: "Caribbean Jerk Chicken Taco", price: "$11.70", description: "Grilled chicken, red cabbage, pineapple pico de gallo, spicy caribbean jerk sauce in a soft flour tortilla." },
        { name: "Grilled Shrimp Taco", price: "$11.70", description: "Grilled shrimp, pineapple pico de gallo, red cabbage, chipotle aioli drizzle in a soft flour tortilla." },
        { name: "Ground Beef Taco", price: "$11.70", description: "Ground beef, lettuce, cheddar cheese, tomatoes in a soft flour tortilla." },
        { name: "Plain Grilled Chicken Taco", price: "$11.70", description: "Simple grilled chicken in a soft flour tortilla." },
        { name: "Plate of Three Tacos", price: "$35.10", description: "Choice of Caribbean Jerk Chicken, Grilled Shrimp, Fish, or Ground Beef Tacos." }
      ]
    },
    {
      id: "seafood",
      title: "Seafood Dishes",
      type: "FOOD",
      image: food5,
      items: [
        { name: "Baked Clams", price: "$23.40", description: "Chopped clams, house-made stuffing, lemon." },
        { name: "Fish & Chips", price: "$31.20", description: "Beer-battered fried cod, fries, tartar sauce, lemon." },
        { name: "PEI Mussels", price: "$27.30", description: "Served with garlic bread in your choice of marinara, fra diavolo or white wine garlic sauce." },
        { name: "Crispy Coconut Shrimp", price: "$27.30", description: "Crispy Coconut Shrimp topped with a sweet and spicy chilli sauce." }
      ]
    },
    {
      id: "burgers-sandwiches",
      title: "Burgers, Sandwiches & Wraps",
      type: "FOOD",
      image: food3,
      items: [
        { name: "Classic Burger", price: "$22.10", description: "Angus beef patty, lettuce, tomato, dill pickle chips, choice of cheese, brioche bun." },
        { name: "BBQ Bacon Burger", price: "$26.00", description: "Angus beef patty, lettuce, tomato, dill pickle chips, applewood bacon, cheddar cheese, BBQ sauce, brioche bun." },
        { name: "Mushroom Swiss Burger", price: "$28.60", description: "Angus beef patty, lettuce, tomato, dill pickle chips, sautéed mushrooms, caramelized onions, Swiss cheese, brioche bun." },
        { name: "Pub Burger", price: "$28.60", description: "Angus beef patty, lettuce, tomato, dill pickle chips, sautéed mushrooms, caramelized onions, Swiss cheese, brioche bun." },
        { name: "Open-Faced Steak Tidbit Sandwich", price: "$40.30", description: "Grilled skirt steak cooked to temperature, toasted garlic ciabatta bread, mozzarella cheese and brown gravy." },
        { name: "Grilled Chicken Pesto Sandwich", price: "$26.00", description: "Grilled chicken, pesto spread, lettuce, tomato on a fresh roll." },
        { name: "Buffalo Chicken Wrap", price: "$24.70", description: "Crispy chicken tossed in buffalo sauce, lettuce, tomato, blue cheese in a flour tortilla." },
        { name: "Chicken Caesar Wrap", price: "$24.70", description: "Grilled chicken, romaine lettuce, parmesan cheese, caesar dressing, flour tortilla." }
      ]
    },
    {
      id: "quesadillas",
      title: "Quesadillas",
      type: "FOOD",
      image: food11,
      items: [
        { name: "Three-Cheese Quesadilla", price: "$14.30", description: "Grilled and then baked; served with a choice of sour cream, guacamole or salsa." },
        { name: "Grilled Chicken Quesadilla", price: "$26.00", description: "Grilled chicken, melted cheese; served with a choice of sour cream, guacamole or salsa." },
        { name: "Buffalo Chicken Bleu Cheese Quesadilla", price: "$27.30", description: "Buffalo chicken and bleu cheese; served with a choice of sour cream, guacamole or salsa." },
        { name: "Grilled Shrimp Quesadilla", price: "$27.30", description: "Grilled shrimp, melted cheese; served with a choice of sour cream, guacamole or salsa." },
        { name: "Steak Quesadilla", price: "$29.90", description: "Tender steak, melted cheese; served with a choice of sour cream, guacamole or salsa." }
      ]
    },
    {
      id: "pizza",
      title: "10\" Personal Pies",
      type: "FOOD",
      image: food12,
      items: [
        { name: "Cheese Pizza", price: "$11.00", description: "Classic mozzarella and tomato sauce on a personal crust." },
        { name: "Pepperoni Pizza", price: "$12.00", description: "Loaded with savory pepperoni slices." },
        { name: "Meat Lover's Pizza", price: "$13.00", description: "Topped with assorted premium meats and cheese." }
      ]
    },
    {
      id: "cocktails",
      title: "Cocktails & Frozen Drinks",
      type: "DRINKS",
      image: food8,
      items: [
        { name: "Frozen Miami Vice", price: "$17.00", description: "Half piña colada & half strawberry daiquiri poured to perfection and topped with whipped cream." },
        { name: "Frozen Piña Colada", price: "$15.00", description: "White rum, pineapple juice, cream of coconut; topped with whipped cream." },
        { name: "Frozen Strawberry Daiquiri", price: "$15.00", description: "White rum, strawberry puree, splash of lime juice; topped with whipped cream." },
        { name: "Frozen Margarita", price: "$14.00", description: "Tequila, house margarita mix." },
        { name: "Frozen Flavored Margarita", price: "$15.00", description: "Tequila, house margarita mix with choice of flavor." },
        { name: "Frozen Rocket Fuel", price: "$16.00", description: "Dark rum, amaretto, pineapple juice, cream of coconut; topped with an overproof rum floater." }
      ]
    },
    {
      id: "beverage-spirits",
      title: "Beer, Wine & Spirits",
      type: "DRINKS",
      image: food2,
      items: [
        { name: "Draft & Bottled Beers", price: "Market", description: "Selection of domestic, imported, and local craft beers on tap and in bottles." },
        { name: "House Red & White Wines", price: "Market", description: "Carefully curated glass and bottle selections." },
        { name: "Cocktails & Spirits", price: "Market", description: "Full premium liquor bar offering custom martinis, sangrias, and mixed spirits." }
      ]
    },
    {
      id: "winter-drink",
      title: "Winter Drink Menu",
      type: "DRINKS",
      image: food14,
      items: [
        { name: "Virgin Island Colada", price: "$9.00", description: "Cream of coconut, pineapple juice, blended smooth and topped with whipped cream." },
        { name: "Berry Breeze Mocktail", price: "$8.50", description: "Strawberry puree, fresh lime juice, and ginger beer over crushed ice." },
        { name: "Sunset Cooler", price: "$8.50", description: "Orange juice, cranberry juice, a splash of grenadine, and club soda." },
        { name: "Assorted Soft Drinks & Teas", price: "$4.00", description: "Selection of fountain sodas, iced tea, and lemonade." }
      ]
    }
  ];

  // Featured items strictly from real menu data
  const featuredDishes = [
    {
      name: "BBQ Bacon Burger",
      category: "Burgers & Sandwiches",
      price: "$26.00",
      description: "Angus beef patty, lettuce, tomato, dill pickle chips, applewood bacon, cheddar cheese, BBQ sauce, brioche bun.",
      image: food13
    },
    {
      name: "Fish & Chips",
      category: "Seafood Dishes",
      price: "$31.20",
      description: "Beer-battered fried cod, fries, tartar sauce, lemon.",
      image: food5
    },
    {
      name: "Frozen Miami Vice",
      category: "Cocktails & Frozen Drinks",
      price: "$17.00",
      description: "Half piña colada & half strawberry daiquiri poured to perfection and topped with whipped cream.",
      image: food6
    }
  ];

  // Filtering & Searching Logic
  const filteredCategories = useMemo(() => {
    return menuCategories.map((cat) => {
      const matchesTab = cat.type === activeTab;
      let matchesFilter = true;
      if (activeFilter !== 'ALL') {
        if (activeFilter === 'STARTERS') matchesFilter = cat.id === 'small-plates';
        if (activeFilter === 'TOSSED') matchesFilter = cat.id === 'wings';
        if (activeFilter === 'TACOS') matchesFilter = cat.id === 'tacos';
        if (activeFilter === 'BURGERS') matchesFilter = cat.id === 'burgers-sandwiches';
        if (activeFilter === 'SEAFOOD') matchesFilter = cat.id === 'seafood';
        if (activeFilter === 'DRINKS') matchesFilter = cat.type === 'DRINKS';
      }

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = query === '' || 
        cat.title.toLowerCase().includes(query) ||
        cat.items.some(item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
        );

      const filteredItems = query === ''
        ? cat.items
        : cat.items.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query) ||
            cat.title.toLowerCase().includes(query)
          );

      return {
        ...cat,
        shouldDisplay: matchesTab && matchesFilter && (matchesSearch || filteredItems.length > 0),
        displayedItems: filteredItems
      };
    });
  }, [activeTab, activeFilter, searchQuery]);

  return (
    <div className="bg-[#F5F1E8] text-[#111827] min-h-screen selection:bg-[#00A6C7] selection:text-white font-sans">
      <SEO title="RipTides Menu | Seafood, Burgers, Wings & Cocktails" description="Explore the RipTides Cocktails & Grill menu in Lindenhurst, NY featuring seafood, burgers, wings, tacos, soups, appetizers and handcrafted cocktails." path="/menu" image={food9} />
      
      {/* 1. HERO SECTION WITH ACC-OPTIMIZED LCP HANDLING */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#002B45] text-white">
        <div className="absolute inset-0 z-0 opacity-55">
          <img 
            src={food9} 
            alt="RipTides Grill Interior & Atmosphere" 
            width="1920" 
            height="1080" 
            fetchPriority="high" 
            decoding="async"
            className="w-full h-full object-cover object-center scale-105" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#002B45] via-[#002B45]/70 to-transparent"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-24 space-y-6 mt-8">
          <div className="inline-flex items-center gap-2 bg-[#007F9B]/30 border border-[#00A6C7]/40 px-4 py-1.5 rounded-full text-[#00A6C7] text-xs font-black uppercase tracking-[0.25em]">
            <span>168 E MONTAUK HWY • LINDENHURST, NY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[0.95] text-white font-serif">
            THE RIPTIDES <span className="text-[#00A6C7]">MENU</span>
          </h1>

          <p className="text-slate-200 text-base sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Seafood, wings, burgers, tacos, and handcrafted cocktails made for good times.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href={toastUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Order online via Toast ordering platform (opens in new tab)"
              className="w-full sm:w-auto bg-[#00A6C7] hover:bg-[#007F9B] text-white font-black px-8 py-4 rounded-xl shadow-xl uppercase tracking-wider text-xs transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white"
            >
              ORDER ONLINE (TOAST)
            </a>
            <button 
              onClick={() => { setActiveTab('FOOD'); scrollToSection('small-plates'); }} 
              aria-label="Explore food menu items"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/25 text-white border border-white/30 font-black px-8 py-4 rounded-xl uppercase tracking-wider text-sm backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-white"
            >
              EXPLORE MENU
            </button>
          </div>
        </div>
      </section>

      {/* 2. FOOD / DRINKS TOGGLE & SEARCH BAR STICKY HEADER */}
      <div className="sticky top-0 z-40 bg-[#002B45]/95 backdrop-blur-md border-b border-[#007F9B]/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Food / Drinks Toggle Buttons */}
            <div className="flex items-center bg-slate-900/90 p-1 rounded-xl w-full md:w-auto border border-slate-700">
              <button
                onClick={() => { setActiveTab('FOOD'); setActiveFilter('ALL'); }}
                aria-pressed={activeTab === 'FOOD'}
                className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === 'FOOD' ? 'bg-[#00A6C7] text-white shadow-md' : 'text-slate-300 hover:text-white'
                }`}
              >
                FOOD MENU
              </button>
              <button
                onClick={() => { setActiveTab('DRINKS'); setActiveFilter('ALL'); }}
                aria-pressed={activeTab === 'DRINKS'}
                className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === 'DRINKS' ? 'bg-[#00A6C7] text-white shadow-md' : 'text-slate-300 hover:text-white'
                }`}
              >
                DRINKS & BAR
              </button>
            </div>

            {/* Menu Search Box */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400" aria-hidden="true">🔍</span>
              <label htmlFor="menu-search-input" className="sr-only">Search menu items</label>
              <input
                id="menu-search-input"
                type="text"
                placeholder="Search dishes, drinks, or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-400 focus:outline-none focus:border-[#00A6C7] transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  aria-label="Clear search query"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

          </div>

          {/* Sticky Category Navigation */}
          <div className="flex items-center justify-start overflow-x-auto scrollbar-none space-x-2 pt-2 border-t border-slate-700/50">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                activeFilter === 'ALL' ? 'bg-[#007F9B] text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              All {activeTab === 'FOOD' ? 'Food' : 'Drinks'}
            </button>
            
            {menuCategories
              .filter(cat => cat.type === activeTab)
              .map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveFilter('ALL'); scrollToSection(cat.id); }}
                  className="whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  {cat.title}
                </button>
              ))
            }
          </div>

        </div>
      </div>

      {/* 3. FEATURED ITEMS SECTION WITH LAZY LOADING & EXPLICIT DIMENSIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[#007F9B] font-black text-xs uppercase tracking-[0.3em]">REAL MENU FAVORITES</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#002B45] font-serif uppercase">RIPTIDES FAVORITES</h2>
          <div className="w-12 h-1 bg-[#00A6C7] mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredDishes.map((dish, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 flex flex-col group hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-60 overflow-hidden bg-[#002B45]">
                <img 
                  src={dish.image} 
                  alt={`High quality photo of ${dish.name} from RipTides Cocktails & Grill`} 
                  width="600"
                  height="400"
                  loading="lazy" 
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <span className="absolute top-4 left-4 bg-[#002B45]/90 text-[#00A6C7] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">{dish.category}</span>
                <span className="absolute bottom-4 right-4 bg-[#00A6C7] text-white font-black px-4 py-1.5 rounded-xl text-sm shadow-md">{dish.price}</span>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-[#002B45]">{dish.name}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">{dish.description}</p>
                </div>
                <a 
                  href={toastUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={`Order ${dish.name} online via Toast`}
                  className="inline-flex items-center justify-center w-full bg-[#002B45] hover:bg-[#007F9B] text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest transition-colors shadow-md focus:ring-2 focus:ring-[#00A6C7]"
                >
                  ORDER ONLINE ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MAIN MENU CATEGORIES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {filteredCategories.every(c => !c.shouldDisplay) && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-200">
            <p className="text-slate-500 font-bold text-lg">No menu items found. Try another search.</p>
            <button onClick={() => setSearchQuery('')} className="mt-4 px-6 py-2 bg-[#00A6C7] text-white rounded-xl text-xs font-bold uppercase">
              Clear Search
            </button>
          </div>
        )}

        {filteredCategories.map((cat, index) => {
          if (!cat.shouldDisplay) return null;

          const isExpanded = expandedSections[cat.id] || searchQuery !== '';
          const initialLimit = 4;
          const itemsToDisplay = searchQuery !== '' 
            ? cat.displayedItems 
            : (isExpanded ? cat.items : cat.items.slice(0, initialLimit));
          const hasMoreItems = cat.items.length > initialLimit && searchQuery === '';
          const isEven = index % 2 === 0;

          return (
            <div 
              id={cat.id} 
              key={cat.id} 
              className="scroll-mt-36 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 transition-all"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                
                {/* Category Image Box */}
                <div className={`lg:col-span-4 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                  <div className="sticky top-32 space-y-4">
                    <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-[#002B45]">
                      <img 
                        src={cat.image} 
                        alt={`Delicious selection of ${cat.title} at RipTides`} 
                        width="600"
                        height="450"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#002B45]/80 via-transparent to-transparent"></div>
                      <span className="absolute top-4 left-4 bg-[#002B45]/90 text-[#00A6C7] text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">
                        {cat.type}
                      </span>
                      <h3 className="absolute bottom-4 left-4 right-4 text-white text-2xl font-black font-serif uppercase">
                        {cat.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Menu Items List Box */}
                <div className={`lg:col-span-8 space-y-6 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                  <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[#007F9B] font-black text-xs uppercase tracking-[0.3em]">{cat.type} SECTION</span>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#002B45] font-serif uppercase tracking-tight mt-1">{cat.title}</h3>
                    </div>
                    <span className="text-xs font-bold text-slate-400">{cat.items.length} items</span>
                  </div>

                  {itemsToDisplay.length === 0 ? (
                    <p className="text-slate-400 italic text-sm py-4">No matching items in this view.</p>
                  ) : (
                    <div className="space-y-6">
                      {itemsToDisplay.map((item, i) => (
                        <div key={i} className="group pb-5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/80 p-3 rounded-xl transition-colors">
                          <div className="flex justify-between items-baseline gap-4 mb-1">
                            <h4 className="text-base sm:text-lg font-black text-[#111827] group-hover:text-[#007F9B] transition-colors">{item.name}</h4>
                            <div className="flex-grow border-b border-dotted border-slate-300 mx-2 hidden sm:block" aria-hidden="true"></div>
                            <span className="text-base sm:text-lg font-black text-[#007F9B]">{item.price}</span>
                          </div>
                          {item.description && (
                            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* VIEW MORE / SHOW LESS BUTTON */}
                  {hasMoreItems && (
                    <div className="pt-2">
                      <button
                        onClick={() => toggleSection(cat.id)}
                        aria-expanded={isExpanded}
                        aria-label={`Toggle full view of ${cat.title}`}
                        className="w-full py-3 px-6 bg-[#F5F1E8] hover:bg-[#002B45] text-[#002B45] hover:text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        <span>{isExpanded ? 'SHOW LESS' : `VIEW MORE ${cat.title.toUpperCase()} (${cat.items.length - initialLimit} MORE)`}</span>
                        <span className="text-base" aria-hidden="true">{isExpanded ? '−' : '+'}</span>
                      </button>
                    </div>
                  )}

                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* 5. ORDER ONLINE & RESTAURANT CTA BANNER */}
      <section className="bg-[#002B45] text-white py-20 mt-20 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="bg-[#00A6C7] text-white px-3.5 py-1.5 rounded-md text-xs font-black uppercase tracking-widest inline-block shadow-md">
            Crave Quality?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-serif uppercase tracking-tight">
            READY TO ORDER FROM RIPTIDES?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-medium max-w-xl mx-auto">
            Order online securely through Toast or visit us at 168 E Montauk Hwy, Lindenhurst, NY.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href={toastUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Order online via Toast ordering service"
              className="w-full sm:w-auto bg-[#00A6C7] hover:bg-[#007F9B] text-white font-black px-8 py-4 rounded-xl shadow-xl uppercase tracking-widest text-xs transition-transform hover:-translate-y-0.5"
            >
              ORDER ONLINE VIA TOAST ↗
            </a>
            <Link 
              to="/contact" 
              aria-label="View restaurant contact and location information"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/25 text-white border border-white/30 font-black px-8 py-4 rounded-xl backdrop-blur-md transition-all uppercase tracking-widest text-xs text-center"
            >
              CONTACT & LOCATION
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}