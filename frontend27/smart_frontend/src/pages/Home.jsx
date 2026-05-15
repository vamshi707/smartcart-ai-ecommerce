 
import {
  Search, ShoppingCart, MapPin, ChevronRight, Heart, Star,
  Truck, ShieldCheck, Sparkles, Tag, Clock, Headphones,
  Smartphone, Shirt, Sofa, Apple, Gem, Gamepad2, Baby, BookOpen,
  Zap, Camera, TrendingUp, Award, Menu,
} from "lucide-react";

 

const categories = [
  { name: "Groceries", icon: Apple, gradient: "bg-gradient-lime", tag: "10 min" },
  { name: "Fashion", icon: Shirt, gradient: "bg-gradient-berry", tag: "Trending" },
  { name: "Electronics", icon: Smartphone, gradient: "bg-gradient-mint", tag: "New" },
  { name: "Furniture", icon: Sofa, gradient: "bg-gradient-sun", tag: "Sale" },
  { name: "Beauty", icon: Gem, gradient: "bg-gradient-berry", tag: "AI Match" },
  { name: "Toys & Baby", icon: Baby, gradient: "bg-gradient-mint", tag: "Hot" },
  { name: "Books", icon: BookOpen, gradient: "bg-gradient-sun", tag: "Picks" },
  { name: "Gaming", icon: Gamepad2, gradient: "bg-gradient-lime", tag: "Pro" },
];

