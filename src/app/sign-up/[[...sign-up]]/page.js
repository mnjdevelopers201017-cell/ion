import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          'linear-gradient(to bottom, #050816, #0A0F24, #140B2D)',
      }}
    >
      <SignUp
  fallbackRedirectUrl="/dashboard"
  signInUrl="/sign-in"
        appearance={{
          elements: {
            card: {
              backgroundColor: '#0f172a',
              border: '1px solid rgba(34,211,238,0.3)',
              boxShadow: '0 0 40px rgba(34,211,238,0.25)',
              borderRadius: '24px',
            },
            headerTitle: {
              color: 'white',
            },
            headerSubtitle: {
              color: '#94a3b8',
            },
            formButtonPrimary: {
              backgroundColor: '#22d3ee',
              color: 'black',
              fontWeight: 'bold',
              boxShadow: '0 0 20px rgba(34,211,238,0.8)',
            },
            footerActionLink: {
              color: '#22d3ee',
            },
            formFieldInput: {
              backgroundColor: '#111827',
              color: 'white',
              border: '1px solid rgba(34,211,238,0.2)',
            },
            formFieldLabel: {
              color: 'white',
            },
          },
        }}
      />
    </div>
  )
}
