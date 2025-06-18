import type { ProductSize, ProductColor } from "@/types/product";

type Props = {
    sizes: ProductSize[];
    colors: ProductColor[];
    selectedSize: ProductSize;
    setSelectedSize: (val: ProductSize) => void;
    selectedColor: ProductColor;
    setSelectedColor: (val: ProductColor) => void;
    quantity: number;
    setQuantity: (val: number) => void;
};


export default function ProductOptions({
    sizes,
    colors,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    quantity,
    setQuantity,
}: Props) {
    return (
        <div className="space-y-4 mb-6">
            {/* Taille */}
            <div>
                <p className="text-sm font-medium mb-1">Taille :</p>
                <div className="flex gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-3 py-1 rounded border ${selectedSize === size
                                ? "bg-yellow-500 text-white"
                                : "bg-white text-gray-700 border-gray-300"
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Couleur */}
            <div>
                <p className="text-sm font-medium mb-1">Couleur :</p>
                <div className="flex gap-2">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-3 py-1 rounded border ${selectedColor === color
                                ? "bg-yellow-500 text-white"
                                : "bg-white text-gray-700 border-gray-300"
                                }`}
                        >
                            {color}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quantité */}
            <div className="flex items-center gap-4">
                <label htmlFor="qty" className="text-sm font-medium">
                    Quantité :
                </label>
                <div className="flex items-center border rounded-md">
                    <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 text-xl"
                    >
                        -
                    </button>
                    <input
                        id="qty"
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-14 text-center outline-none"
                    />
                    <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1 text-xl"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}
