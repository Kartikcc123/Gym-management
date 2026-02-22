import React, { useState, useMemo, useCallback } from "react";
import { Search, Clock, ChevronRight, Plus } from "lucide-react";

const CATEGORIES = ["All", "Workout", "Nutrition", "Recovery", "Lifestyle"];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Mastering the Deadlift: 3 Form Tips to Save Your Back",
    category: "Workout",
    readTime: 6,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    excerpt:
      "The deadlift is the king of exercises, but only if done right."
  },
  {
    id: 2,
    title: "Pre-Workout vs Coffee: Which Gives a Better Pump?",
    category: "Nutrition",
    readTime: 4,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    excerpt:
      "We break down the science of caffeine and beta-alanine."
  }
];

const BlogView = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔥 Derived state (Never store filtered list in state)
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;

      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat);
  }, []);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black italic uppercase text-white">
            Fitness <span className="text-red-600">Blog</span>
          </h2>
          <p className="text-zinc-500 text-sm">
            Insights and tips from IronForge elite trainers
          </p>
        </div>

        {/* Search */}
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-2.5 text-zinc-500"
              size={18}
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="bg-zinc-900 border border-zinc-800 text-sm text-white rounded-xl pl-10 pr-4 py-2 w-full md:w-64 focus:border-red-600 outline-none"
            />
          </div>

          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-xl">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
              activeCategory === cat
                ? "bg-red-600 border-red-600 text-white"
                : "border-zinc-800 text-zinc-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 text-zinc-500">
          No articles found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-red-600/50 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase">
                  {post.category}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase font-bold">
                  <Clock size={12} /> {post.readTime} min Read
                </div>

                <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 italic uppercase">
                  {post.title}
                </h3>

                <p className="text-zinc-500 text-sm line-clamp-2">
                  {post.excerpt}
                </p>

                <button className="flex items-center gap-1 text-red-500 text-xs font-black uppercase tracking-widest pt-2 group-hover:gap-2 transition-all">
                  Read Full Story <ChevronRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogView;
