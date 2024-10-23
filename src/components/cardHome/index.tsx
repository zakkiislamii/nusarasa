import { CardHomeProps } from "@/interfaces/components/cardHome";

export default function CardHome({
  product,
  onQuantityChange,
  onAddToCart,
}: CardHomeProps) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="px-5 pb-5 p-5 ">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.product_name}
        </h5>
        <div className="flex items-center mt-2.5 mb-5 text-white">
          {product.quantity}
        </div>
        <div className="flex flex-col gap-10">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Rp {product.price.toLocaleString()}
          </span>
          <div className="flex items-center gap-5 flex-col md:flex-row">
            <input
              className="border border-gray-300 rounded-md p-1 w-20"
              type="number"
              min={0}
              onChange={(e) => onQuantityChange?.(parseInt(e.target.value))}
              placeholder="Jumlah"
            />
            <button
              onClick={onAddToCart}
              className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
