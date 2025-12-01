import React from 'react';
import { Search, X } from 'lucide-react';

const StoreSearchBar = ({
    searchQuery,
    setSearchQuery,
    filteredStores,
    showDropdown,
    setShowDropdown,
    onStoreSelect,
    onClear
}) => {
    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 z-10" size={20} />
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                placeholder="Search for a store..."
                className="w-full bg-white/20 text-white pl-10 pr-10 py-3 rounded-lg border border-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-purple-300 relative z-10"
            />

            {onClear && (
                <button
                    onClick={onClear}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors z-20"
                >
                    <X size={20} />
                </button>
            )}

            {/* Dropdown - Frosted Glass Effect */}
            {showDropdown && filteredStores.length > 0 && (
                <div
                    className="absolute top-full left-0 right-0 mt-2 z-[100] rounded-lg max-h-60 overflow-hidden shadow-2xl"
                    style={{
                        background: 'rgba(30, 41, 59, 0.95)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '2px solid rgba(139, 92, 246, 0.3)'
                    }}
                >
                    <div className="overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
                        {filteredStores.map((store, index) => (
                            <button
                                key={store.store}
                                onClick={() => onStoreSelect(store)}
                                className={`w-full text-left px-4 py-3 hover:bg-white/10 active:bg-white/20 transition-all duration-200 ${index !== filteredStores.length - 1 ? 'border-b border-white/10' : ''
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-semibold">{store.store}</p>
                                        <p className="text-purple-300 text-sm">{store.group}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-bold">${(store.totalSales / 1000).toFixed(1)}K</p>
                                        <p className="text-emerald-400 text-sm">{store.wins}W-{store.losses}L</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreSearchBar;