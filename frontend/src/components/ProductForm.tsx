import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Product } from '../hooks/useProducts';

interface ProductFormProps {
    onSubmit: (data: Partial<Product>) => void;
    initialData?: Product | null;
    onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData = null, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        desc: '',
        image: '',
        category: 'clothes',
        size: [] as string[],
        color: [] as string[]
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                price: initialData.price?.toString() || '0',
                desc: initialData.desc || '',
                image: initialData.image || '',
                category: initialData.category?.toLowerCase() || 'clothes',
                size: Array.isArray(initialData.size) ? initialData.size.map(s => s.toLowerCase()) : [],
                color: Array.isArray(initialData.color) ? initialData.color.map(c => c.toLowerCase()) : []
            });
        }
    }, [initialData]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxToggle = (category: 'size' | 'color', value: string) => {
        setFormData(prev => {
            const current = (prev[category] as string[]) || [];
            const updated = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            return { ...prev, [category]: updated };
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            price: Number(formData.price) || 0
        });
    };

    const sizeOptions = ['s', 'm', 'l', 'xl', 'fixed size'];
    const colorOptions = ['white', 'purple', 'blue', 'black', 'red', 'green', 'yellow', 'grey'];

    return (
        <div className="max-w-2xl mx-auto my-8 bg-[#1e293b] border border-slate-700 shadow-2xl rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-500">
            <div className="py-8 border-b border-slate-800 bg-slate-800/30 text-center">
                <h2 className="text-3xl font-black text-white uppercase tracking-[0.3em]">
                    {initialData ? 'Update Asset' : 'Register Asset'}
                </h2>
                <p className="text-[10px] text-slate-500 mt-2 font-bold tracking-widest uppercase italic">Secure Fleet Entry Terminal</p>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8 text-slate-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Asset Designation *</label>
                        <input
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:border-[#00d2d3] focus:ring-1 focus:ring-[#00d2d3] outline-none transition-all placeholder:text-slate-600"
                            placeholder="Designation Name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Valuation (INR) *</label>
                        <input
                            required
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-[#00d2d3] font-black focus:border-[#00d2d3] outline-none"
                            placeholder="0"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">System Classification *</label>
                    <select
                        required
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:border-[#00d2d3] outline-none cursor-pointer appearance-none"
                    >
                        <option value="clothes">Clothes</option>
                        <option value="electronics">Electronics</option>
                        <option value="sports">Sports</option>
                        <option value="vehicle">Vehicle</option>
                        <option value="food">Food</option>
                    </select>
                </div>

                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 block">Component Dimensions:</label>
                    <div className="flex flex-wrap gap-4">
                        {sizeOptions.map(s => (
                            <label key={s} className="flex items-center gap-3 cursor-pointer group bg-slate-800/30 px-4 py-2 rounded-lg border border-slate-700/50 hover:border-[#00d2d3] transition-all">
                                <input
                                    type="checkbox"
                                    checked={formData.size.includes(s)}
                                    onChange={() => handleCheckboxToggle('size', s)}
                                    className="w-4 h-4 accent-[#00d2d3]"
                                />
                                <span className="text-xs uppercase font-bold text-slate-400 group-hover:text-white">{s}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 block">Interface Themes:</label>
                    <div className="flex flex-wrap gap-4">
                        {colorOptions.map(c => (
                            <label key={c} className="flex items-center gap-3 cursor-pointer group bg-slate-800/30 px-4 py-2 rounded-lg border border-slate-700/50 hover:border-[#00d2d3] transition-all">
                                <input
                                    type="checkbox"
                                    checked={formData.color.includes(c)}
                                    onChange={() => handleCheckboxToggle('color', c)}
                                    className="w-4 h-4 accent-[#00d2d3]"
                                />
                                <span className="text-xs capitalize font-bold text-slate-400 group-hover:text-white">{c}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Specification Log *</label>
                    <textarea
                        required
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 min-h-[120px] text-slate-200 focus:border-[#00d2d3] outline-none transition-all placeholder:text-slate-600 leading-relaxed"
                        placeholder="Technical description and specific telemetry data..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Media URI (Image Source URL)</label>
                    <input
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-slate-300 focus:border-[#00d2d3] outline-none placeholder:text-slate-600"
                        placeholder="https://cloud.storage/assets/nexus-v1.jpg"
                    />
                </div>

                <div className="pt-6 space-y-4">
                    <button
                        type="submit"
                        className="w-full bg-[#00d2d3] hover:bg-[#00b2b3] text-white font-black py-4 rounded-xl uppercase tracking-[0.4em] shadow-[0_10px_20px_rgba(0,210,211,0.3)] hover:shadow-[0_15px_30px_rgba(0,210,211,0.4)] active:scale-[0.98] transition-all duration-300"
                    >
                        {initialData ? 'COMMIT PROTOCOL' : 'DEPLOY TO FLEET'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] hover:text-red-400 transition-colors"
                    >
                        ABORT OPERATION
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
