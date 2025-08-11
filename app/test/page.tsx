import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-primary">CSS Variables Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="bg-muted">
              <CardTitle className="text-card-foreground">Background Test</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-muted-foreground">This should have proper background colors</p>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="text-secondary-foreground">Secondary Card</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Button className="bg-primary text-primary-foreground">Primary Button</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-accent p-4 rounded border border-border">
          <p className="text-accent-foreground">This should be accent colored</p>
        </div>
        
        <div className="space-y-2">
          <div className="h-8 bg-primary rounded"></div>
          <div className="h-8 bg-secondary rounded"></div>
          <div className="h-8 bg-muted rounded"></div>
          <div className="h-8 bg-accent rounded"></div>
        </div>
      </div>
    </div>
  )
}
