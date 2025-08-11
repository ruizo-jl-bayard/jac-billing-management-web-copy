export default function DebugPage() {
  return (
    <div style={{ 
      backgroundColor: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <h1 style={{
        color: 'hsl(var(--primary))',
        fontSize: '2rem',
        marginBottom: '1rem'
      }}>
        CSS Variables Debug
      </h1>
      
      <div style={{
        backgroundColor: 'hsl(var(--card))',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid hsl(var(--border))',
        marginBottom: '1rem'
      }}>
        <p style={{ color: 'hsl(var(--card-foreground))' }}>
          This should have card background
        </p>
      </div>
      
      <div style={{
        backgroundColor: 'hsl(var(--muted))',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1rem'
      }}>
        <p style={{ color: 'hsl(var(--muted-foreground))' }}>
          This should have muted background
        </p>
      </div>
      
      <div style={{
        backgroundColor: 'hsl(var(--primary))',
        color: 'hsl(var(--primary-foreground))',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1rem'
      }}>
        Primary background
      </div>
      
      <div style={{
        backgroundColor: 'hsl(var(--secondary))',
        color: 'hsl(var(--secondary-foreground))',
        padding: '1rem',
        borderRadius: '8px'
      }}>
        Secondary background
      </div>
    </div>
  )
}
