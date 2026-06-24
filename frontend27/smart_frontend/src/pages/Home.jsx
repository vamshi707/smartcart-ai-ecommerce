import Footer from "../components/Footer";
import {
  Search, ShoppingCart, MapPin, ChevronRight, Heart, Star,
  Truck, ShieldCheck, Sparkles, Tag, Clock, Headphones,
  Smartphone, Shirt, Sofa, Apple, Gem, Gamepad2, Baby, BookOpen,
  Zap, Camera, TrendingUp, Award, Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

 

const categories = [
  { name: "Groceries", icon: Apple, gradient: "bg-gradient-lime", tag: "10 min" },
  { name: "Fashion", icon: Shirt, gradient: "bg-gradient-berry", tag: "Trending" },
  { name: "Electronics", icon: Smartphone, gradient: "bg-gradient-mint", tag: "New" },
  { name: "Furniture", icon: Sofa, gradient: "bg-gradient-sun", tag: "Sale" },
  { name: "Beauty", icon: Gem, gradient: "bg-gradient-berry", tag: "AI Match" },
];

const banners = [
  {
    title: "Groceries in 10 minutes",
    subtitle: "Fresh, fast, every day",
    cta: "Order now",
    className: "bg-gradient-lime text-[oklch(0.2_0.04_140)]",
    badge: "Express",
    icon: Apple,
    route: "/grocery",
  },

  {
    title: "Mega Fashion Edit",
    subtitle: "Up to 70% off — new drops daily",
    cta: "Shop the look",
    className: "bg-gradient-berry text-[oklch(0.2_0.04_140)]",
    badge: "70% OFF",
    icon: Shirt,
    route: "/fashion",
  },

  {
    title: "Smart Hardware",
    subtitle: "Mobiles, laptops & gadgets",
    cta: "Explore",
    className: "bg-gradient-mint text-[oklch(0.18_0.04_220)]",
    badge: "Lowest Prices",
    icon: Smartphone,
    route: "/electronics",
  },

  {
    title: "Luxury Furniture",
    subtitle: "Premium Home Decor",
    cta: "Explore",
    className: "bg-gradient-to-r from-orange-600 to-red-700 text-black",
    badge: "40% OFF",
    icon: Sofa,
    route: "/furniture",
  },

  {
    title: "Beauty Collection",
    subtitle: "AI Beauty Match",
    cta: "Shop Now",
    className: "bg-gradient-to-r from-rose-800 to-pink-600 text-black",
    badge: "Trending",
    icon: Gem,
    route: "/beauty",
  },
];

const products = [
  { name: "Wireless Headphones Pro", price: "₹2,999", mrp: "₹6,499", rating: 4.6, tag: "Bestseller", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop" },
  { name: "Modern Velvet Sofa", price: "₹12,499", mrp: "₹19,999", rating: 4.4, tag: "New", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop" },
  { name: "Smart Watch Ultra", price: "₹4,999", mrp: "₹8,999", rating: 4.7, tag: "-44%", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop" },
  { name: "Urban Sneakers", price: "₹1,999", mrp: "₹3,499", rating: 4.5, tag: "Trending", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" },
  { name: "DSLR Camera 24MP", price: "₹38,990", mrp: "₹49,990", rating: 4.8, tag: "Pro", img: "https://images.unsplash.com/photo-1519183071298-a2962feb14f4?q=80&w=800&auto=format&fit=crop" },
  { name: "Glow Skincare Set", price: "₹1,299", mrp: "₹2,200", rating: 4.6, tag: "AI Match", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop" },
  { name: "Kitchen Mixer", price: "₹3,499", mrp: "₹5,999", rating: 4.3, tag: "Deal", img: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=80&w=800&auto=format&fit=crop" },
  { name: "Gaming Console", price: "₹39,999", mrp: "₹44,999", rating: 4.9, tag: "Hot", img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800&auto=format&fit=crop" },
];

const deals = [
  { title: "Fresh Vegetables", subtitle: "From ₹19", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop" },
  { title: "Home Decor", subtitle: "Starting ₹199", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop" },
  { title: "Beauty Picks", subtitle: "AI skin match",   img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80" },
  { title: "Men's Fashion", subtitle: "From ₹299", img: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=600&auto=format&fit=crop" },
];

function Home() {
  

  const navigate = useNavigate();
  

const addToCart = (product) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const cartItem = {
    id: product.name,
    name: product.name,
    price: Number(product.price.replace("₹", "").replace(",", "")),
    old_price: product.mrp,
    image: product.img,
    rating: product.rating,
    quantity: 1,
  };

  if (!isLoggedIn) {
    localStorage.setItem(
      "pendingCartItem",
      JSON.stringify(cartItem)
    );

    navigate("/login");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(
    (item) => item.id === cartItem.id
  );

  if (existing) {
    cart = cart.map((item) =>
      item.id === cartItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

  return (
    <>
    <div className="min-h-screen bg-white text-foreground">
      {/* TOP BAR */}
      <div className="bg-gradient-brand text-primary-foreground text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5"><Truck className="size-3.5" /> Free delivery on orders above ₹499</span>
          <div className="hidden md:flex items-center gap-4 opacity-90">
            <span>Sell on SmartMart</span><span>Track Order</span><span>Help</span>
          </div>
        </div>
      </div>

   

      {/* MARQUEE STRIP */}
      <div className="bg-black text-white overflow-hidden">
        <div className="flex gap-12 py-2 text-xs font-medium animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              <span className="flex items-center gap-2"><Sparkles className="size-3.5 text-yellow-400"  /> AI Skin-Tone Beauty Match — try the camera</span>
              <span className="flex items-center gap-2"><Tag className="size-3.5 text-yellow-400" /> Big Smart Days — up to 80% off</span>
              <span className="flex items-center gap-2"><Truck className="size-3.5 text-yellow-400" /> Groceries in 10 minutes</span>
              <span className="flex items-center gap-2"><ShieldCheck className="size-3.5 text-yellow-400" /> 100% authentic products</span>
              <span className="flex items-center gap-2"><Award className="size-3.5 text-yellow-400" /> 50M+ happy customers</span>
            </div>
          ))}
        </div>
      </div>

      {/* BANNER GRID (Zepto-style ads) */}
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <div className="grid md:grid-cols-5 gap-6">
          {banners.map((b) => {
  const Icon = b.icon;
  return (
    <div
      key={b.title}
      onClick={() => navigate(b.route)}
      className={`relative overflow-hidden rounded-3xl p-6 min-h-[200px]
      flex flex-col justify-between shadow-card hover:shadow-pop
      hover:scale-105 transition cursor-pointer ${b.className}`}
    >
                <div className="flex items-start justify-between">
                  <span className="bg-white/25 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">{b.badge}</span>
                  <Icon className="size-10 opacity-80 animate-float" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold leading-tight">{b.title}</h3>
                  <p className="text-sm opacity-90 mt-1">{b.subtitle}</p>
                  <button className="mt-4 bg-white/95 text-foreground text-sm font-bold px-4 py-2 rounded-full inline-flex items-center gap-1 hover:bg-white">
                    {b.cta} <ChevronRight className="size-4" />
                  </button>
                </div>
                <div className="absolute -right-10 -bottom-10 size-40 rounded-full bg-white/10" />
              </div>
              
            );
          })}
          
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-2">

  <div className="relative overflow-hidden rounded-[40px] shadow-2xl border border-gray-200">

    <img
      src="/logopic.jpeg"
      alt="SmartMart Banner"
      className="w-full object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

  </div>

</section>
      

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Shop by category</h2>
            <p className="text-muted-foreground mt-1">Everything you need, all in one place.</p>
          </div>
          <a className="text-sm font-semibold text-primary hidden md:flex items-center gap-1 cursor-pointer">View all <ChevronRight className="size-4" /></a>
        </div>
        <div className=" grid md: grid-cols-5 gap-4 md:grid-cols-5 gap-4">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <button
  key={c.name}
  onClick={() => {
    if (c.name === "Groceries") navigate("/grocery");
    if (c.name === "Fashion") navigate("/fashion");
    if (c.name === "Electronics") navigate("/electronics");
    if (c.name === "Furniture") navigate("/furniture");
    if (c.name === "Beauty") navigate("/beauty");
  }}
  className="group relative bg-card rounded-2xl p-4 shadow-card hover:shadow-pop hover:-translate-y-1 transition text-center cursor-pointer"
>
                <div className={`size-14 mx-auto rounded-2xl ${c.gradient} grid place-items-center text-white shadow-soft`}>
                  <Icon className="size-7" />
                </div>
                <div className="mt-3 text-sm font-bold">{c.name}</div>
                <div className="text-[10px] text-muted-foreground">{c.tag}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* AI SKIN-MATCH FEATURE STRIP */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-brand text-primary-foreground overflow-hidden grid md:grid-cols-2 shadow-pop">
          <div className="p-8 md:p-12">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">
              <Sparkles className="size-3.5" /> AI POWERED · NEW
            </div>
            <h3 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight text-balance">
              Find your perfect shade with   <span className="text-accent"> Smart AI</span>
            </h3>
            <p className="mt-3 opacity-90 max-w-md">
                Upload or click a photo and SmartCart AI detects
  fashion styles, furniture, groceries, beauty products,
  electronics and much more — then gives personalized
  recommendations instantly.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="bg-accent text-accent-foreground font-bold px-5 py-3 rounded-full inline-flex items-center gap-2 hover:opacity-90">
                <Camera className="size-4" /> Try AI Match
              </button>
              <button className="bg-white/15 backdrop-blur font-semibold px-5 py-3 rounded-full hover:bg-white/25">
                How it works
              </button>
            </div>
          </div>
     <div className="relative h-[400px] overflow-hidden">

  <div className="flex animate-slider h-full">

    {/* IMAGE 1 */}
    <img
      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
      alt="Beauty AI"
      className="min-w-full h-full object-cover"
    />

    {/* IMAGE 2 */}
    <img
      src=" https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
      alt="Furniture AI"
      className="min-w-full h-full object-cover"
    />
          <img
  src="https://images.unsplash.com/photo-1724908267988-63310819325c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  alt="home AI"
    className="min-w-full h-full object-cover"
/>

    {/* IMAGE 3 */}
    <img
      src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg"
      alt="Grocery AI"
      className="min-w-full h-full object-cover"
    />
  

            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary/40" />
          </div>
        </div>
        </div>
      </section>

      {/* DEAL TILES */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold flex items-center gap-2">
              <TrendingUp className="size-7 text-primary " /> Top deals today
            </h2>
            <p className="text-muted-foreground mt-1">Hand-picked offers across every category.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {deals.map((d) => (
           <div
 
  key={d.title}
  onClick={() => navigate("/All")}
  className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-pop transition cursor-pointer"
>

              <img src={d.img} alt={d.title} className="aspect-square w-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <div className="text-sm font-bold">{d.title}</div>
                <div className="text-xs opacity-90">{d.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Featured for you</h2>
            <p className="text-muted-foreground mt-1">Personalized by SmartMart AI.</p>
          </div>
          <a className="text-sm font-semibold text-primary hidden md:flex items-center gap-1 cursor-pointer">See all <ChevronRight className="size-4" /></a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <div key={p.name} className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-pop hover:-translate-y-1 transition group">
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute top-3 left-3 bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded-full">{p.tag}</span>
                <button className="absolute top-3 right-3 size-8 grid place-items-center rounded-full bg-card/90 backdrop-blur hover:text-destructive">
                  <Heart className="size-4" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 text-xs">
                  <span className="bg-success text-success-foreground px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                    {p.rating} <Star className="size-3 fill-current" />
                  </span>
                  <span className="text-muted-foreground">(2.1k)</span>
                </div>
                <h3 className="mt-2 font-semibold text-sm line-clamp-1">{p.name}</h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-extrabold">{p.price}</span>
                  <span className="text-xs text-muted-foreground line-through">{p.mrp}</span>
                </div>
               <button
  onClick={() => addToCart(p)}
  className="w-full mt-6 bg-black text-white py-4 rounded-2xl text-xl hover:bg-purple-700 transition"
>
  Add To Cart
</button>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY SMARTCART */}
<section className="relative max-w-7xl mx-auto px-4 pb-6 overflow-hidden rounded-3xl">

  {/* BACKGROUND VIDEO */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/smartcart.mp4" type="video/mp4" />
  </video>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/70"></div>

  {/* GLOW EFFECTS */}
  <div className="absolute top-10 left-10 w-52 h-52 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>

  <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

  {/* CONTENT */}
  <div className="relative z-10 rounded-3xl border border-white/10 p-5 md:p-6 backdrop-blur-sm">

    {/* TOP TEXT */}
    <div className="text-center max-w-2xl mx-auto">

      <span className="text-xs font-bold text-pink-400 uppercase tracking-[4px]">
        Why SmartCart
      </span>

      <h2 className="text-2xl md:text-3xl font-extrabold mt-2 text-white leading-tight">

        One app.
        <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
          {" "}Every category.
        </span>

        <br />

        Smarter shopping.

      </h2>

      <p className="text-gray-300 mt-3 text-sm leading-relaxed">

        From groceries to fashion, electronics and furniture —
        SmartMart brings AI-powered shopping into one premium experience.

      </p>

    </div>

    {/* FEATURE CARDS */}
    <div className="grid md:grid-cols-4 gap-4 mt-7">

      {[
        {
          icon: Clock,
          title: "10-min express",
          desc: "Groceries & essentials delivered instantly.",
        },

        {
          icon: ShieldCheck,
          title: "100% authentic",
          desc: "Trusted brands with verified quality checks.",
        },

        {
          icon: Sparkles,
          title: "AI shopping",
          desc: "Skin tone detect, smart fashion & room AI.",
        },

        {
          icon: Headphones,
          title: "24×7 support",
          desc: "Fast support with real human assistance.",
        },

      ].map(({ icon: Icon, title, desc }) => (

        <div
          key={title}
          className="
            group
            rounded-2xl
            bg-white/10
            border border-white/10
            backdrop-blur-md
            p-4
            hover:bg-white/20
            hover:scale-105
            transition-all
            duration-300
            shadow-xl
          "
        >

          {/* ICON */}
          <div className="
            size-11
            rounded-xl
            bg-gradient-to-r
            from-pink-500
            to-blue-500
            grid
            place-items-center
            text-white
            shadow-lg
            group-hover:rotate-6
            transition
          ">

            <Icon className="size-5" />

          </div>

          {/* TITLE */}
          <h4 className="mt-4 font-bold text-lg text-white">

            {title}

          </h4>

          {/* DESC */}
          <p className="text-sm text-gray-300 mt-1 leading-relaxed">

            {desc}

          </p>

        </div>

      ))}

    </div>

  </div>

</section>
<br /><br />
 
 

 
      {/* APP DOWNLOAD CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="rounded-3xl bg- text-black p-8 md:p-12 grid md:grid-cols-2 items-center gap-8 overflow-hidden relative">
          <div className=" absolute -right-10 -top-20 size-full bg-gradient-brand rounded-full opacity-70 blur-3xl" />
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-extrabold leading-tight ">Get the SmartMart app.<br/>Faster. Smarter. Yours.</h3>
            <p className="text-background/70 mt-3 max-w-md">Exclusive app-only deals, AI try-ons, lightning checkout and 10-minute delivery — all in your pocket.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="bg-background text-foreground px-5 py-3 rounded-xl font-bold text-sm hover:opacity-90">App Store</button>
              <button className="bg-background text-foreground px-5 py-3 rounded-xl font-bold text-sm hover:opacity-90">Google Play</button>
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-4">

  {/* DELIVERY BOX */}
  <div className="relative rounded-2xl bg-gradient-berry p-5 aspect-square overflow-hidden flex flex-col justify-end shadow-pop">

    {/* DELIVERY BOY IMAGE */}
    <img
         src="https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1200&auto=format&fit=crop"
      alt="Delivery Boy"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-black/40"></div>

    {/* TEXT */}
    <div className="relative z-10 text-white">
      <div className="text-xs font-bold opacity-90">EXPRESS</div>
      <div className="text-2xl font-extrabold">10-min</div>
      <div className="text-sm opacity-90">delivery</div>
    </div>

  </div>

  {/* SAVE BOX */}
    <div className="relative rounded-2xl bg-gradient-lime text-[oklch(0.2_0.04_140)] p-5 aspect-square overflow-hidden flex flex-col justify-end shadow-pop translate-y-6">

  {/* BACKGROUND IMAGE */}
  <img
     src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=1400&auto=format&fit=crop"
    alt="Save Offer"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/25"></div>

  {/* TEXT */}
  <div className="relative z-10 text-white">
    <div className="text-xs font-bold opacity-90">SAVE</div>
    <div className="text-2xl font-extrabold">₹500</div>
    <div className="text-sm opacity-90">first order</div>
  </div>

</div>


          </div>
        </div>
      </section>

       
    </div>

       <Footer />
    
    </>
  );
}
export default Home;