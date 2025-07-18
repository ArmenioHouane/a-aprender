import { useCartStore } from "@/store/useCartStore"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2 } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function Cart() {
  const {items, removeItem, clearCart, getTotalQuantity } = useCartStore()

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative h-9 w-9 rounded-full">
          <ShoppingCart className="h-5 w-5  " />
          {getTotalQuantity() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {getTotalQuantity()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>You have {getTotalQuantity()} item(s) in your cart</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <Button variant="destructive" size="icon" onClick={() => removeItem(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-semibold">Total:</p>
              <p className="font-semibold">${totalPrice.toFixed(2)}</p>
            </div>
            <Button className="w-full" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
