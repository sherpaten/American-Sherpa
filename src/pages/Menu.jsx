import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// EXACT IMAGE IMPORTS PRESERVED
import food1 from '../assets/foods/food1.webp';
import food2 from '../assets/foods/food2.webp';
import food3 from '../assets/foods/food3.webp';
import food4 from '../assets/foods/food4.webp';
import food5 from '../assets/foods/food5.webp';
import food6 from '../assets/foods/food6.webp';
import food8 from '../assets/foods/food8.webp';
import food9 from '../assets/foods/food9.webp';
import food10 from '../assets/foods/food10.webp';
import onionring from '../assets/foods/onionring.webp';
import food11 from '../assets/foods/food11.webp';
import food12 from '../assets/foods/food12.webp';
import food13 from '../assets/foods/food13.webp';
import food14 from '../assets/foods/food14.webp';

const TOAST_URL =
  'https://order.toasttab.com/online/riptides-cocktail-and-grill-168-east-montauk-highway';

const menuCategories = [
  {
    id: 'small-plates',
    title: 'Small Plates & Starters',
    type: 'FOOD',
    image: onionring,
    items: [
      {
        name: 'Beer-Battered Onion Rings',
        price: '$14.30',
        description:
          'Beer Battered Onion Rings served with a side of chipotle aioli.',
      },
      {
        name: 'Mozzarella Sticks',
        price: '$15.60',
        description: 'Mozzarella Sticks served with marinara sauce.',
      },
      {
        name: 'Jumbo Pretzel Sticks',
        price: '$22.10',
        description:
          'Three jumbo pretzel sticks served with a choice of beer-cheese sauce, spicy brown mustard or honey mustard.',
      },
      {
        name: 'Disco Fries',
        price: '$16.90',
        description:
          'Disco Fries topped with melted mozzarella cheese and brown gravy.',
      },
      {
        name: 'Truffle Fries',
        price: '$18.20',
        description:
          'Truffle oil, parmesan cheese, parsley, side of chipotle aioli.',
      },
      {
        name: 'Old Bay Fries',
        price: '$14.30',
        description: 'Crispy fries seasoned with signature Old Bay.',
      },
      {
        name: 'Chicken Tenders & Fries',
        price: '$20.80',
        description: 'Crispy chicken tenders served with french fries.',
      },
      {
        name: 'Meatballs',
        price: '$23.40',
        description:
          'Served with our house-made sauce, topped with pecorino romano cheese and a side of ricotta with garlic bread.',
      },
      {
        name: 'Stuffed Mushrooms',
        price: '$16.90',
        description: 'Savory house-stuffed mushroom caps.',
      },
      {
        name: 'Taco Dip',
        price: '$23.40',
        description:
          'Seasoned ground beef, melted shredded cheese, dollop of sour cream, side of tortilla chips.',
      },
    ],
  },

  {
    id: 'soups-salads',
    title: 'Soups & Salads',
    type: 'FOOD',
    image: food10,
    items: [
      {
        name: 'French Onion Soup',
        price: '$12.00',
        description:
          'Classic rich broth with caramelized onions and melted cheese.',
      },
      {
        name: 'RipTides House Salad',
        price: '$13.00',
        description:
          'Fresh greens, seasonal vegetables, and house vinaigrette.',
      },
      {
        name: 'Classic Caesar Salad',
        price: '$14.00',
        description:
          'Crisp romaine, shaved parmesan, garlic croutons, caesar dressing.',
      },
    ],
  },

  {
    id: 'wings',
    title: 'Wings',
    type: 'FOOD',
    image: food1,
    items: [
      {
        name: 'Chicken Wings',
        price: '$18.00',
        description:
          'Crispy wings tossed in your choice of Buffalo (hot, medium, mild), barbecue, or signature sauce, served with celery and blue cheese.',
      },
    ],
  },

  {
    id: 'tacos',
    title: 'Tacos',
    type: 'FOOD',
    image: food4,
    items: [
      {
        name: 'Caribbean Jerk Chicken Taco',
        price: '$11.70',
        description:
          'Grilled chicken, red cabbage, pineapple pico de gallo, spicy caribbean jerk sauce in a soft flour tortilla.',
      },
      {
        name: 'Grilled Shrimp Taco',
        price: '$11.70',
        description:
          'Grilled shrimp, pineapple pico de gallo, red cabbage, chipotle aioli drizzle in a soft flour tortilla.',
      },
      {
        name: 'Ground Beef Taco',
        price: '$11.70',
        description:
          'Ground beef, lettuce, cheddar cheese, tomatoes in a soft flour tortilla.',
      },
      {
        name: 'Plain Grilled Chicken Taco',
        price: '$11.70',
        description: 'Simple grilled chicken in a soft flour tortilla.',
      },
      {
        name: 'Plate of Three Tacos',
        price: '$35.10',
        description:
          'Choice of Caribbean Jerk Chicken, Grilled Shrimp, Fish, or Ground Beef Tacos.',
      },
    ],
  },

  {
    id: 'seafood',
    title: 'Seafood Dishes',
    type: 'FOOD',
    image: food5,
    items: [
      {
        name: 'Baked Clams',
        price: '$23.40',
        description: 'Chopped clams, house-made stuffing, lemon.',
      },
      {
        name: 'Fish & Chips',
        price: '$31.20',
        description: 'Beer-battered fried cod, fries, tartar sauce, lemon.',
      },
      {
        name: 'PEI Mussels',
        price: '$27.30',
        description:
          'Served with garlic bread in your choice of marinara, fra diavolo or white wine garlic sauce.',
      },
      {
        name: 'Crispy Coconut Shrimp',
        price: '$27.30',
        description:
          'Crispy Coconut Shrimp topped with a sweet and spicy chilli sauce.',
      },
    ],
  },

  {
    id: 'burgers-sandwiches',
    title: 'Burgers, Sandwiches & Wraps',
    type: 'FOOD',
    image: food3,
    items: [
      {
        name: 'Classic Burger',
        price: '$22.10',
        description:
          'Angus beef patty, lettuce, tomato, dill pickle chips, choice of cheese, brioche bun.',
      },
      {
        name: 'BBQ Bacon Burger',
        price: '$26.00',
        description:
          'Angus beef patty, lettuce, tomato, dill pickle chips, applewood bacon, cheddar cheese, BBQ sauce, brioche bun.',
      },
      {
        name: 'Mushroom Swiss Burger',
        price: '$28.60',
        description:
          'Angus beef patty, lettuce, tomato, dill pickle chips, sautéed mushrooms, caramelized onions, Swiss cheese, brioche bun.',
      },
      {
        name: 'Pub Burger',
        price: '$28.60',
        description:
          'Angus beef patty, lettuce, tomato, dill pickle chips, sautéed mushrooms, caramelized onions, Swiss cheese, brioche bun.',
      },
      {
        name: 'Open-Faced Steak Tidbit Sandwich',
        price: '$40.30',
        description:
          'Grilled skirt steak cooked to temperature, toasted garlic ciabatta bread, mozzarella cheese and brown gravy.',
      },
      {
        name: 'Grilled Chicken Pesto Sandwich',
        price: '$26.00',
        description:
          'Grilled chicken, pesto spread, lettuce, tomato on a fresh roll.',
      },
      {
        name: 'Buffalo Chicken Wrap',
        price: '$24.70',
        description:
          'Crispy chicken tossed in buffalo sauce, lettuce, tomato, blue cheese in a flour tortilla.',
      },
      {
        name: 'Chicken Caesar Wrap',
        price: '$24.70',
        description:
          'Grilled chicken, romaine lettuce, parmesan cheese, caesar dressing, flour tortilla.',
      },
    ],
  },

  {
    id: 'quesadillas',
    title: 'Quesadillas',
    type: 'FOOD',
    image: food11,
    items: [
      {
        name: 'Three-Cheese Quesadilla',
        price: '$14.30',
        description:
          'Grilled and then baked; served with a choice of sour cream, guacamole or salsa.',
      },
      {
        name: 'Grilled Chicken Quesadilla',
        price: '$26.00',
        description:
          'Grilled chicken, melted cheese; served with a choice of sour cream, guacamole or salsa.',
      },
      {
        name: 'Buffalo Chicken Bleu Cheese Quesadilla',
        price: '$27.30',
        description:
          'Buffalo chicken and bleu cheese; served with a choice of sour cream, guacamole or salsa.',
      },
      {
        name: 'Grilled Shrimp Quesadilla',
        price: '$27.30',
        description:
          'Grilled shrimp, melted cheese; served with a choice of sour cream, guacamole or salsa.',
      },
      {
        name: 'Steak Quesadilla',
        price: '$29.90',
        description:
          'Tender steak, melted cheese; served with a choice of sour cream, guacamole or salsa.',
      },
    ],
  },

  {
    id: 'pizza',
    title: '10" Personal Pies',
    type: 'FOOD',
    image: food12,
    items: [
      {
        name: 'Cheese Pizza',
        price: '$11.00',
        description:
          'Classic mozzarella and tomato sauce on a personal crust.',
      },
      {
        name: 'Pepperoni Pizza',
        price: '$12.00',
        description: 'Loaded with savory pepperoni slices.',
      },
      {
        name: "Meat Lover's Pizza",
        price: '$13.00',
        description: 'Topped with assorted premium meats and cheese.',
      },
    ],
  },

  {
    id: 'cocktails',
    title: 'Cocktails & Frozen Drinks',
    type: 'DRINKS',
    image: food8,
    items: [
      {
        name: 'Frozen Miami Vice',
        price: '$17.00',
        description:
          'Half piña colada & half strawberry daiquiri poured to perfection and topped with whipped cream.',
      },
      {
        name: 'Frozen Piña Colada',
        price: '$15.00',
        description:
          'White rum, pineapple juice, cream of coconut; topped with whipped cream.',
      },
      {
        name: 'Frozen Strawberry Daiquiri',
        price: '$15.00',
        description:
          'White rum, strawberry puree, splash of lime juice; topped with whipped cream.',
      },
      {
        name: 'Frozen Margarita',
        price: '$14.00',
        description: 'Tequila, house margarita mix.',
      },
      {
        name: 'Frozen Flavored Margarita',
        price: '$15.00',
        description: 'Tequila, house margarita mix with choice of flavor.',
      },
      {
        name: 'Frozen Rocket Fuel',
        price: '$16.00',
        description:
          'Dark rum, amaretto, pineapple juice, cream of coconut; topped with an overproof rum floater.',
      },
    ],
  },

  {
    id: 'beverage-spirits',
    title: 'Beer, Wine & Spirits',
    type: 'DRINKS',
    image: food2,
    items: [
      {
        name: 'Draft & Bottled Beers',
        price: 'Market',
        description:
          'Selection of domestic, imported, and local craft beers on tap and in bottles.',
      },
      {
        name: 'House Red & White Wines',
        price: 'Market',
        description: 'Carefully curated glass and bottle selections.',
      },
      {
        name: 'Cocktails & Spirits',
        price: 'Market',
        description:
          'Full premium liquor bar offering custom martinis, sangrias, and mixed spirits.',
      },
    ],
  },

  {
    id: 'winter-drink',
    title: 'Winter Drink Menu',
    type: 'DRINKS',
    image: food14,
    items: [
      {
        name: 'Virgin Island Colada',
        price: '$9.00',
        description:
          'Cream of coconut, pineapple juice, blended smooth and topped with whipped cream.',
      },
      {
        name: 'Berry Breeze Mocktail',
        price: '$8.50',
        description:
          'Strawberry puree, fresh lime juice, and ginger beer over crushed ice.',
      },
      {
        name: 'Sunset Cooler',
        price: '$8.50',
        description:
          'Orange juice, cranberry juice, a splash of grenadine, and club soda.',
      },
      {
        name: 'Assorted Soft Drinks & Teas',
        price: '$4.00',
        description:
          'Selection of fountain sodas, iced tea, and lemonade.',
      },
    ],
  },
];