const banners = [
  {
    title: "Groceries in 10 minutes",
    subtitle: "Fresh, fast, every day",
    cta: "Order now",
    className: "bg-gradient-lime text-[oklch(0.2_0.04_140)]",
    badge: "Express",
    icon: Apple,
  },
  {
    title: "Mega Fashion Edit",
    subtitle: "Up to 70% off — new drops daily",
    cta: "Shop the look",
    className: "bg-gradient-berry text-[oklch(0.2_0.04_140)]",
    badge: "70% OFF",
    icon: Shirt,
  },
  {
    title: "Smart Electronics",
    subtitle: "Mobiles, laptops & gadgets",
    cta: "Explore",
    className: "bg-gradient-mint text-[oklch(0.18_0.04_220)]",
    badge: "Lowest Prices",
    icon: Smartphone,
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
  { title: "Top Mobiles", subtitle: "Up to 40% off", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop" },
  { title: "Home Decor", subtitle: "Starting ₹199", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop" },
  { title: "Beauty Picks", subtitle: "AI skin match", img: "https://images.unsplash.com/photo-1522335789203-aaa3a25b8b4f?q=80&w=600&auto=format&fit=crop" },
  { title: "Men's Fashion", subtitle: "From ₹299", img: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=600&auto=format&fit=crop" },
  { title: "Kids & Toys", subtitle: "Min 30% off", img: "https://images.unsplash.com/photo-1558877385-8c1f8d24a839?q=80&w=600&auto=format&fit=crop" },
];

function Home() {
  return (
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
        <div className="grid md:grid-cols-3 gap-4">
          {banners.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className={`relative overflow-hidden rounded-3xl p-6 min-h-[200px] flex flex-col justify-between shadow-card hover:shadow-pop transition ${b.className}`}>
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

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Shop by category</h2>
            <p className="text-muted-foreground mt-1">Everything you need, all in one place.</p>
          </div>
          <a className="text-sm font-semibold text-primary hidden md:flex items-center gap-1 cursor-pointer">View all <ChevronRight className="size-4" /></a>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <button key={c.name} className="group relative bg-card rounded-2xl p-4 shadow-card hover:shadow-pop hover:-translate-y-1 transition text-center">
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
              Find your perfect shade with <span className="text-accent">AI Face Detect</span>
            </h3>
            <p className="mt-3 opacity-90 max-w-md">
              Snap a selfie and SmartMart's AI detects your skin tone, undertone & face shape — then matches foundation, lipstick, sunglasses and outfits made for you.
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
          <div className="relative min-h-[260px]">
            <img
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"  
              alt="AI Beauty"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary/40" />
          </div>
        </div>
      </section>

      {/* DEAL TILES */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold flex items-center gap-2">
              <TrendingUp className="size-7 text-primary" /> Top deals today
            </h2>
            <p className="text-muted-foreground mt-1">Hand-picked offers across every category.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {deals.map((d) => (
            <div key={d.title} className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-pop transition cursor-pointer">
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
                <button className="mt-3 w-full bg-primary text-primary-foreground hover:bg-primary-glow rounded-xl py-2 text-sm font-bold transition">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY SMARTMART */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="rounded-3xl bg-card border border-border p-8 md:p-12 shadow-card">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Why SmartMart</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">One app. Every category. Smarter shopping.</h2>
            <p className="text-muted-foreground mt-3">From morning groceries to your next iPhone — SmartMart brings India's best brands, prices and delivery into one beautiful experience.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4 mt-10">
            {[
              { icon: Clock, title: "10-min express", desc: "Groceries & essentials at your door fast." },
              { icon: ShieldCheck, title: "100% authentic", desc: "Brand-direct, quality-checked products." },
              { icon: Sparkles, title: "AI for you", desc: "Face match, skin tone & smart picks." },
              { icon: Headphones, title: "24×7 support", desc: "Real humans, fast resolutions." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-secondary/50 p-5 hover:bg-secondary transition">
                <div className="size-11 rounded-xl bg-gradient-brand grid place-items-center text-white shadow-soft">
                  <Icon className="size-5" />
                </div>
                <h4 className="mt-4 font-bold">{title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP DOWNLOAD CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="rounded-3xl bg-foreground text-background p-8 md:p-12 grid md:grid-cols-2 items-center gap-8 overflow-hidden relative">
          <div className="absolute -right-20 -top-20 size-72 bg-gradient-brand rounded-full opacity-40 blur-3xl" />
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">Get the SmartMart app.<br/>Faster. Smarter. Yours.</h3>
            <p className="text-background/70 mt-3 max-w-md">Exclusive app-only deals, AI try-ons, lightning checkout and 10-minute delivery — all in your pocket.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="bg-background text-foreground px-5 py-3 rounded-xl font-bold text-sm hover:opacity-90">App Store</button>
              <button className="bg-background text-foreground px-5 py-3 rounded-xl font-bold text-sm hover:opacity-90">Google Play</button>
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-gradient-berry p-5 aspect-square flex flex-col justify-end shadow-pop">
              <div className="text-xs font-bold opacity-90">EXPRESS</div>
              <div className="text-2xl font-extrabold">10-min</div>
              <div className="text-sm opacity-90">delivery</div>
            </div>
            <div className="rounded-2xl bg-gradient-lime text-[oklch(0.2_0.04_140)] p-5 aspect-square flex flex-col justify-end shadow-pop translate-y-6">
              <div className="text-xs font-bold opacity-90">SAVE</div>
              <div className="text-2xl font-extrabold">₹500</div>
              <div className="text-sm opacity-90">first order</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background/80 mt-4">
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="size-9 rounded-xl bg-gradient-brand grid place-items-center text-white font-black">S</div>
              <div className="font-display font-extrabold text-xl text-background">SmartMart</div>
            </div>
            <p className="mt-4 text-sm max-w-sm">India's smartest all-in-one shopping platform — groceries, fashion, electronics, beauty and more, powered by AI.</p>
          </div>
          {[
            { h: "Shop", links: ["Grocery", "Fashion", "Electronics", "Beauty", "Furniture"] },
            { h: "Company", links: ["About", "Careers", "Press", "Blog", "Sustainability"] },
            { h: "Help", links: ["Contact", "Returns", "Shipping", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.h}>
              <div className="font-bold text-background mb-3">{col.h}</div>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => <li key={l} className="hover:text-background cursor-pointer">{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-5 text-xs flex flex-col md:flex-row items-center justify-between gap-2">
            <span>© 2026 SmartMart Technologies Pvt Ltd. All rights reserved.</span>
            <span>Made with ♥ in India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Home;