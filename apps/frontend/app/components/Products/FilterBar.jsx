"use client";
import React from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
export default function FilterBar({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  selectedCategory,
  setSelectedCategory,
  categories = [],
}) {
  return (
    <div className="sticky top-20 z-30 glass border-b border-[var(--border-glass)] py-4 px-4 sm:px-6 lg:px-8 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search
              size={18}
              className="text-gray-400 group-focus-within:text-[var(--primary)] transition-colors"
            />
          </div>
          <input
            type="text"
            placeholder="Search for candles, scents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 border border-[var(--border)] rounded-full leading-5 bg-[var(--surface-alt)] text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:bg-[var(--surface)] focus:ring-2 focus:ring-[var(--primary-light)] focus:border-[var(--primary)] transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <div className="flex items-center gap-2 pr-4 border-r border-[var(--border)]">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-[var(--foreground)] text-[var(--background)] shadow-md"
                  : "bg-[var(--surface)] text-gray-600 dark:text-gray-300 hover:bg-[var(--surface-alt)] border border-[var(--border)] hover:border-[var(--primary-light)]"
              }`}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[var(--foreground)] text-[var(--background)] shadow-md"
                    : "bg-[var(--surface)] text-gray-600 dark:text-gray-300 hover:bg-[var(--surface-alt)] border border-[var(--border)] hover:border-[var(--primary-light)]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="relative min-w-[180px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ArrowUpDown size={16} className="text-gray-400" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full pl-10 pr-8 py-3 text-sm border border-[var(--border)] rounded-full bg-[var(--surface)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:border-[var(--primary)] cursor-pointer hover:bg-[var(--surface-alt)] transition-all shadow-sm appearance-none"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
