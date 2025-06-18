// app/checkout/success/page.tsx
export default function CheckoutSuccessPage() {
    return (
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">Paiement réussi !</h1>
            <p className="text-gray-700">ESHOP-Website vous remerci pour votre commande. </p>
            <p className="text-gray-700">Vous allez reçevoir un email de confirmation. </p>
        </div>
    );
}
