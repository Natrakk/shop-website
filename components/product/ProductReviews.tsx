type Props = {
    productId: string;
};

const mockReviews = [
    {
        name: "Jean Dupont",
        rating: 5,
        comment: "Super qualité, je recommande !",
    },
    {
        name: "Sophie M.",
        rating: 4,
        comment: "Tissu agréable et taille correcte.",
    },
];

export default function ProductReviews({ productId }: Props) {
    return (
        <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Avis clients</h2>
            {mockReviews.map((review, i) => (
                <div key={i} className="mb-6">
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-yellow-500 text-sm">
                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </p>
                    <p className="text-gray-600">{review.comment}</p>
                </div>
            ))}
        </div>
    );
}