const featuredDishes = [
  {
    name: 'BBQ Bacon Burger',
    category: 'Burgers & Sandwiches',
    price: '$26.00',
    description:
      'Angus beef patty, lettuce, tomato, dill pickle chips, applewood bacon, cheddar cheese, BBQ sauce, brioche bun.',
    image: food13,
  },
  {
    name: 'Fish & Chips',
    category: 'Seafood Dishes',
    price: '$31.20',
    description:
      'Beer-battered fried cod, fries, tartar sauce, lemon.',
    image: food5,
  },
  {
    name: 'Frozen Miami Vice',
    category: 'Cocktails & Frozen Drinks',
    price: '$17.00',
    description:
      'Half piña colada & half strawberry daiquiri poured to perfection and topped with whipped cream.',
    image: food6,
  },
];

const filterOptions = {
  FOOD: [
    { id: 'ALL', label: 'All Food' },
    { id: 'STARTERS', label: 'Starters' },
    { id: 'TOSSED', label: 'Wings' },
    { id: 'TACOS', label: 'Tacos' },
    { id: 'BURGERS', label: 'Burgers' },
    { id: 'SEAFOOD', label: 'Seafood' },
  ],

  DRINKS: [
    { id: 'ALL', label: 'All Drinks' },
    { id: 'DRINKS', label: 'All Drinks & Bar' },
  ],
};

