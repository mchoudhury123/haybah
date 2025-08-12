// Required for static export compatibility
export function generateStaticParams() {
  return [
    { tool: [] },
    { tool: ['desk'] },
    { tool: ['vision'] },
  ]
}

export default function StudioPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Sanity Studio</h1>
        <p className="text-gray-600 mb-4">
          Studio is not available in production build.
        </p>
        <p className="text-sm text-gray-500">
          Use development mode or access studio directly.
        </p>
      </div>
    </div>
  )
}

