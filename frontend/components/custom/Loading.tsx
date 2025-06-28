'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-background">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  )
}

export default Loading
