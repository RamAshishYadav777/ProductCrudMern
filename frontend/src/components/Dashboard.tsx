import React, { useState } from 'react';
import Notification from './Notification';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';
import Sidebar from './Sidebar';
import ProductDetail from './ProductDetail';
import { useProducts, Product } from '../hooks/useProducts';

type ViewMode = 'list' | 'add' | 'edit' | 'detail';

const Dashboard: React.FC = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const {
        products,
        loading,
        notification,
        filters,
        setFilters,
        handleFormSubmit,
        deleteProduct
    } = useProducts();

    const onEdit = (p: Product) => {
        setSelectedProduct(p);
        setViewMode('edit');
    };

    const onView = (p: Product) => {
        setSelectedProduct(p);
        setViewMode('detail');
    };

    const onSubmit = (payload: Partial<Product>) => {
        handleFormSubmit(payload, viewMode === 'edit' ? selectedProduct : null, () => {
            setViewMode('list');
            setSelectedProduct(null);
        });
    };

    const resetToHome = () => {
        setViewMode('list');
        setSelectedProduct(null);
    };

    const availableCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

    return (
        <div className="min-h-screen bg-[#0f172a] font-sans">
            <Notification notification={notification} />
            <Navbar />

            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-screen">
                {/* Sidebar - Visible on list view */}
                {viewMode === 'list' && (
                    <Sidebar filters={filters} setFilters={setFilters} availableCategories={availableCategories} />
                )}

                <main className="flex-1 p-8 bg-[#0f172a]">
                    {viewMode === 'list' ? (
                        <div className="space-y-8">
                            {/* Toolbar */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#1e293b] p-6 border border-slate-800 shadow-xl rounded-xl">
                                <button
                                    onClick={() => setViewMode('add')}
                                    className="bg-[#00d2d3] hover:bg-[#008b8b] text-white px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all shadow-lg active:scale-95 w-full md:w-auto"
                                >
                                    + ADD ASSET
                                </button>

                                <div className="relative w-full md:w-96">
                                    <input
                                        type="text"
                                        placeholder="Search products here..."
                                        value={filters.search}
                                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 pl-10 text-slate-100 focus:border-[#00d2d3] focus:ring-1 focus:ring-[#00d2d3] outline-none transition-all placeholder:text-slate-500"
                                    />
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <div className="w-4 h-4 border-2 border-[#00d2d3] border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Grid */}
                            {loading && products.length === 0 ? (
                                <div className="text-center py-40">
                                    <div className="w-12 h-12 border-4 border-[#008b8b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Fetching Records...</p>
                                </div>
                            ) : products.length === 0 ? (
                                <div className="text-center py-40 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/50">
                                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Target Asset Not Found</p>
                                    <button
                                        onClick={() => setFilters({ search: '', size: [], color: [], category: [], minPrice: 0, maxPrice: 700000 })}
                                        className="mt-4 text-[#00d2d3] font-bold text-xs underline uppercase tracking-tighter hover:text-white transition-colors"
                                    >
                                        CLEAR FIELD ANALYTICS
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {products.map((p) => (
                                        <ProductCard
                                            key={p._id}
                                            product={p}
                                            onEdit={onEdit}
                                            onDelete={deleteProduct}
                                            onView={onView}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : viewMode === 'detail' && selectedProduct ? (
                        <ProductDetail product={selectedProduct} onBack={resetToHome} />
                    ) : (
                        <ProductForm
                            onSubmit={onSubmit}
                            initialData={selectedProduct}
                            onCancel={resetToHome}
                        />
                    )}
                </main>
            </div>

            <footer className="bg-slate-950 border-t border-white/5 py-12 px-10">
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-[#00d2d3] rounded-md rotate-45 flex items-center justify-center">
                            <div className="w-2 h-2 bg-[#00d2d3] rounded-full"></div>
                        </div>
                        <span className="text-white font-black uppercase tracking-tighter text-lg">Admin <span className="text-[#00d2d3]">Pro</span></span>
                    </div>

                    <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                        <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Security</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
                    </div>

                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-600">
                        &copy; 2026 Admin Pro
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
