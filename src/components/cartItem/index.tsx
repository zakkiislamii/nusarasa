import { type FC } from "react";
import { CartItemsProps } from "@/interfaces/cart";
import { useCartItemsUser } from "@/services/homepage/cartItems";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CartItems: FC<CartItemsProps> = ({ open, setOpen }) => {
  const {
    cartItems,
    isEditing,
    quantities,
    formatPrice,
    handleEditClick,
    handleQuantityChange,
    handleSubmitClick,
    handleCancelEdit,
    handleKeyPress,
    calculateSubtotal,
    handleRemoveItem,
    handleCheckOut,
  } = useCartItemsUser();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500">
                          Your cart is empty
                        </p>
                      ) : (
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cartItems.map((item) => (
                            <li key={item.id_cartItem} className="flex py-6">
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{item.product.product_name}</h3>
                                    <p className="ml-4">
                                      {formatPrice(item.product.price)}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {item.store.store_name}
                                  </p>
                                </div>

                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <p className="text-gray-500">Qty</p>
                                    {isEditing[item.id_cartItem] ? (
                                      <input
                                        type="text"
                                        pattern="\d*"
                                        value={
                                          quantities[item.id_cartItem] || ""
                                        }
                                        onChange={(e) =>
                                          handleQuantityChange(
                                            item.id_cartItem,
                                            e.target.value
                                          )
                                        }
                                        onKeyDown={(e) =>
                                          handleKeyPress(
                                            e,
                                            item.id_cartItem,
                                            item.quantity
                                          )
                                        }
                                        className="w-16 rounded border border-gray-300 px-2 py-1 text-center focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        placeholder={item.quantity.toString()}
                                        autoFocus
                                      />
                                    ) : (
                                      <span>{item.quantity}</span>
                                    )}
                                  </div>

                                  <div className="flex flex-col gap-3">
                                    {isEditing[item.id_cartItem] ? (
                                      <>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleSubmitClick(item.id_cartItem)
                                          }
                                          className="font-medium text-green-600 hover:text-green-500 disabled:opacity-50"
                                        >
                                          Submit
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleCancelEdit(
                                              item.id_cartItem,
                                              item.quantity
                                            )
                                          }
                                          className="font-medium text-gray-600 hover:text-gray-500 disabled:opacity-50"
                                        >
                                          Cancel
                                        </button>
                                      </>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => handleEditClick(item)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Update
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleRemoveItem(item.id_cartItem)
                                      }
                                      className="font-medium text-red-600 hover:text-red-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{formatPrice(calculateSubtotal())}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={handleCheckOut}
                      disabled={cartItems.length === 0}
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700 disabled:opacity-50"
                    >
                      Checkout
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CartItems;
