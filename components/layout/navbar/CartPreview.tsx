// components/Navbar/CartPreview.tsx
'use client';
import { useCartStore } from '@/stores/cartStore';

export const CartPreview = () => {
    const items = useCartStore((s) => s.items);

    return (
        <div className="p-4 max-h-64 overflow-y-auto">
            {items.length === 0 ? (
                <p className="text-sm text-gray-500">Ton panier est vide.</p>
            ) : (
                <ul className="space-y-3">
                    {items.map((item) => (
                        <li key={item.id} className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.quantity} × {item.price}€</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
