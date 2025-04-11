"use client"

import { useState, useEffect } from "react"

export function DynamicContent() {
  const [content, setContent] = useState<React.ReactNode>(null)
  
  useEffect(() => {
    // Only run on the client
    setContent(<div className="light" style={{colorScheme: "light"}}>
      {/* Your dynamic content here */}
    </div>)
  }, [])
  
  return content
}