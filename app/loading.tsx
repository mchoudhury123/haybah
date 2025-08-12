export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream to-brand-peach flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-brand-maroon border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-playfair text-brand-maroon">Loading Habyah Collections...</h2>
        <p className="text-gray-600 mt-2">Please wait while we prepare your experience</p>
      </div>
    </div>
  )
}