export default function Menu() {
  const [activeTab, setActiveTab] = useState('FOOD');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    const offset = 135;

    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth',
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveFilter('ALL');
    setSearchQuery('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return menuCategories.map((cat) => {
      const matchesTab = cat.type === activeTab;

      let matchesFilter = true;

      if (activeFilter !== 'ALL') {
        if (activeFilter === 'STARTERS') {
          matchesFilter = cat.id === 'small-plates';
        }

        if (activeFilter === 'TOSSED') {
          matchesFilter = cat.id === 'wings';
        }

        if (activeFilter === 'TACOS') {
          matchesFilter = cat.id === 'tacos';
        }

        if (activeFilter === 'BURGERS') {
          matchesFilter = cat.id === 'burgers-sandwiches';
        }

        if (activeFilter === 'SEAFOOD') {
          matchesFilter = cat.id === 'seafood';
        }

        if (activeFilter === 'DRINKS') {
          matchesFilter = cat.type === 'DRINKS';
        }
      }

      const matchesSearch =
        query === '' ||
        cat.title.toLowerCase().includes(query) ||
        cat.items.some(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );

      const displayedItems =
        query === ''
          ? cat.items
          : cat.items.filter(
              (item) =>
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                cat.title.toLowerCase().includes(query)
            );

      return {
        ...cat,
        shouldDisplay:
          matchesTab &&
          matchesFilter &&
          (matchesSearch || displayedItems.length > 0),
        displayedItems,
      };
    });
  }, [activeTab, activeFilter, searchQuery]);

  const visibleCategories = filteredCategories.filter(
    (category) => category.shouldDisplay
  );

  return (
    <main className="bg-[#F7F4EC] text-[#0B1329] min-h-screen">

      <SEO
        title="RipTides Menu | Seafood, Burgers, Wings & Cocktails"
        description="Explore the RipTides Cocktails & Grill menu in Lindenhurst, NY featuring seafood, burgers, wings, tacos, soups, appetizers and handcrafted cocktails."
        path="/menu"
        image={food9}
      />

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative min-h-[480px] lg:min-h-[530px] flex items-center overflow-hidden bg-[#06283D]">

        <div className="absolute inset-0">
          <img
            src={food9}
            alt="RipTides Cocktails & Grill interior and atmosphere"
            width="1920"
            height="1080"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#06283D]/95 via-[#06283D]/75 to-[#06283D]/35" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#06283D] via-transparent to-[#06283D]/30" />

        <div className="relative z-10 site-container py-24 lg:py-28">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#5ED7E5]/40 bg-[#06283D]/50 backdrop-blur-md">

              <span className="w-1.5 h-1.5 rounded-full bg-[#5ED7E5]" />

              <span className="text-[#DFFBFF] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.22em]">
                168 E Montauk Hwy • Lindenhurst, NY
              </span>

            </div>

            <p className="section-kicker text-[#5ED7E5] mb-3 text-[10px]">
              Fresh From The Kitchen • Crafted At The Bar
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tight text-white font-serif">
              The RipTides
              <span className="block text-[#5ED7E5]">
                Menu
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed">
              Seafood, wings, burgers, tacos, and handcrafted cocktails made
              for good times.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 mt-7">

              <a
                href={TOAST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                aria-label="Order online via Toast"
              >
                Order Online
                <span aria-hidden="true">↗</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('FOOD');
                  setActiveFilter('ALL');
                  scrollToSection('small-plates');
                }}
                className="btn-secondary border-white/40 text-white hover:bg-white hover:text-[#06283D]"
              >
                Explore The Menu
              </button>

            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#F7F4EC] to-transparent" />

      </section>

      {/* =========================================================
          MENU CONTROLS
      ========================================================== */}
      <section className="relative z-30 -mt-1">

        <div className="bg-[#06283D] border-y border-white/10 shadow-xl">

          <div className="site-container py-3 lg:py-4">

            <div className="flex flex-col lg:flex-row lg:items-center gap-3">

              {/* FOOD / DRINKS */}
              <div className="flex w-full lg:w-auto p-1 rounded-xl bg-[#0B1329] border border-white/10">

                <button
                  type="button"
                  onClick={() => handleTabChange('FOOD')}
                  aria-pressed={activeTab === 'FOOD'}
                  className={`flex-1 lg:flex-none min-w-[125px] px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.16em] transition-all ${
                    activeTab === 'FOOD'
                      ? 'bg-[#008FA8] text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Food Menu
                </button>

                <button
                  type="button"
                  onClick={() => handleTabChange('DRINKS')}
                  aria-pressed={activeTab === 'DRINKS'}
                  className={`flex-1 lg:flex-none min-w-[125px] px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.16em] transition-all ${
                    activeTab === 'DRINKS'
                      ? 'bg-[#008FA8] text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Drinks & Bar
                </button>

              </div>

              {/* SEARCH */}
              <div className="relative flex-1 lg:max-w-sm lg:ml-auto">

                <label
                  htmlFor="menu-search-input"
                  className="sr-only"
                >
                  Search menu items
                </label>

                <span
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5ED7E5]"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-3.5 h-3.5"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>
                </span>

                <input
                  id="menu-search-input"
                  type="search"
                  placeholder="Search dishes, drinks, ingredients..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full h-10 pl-10 pr-10 rounded-lg bg-white/10 border border-white/10 text-white text-xs placeholder:text-slate-400 outline-none focus:border-[#5ED7E5] focus:ring-1 focus:ring-[#5ED7E5] transition"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition"
                  >
                    ×
                  </button>
                )}

              </div>
            </div>

            {/* FILTERS */}
            <div className="mt-3 pt-3 border-t border-white/10">

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">

                {filterOptions[activeTab].map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.14em] transition ${
                      activeFilter === filter.id
                        ? 'bg-[#5ED7E5] text-[#06283D]'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}

                <span className="hidden sm:block ml-auto text-[9px] uppercase tracking-[0.14em] text-slate-500 font-bold">
                  {visibleCategories.length} sections
                </span>

              </div>
            </div>

            {/* CATEGORY NAV */}
            <div className="mt-2">

              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">

                {menuCategories
                  .filter((category) => category.type === activeTab)
                  .map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        setActiveFilter('ALL');
                        scrollToSection(category.id);
                      }}
                      className="whitespace-nowrap px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400 hover:text-[#5ED7E5] transition-colors"
                    >
                      {category.title}
                    </button>
                  ))}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED FAVORITES
      ========================================================== */}
      <section className="py-12 lg:py-14">

        <div className="site-container">

          <div className="max-w-xl mx-auto text-center mb-8">

            <p className="section-kicker">
              From Our Menu
            </p>

            <h2 className="section-title">
              RipTides <span>Favorites</span>
            </h2>

            <p className="section-copy">
              A few guest favorites to get you started. Come hungry and stay
              awhile.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-4 lg:gap-5">

            {featuredDishes.map((dish) => (
              <article
                key={dish.name}
                className="group card overflow-hidden p-0 flex flex-col"
              >

                <div className="relative aspect-[4/3] overflow-hidden bg-[#06283D]">

                  <img
                    src={dish.image}
                    alt={`${dish.name} at RipTides Cocktails & Grill`}
                    width="600"
                    height="450"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#06283D]/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="brand-badge text-[8px]">
                      {dish.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <span className="gold-badge text-xs">
                      {dish.price}
                    </span>
                  </div>

                </div>

                <div className="flex flex-col flex-1 p-4">

                  <h3 className="text-xl font-black font-serif text-[#06283D]">
                    {dish.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                    {dish.description}
                  </p>

                  <a
                    href={TOAST_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#06283D] text-white text-[9px] font-black uppercase tracking-[0.16em] hover:bg-[#008FA8] transition-colors"
                  >
                    Order This Favorite
                    <span aria-hidden="true">↗</span>
                  </a>

                </div>
              </article>
            ))}

          </div>
        </div>
      </section>

      {/* =========================================================
          MENU CONTENT
      ========================================================== */}
      <section className="pb-14 lg:pb-16">

        <div className="site-container">

          {visibleCategories.length === 0 ? (

            <div className="card text-center py-16 px-6">

              <div className="w-14 h-14 mx-auto rounded-full bg-[#E6F7FA] flex items-center justify-center text-[#008FA8]">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-6 h-6"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>

              </div>

              <h2 className="mt-5 text-xl font-black font-serif text-[#06283D]">
                No Menu Items Found
              </h2>

              <p className="mt-2 text-sm text-[#64748B]">
                Try another search or browse the full menu.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('ALL');
                }}
                className="btn-primary mt-6"
              >
                Clear Search
              </button>

            </div>

          ) : (

            <div className="space-y-7 lg:space-y-8">

              {filteredCategories.map((category, index) => {

                if (!category.shouldDisplay) return null;

                const isExpanded =
                  expandedSections[category.id] || searchQuery !== '';

                const initialLimit = 4;

                const itemsToDisplay =
                  searchQuery !== ''
                    ? category.displayedItems
                    : isExpanded
                      ? category.items
                      : category.items.slice(0, initialLimit);

                const hasMoreItems =
                  category.items.length > initialLimit &&
                  searchQuery === '';

                const reversed = index % 2 !== 0;

                return (
                  <article
                    id={category.id}
                    key={category.id}
                    className="scroll-mt-[135px]"
                  >

                    <div className="card overflow-hidden p-0">

                      <div className="grid lg:grid-cols-12">

                        {/* =================================================
                            IMAGE
                        ================================================= */}
                        <div
                          className={`lg:col-span-4 ${
                            reversed ? 'lg:order-2' : ''
                          }`}
                        >

                          <div className="relative h-[220px] sm:h-[240px] lg:h-[300px] bg-[#06283D] overflow-hidden">

                            <img
                              src={category.image}
                              alt={`Delicious ${category.title} at RipTides Cocktails & Grill`}
                              width="600"
                              height="450"
                              loading="lazy"
                              decoding="async"
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#06283D]/90 via-[#06283D]/20 to-transparent" />

                            <div className="absolute top-4 left-4">
                              <span className="brand-badge text-[8px]">
                                {category.type === 'FOOD'
                                  ? 'Kitchen'
                                  : 'Bar'}
                              </span>
                            </div>

                            <div className="absolute bottom-4 left-5 right-5">

                              <p className="text-[#5ED7E5] text-[9px] font-black uppercase tracking-[0.22em] mb-1.5">
                                {category.items.length} Items
                              </p>

                              <h2 className="text-2xl sm:text-3xl font-black font-serif uppercase leading-tight text-white">
                                {category.title}
                              </h2>

                            </div>

                          </div>
                        </div>

                        {/* =================================================
                            ITEMS
                        ================================================= */}
                        <div
                          className={`lg:col-span-8 p-5 sm:p-6 lg:p-7 ${
                            reversed ? 'lg:order-1' : ''
                          }`}
                        >

                          {/* HEADER */}
                          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 pb-3.5 border-b border-[#E2E8F0]">

                            <div>

                              <p className="section-kicker mb-1.5 text-[9px]">
                                {category.type === 'FOOD'
                                  ? 'From The Kitchen'
                                  : 'From The Bar'}
                              </p>

                              <h2 className="text-xl sm:text-2xl font-black font-serif text-[#06283D] uppercase leading-tight">
                                {category.title}
                              </h2>

                            </div>

                            <span className="text-[9px] font-black uppercase tracking-[0.14em] text-[#94A3B8]">
                              {category.items.length} selections
                            </span>

                          </div>

                          {/* DISH ROWS */}
                          <div className="mt-1 divide-y divide-[#E2E8F0]">

                            {itemsToDisplay.map((item) => (

                              <div
                                key={item.name}
                                className="group py-3 px-1 -mx-1 rounded-lg hover:bg-[#F8FAFC] transition-colors"
                              >

                                <div className="flex items-start gap-3">

                                  <div className="flex-1 min-w-0">

                                    <div className="flex items-baseline gap-2">

                                      <h3 className="text-sm sm:text-base font-black text-[#0B1329] group-hover:text-[#008FA8] transition-colors leading-snug">
                                        {item.name}
                                      </h3>

                                      <div
                                        className="hidden sm:block flex-1 border-b border-dotted border-[#CBD5E1]"
                                        aria-hidden="true"
                                      />

                                    </div>

                                    {item.description && (
                                      <p className="mt-1 text-[11px] sm:text-xs text-[#64748B] leading-relaxed max-w-2xl">
                                        {item.description}
                                      </p>
                                    )}

                                  </div>

                                  <span className="shrink-0 text-sm sm:text-base font-black text-[#008FA8] whitespace-nowrap">
                                    {item.price}
                                  </span>

                                </div>

                              </div>
                            ))}

                          </div>

                          {/* VIEW MORE */}
                          {hasMoreItems && (

                            <button
                              type="button"
                              onClick={() => toggleSection(category.id)}
                              aria-expanded={isExpanded}
                              className="mt-3.5 w-full py-2.5 px-4 rounded-lg border border-[#D9E4E8] bg-[#F7F4EC] text-[#06283D] text-[9px] font-black uppercase tracking-[0.16em] hover:bg-[#06283D] hover:text-white hover:border-[#06283D] transition-all"
                            >

                              <span>
                                {isExpanded
                                  ? 'Show Less'
                                  : `View More ${category.title} (${category.items.length - initialLimit} More)`}
                              </span>

                              <span
                                className="ml-1.5 text-sm"
                                aria-hidden="true"
                              >
                                {isExpanded ? '−' : '+'}
                              </span>

                            </button>
                          )}

                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}

            </div>
          )}

        </div>
      </section>

      {/* =========================================================
          RESTAURANT CTA
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#06283D] text-white">

        <div className="absolute inset-0 opacity-20">

          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border-[60px] border-[#5ED7E5]" />

          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full border-[80px] border-[#008FA8]" />

        </div>

        <div className="relative z-10 site-container py-16 lg:py-20">

          <div className="max-w-3xl mx-auto text-center">

            <p className="section-kicker text-[#5ED7E5]">
              Good Food. Cold Drinks. Good Times.
            </p>

            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black font-serif uppercase leading-tight">
              Come Hungry.
              <span className="block text-[#5ED7E5]">
                Leave Happy.
              </span>
            </h2>

            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Order online through Toast or visit RipTides at 168 E Montauk
              Hwy in Lindenhurst, NY.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-2.5 mt-6">

              <a
                href={TOAST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Order Online Via Toast
                <span aria-hidden="true">↗</span>
              </a>

              <Link
                to="/contact"
                className="btn-secondary border-white/30 text-white hover:bg-white hover:text-[#06283D]"
              >
                Contact & Location
              </Link>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}