import { CardHomeProps } from "@/interfaces/components/cardHome";

export default function CardHome({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
}: CardHomeProps) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="px-5 pb-5 p-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.product_name}
        </h5>
        <div className="flex items-center mt-2.5 mb-2 text-gray-700 dark:text-gray-300">
          Stock: {product.quantity}
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Rp {product.price.toLocaleString()}
          </span>
          <div className="flex items-center gap-3 flex-col md:flex-row">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  onQuantityChange(Math.max(0, (quantity || 0) - 1))
                }
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                disabled={!quantity}
              >
                -
              </button>
              <input
                className="border border-gray-300 rounded-md p-1 w-16 text-center"
                type="number"
                min={0}
                max={product.quantity}
                value={quantity || ""}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? 0 : parseInt(e.target.value);
                  if (
                    !isNaN(value) &&
                    value >= 0 &&
                    value <= product.quantity
                  ) {
                    onQuantityChange(value);
                  }
                }}
                placeholder="0"
              />
              <button
                onClick={() =>
                  onQuantityChange(
                    Math.min(product.quantity, (quantity || 0) + 1)
                  )
                }
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                disabled={quantity >= product.quantity}
              >
                +
              </button>
            </div>
            <button
              onClick={onAddToCart}
              disabled={!quantity || quantity > product.quantity}
              className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to cart
            </button>
          </div>
          {quantity > product.quantity && (
            <p className="text-red-500 text-sm">
              Quantity exceeds available stock
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
