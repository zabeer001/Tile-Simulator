import React from 'react'
import { LoginForm } from './_components/login'

function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <LoginForm />
    </main>
  )
}

export default page