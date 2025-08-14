import * as React from "react"

export interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

export function Select({ value, onValueChange, children }: SelectProps) {
  return (
    <select
      className="w-full px-3 py-2 border rounded-md bg-background text-base focus:outline-none focus:ring-2 focus:ring-ring"
      value={value}
      onChange={e => onValueChange(e.target.value)}
    >
      {children}
    </select>
  )
}

export function SelectTrigger({ children, ...props }: React.HTMLProps<HTMLSelectElement>) {
  return <>{children}</>
}

export function SelectValue({ placeholder }: { placeholder: string }) {
  return <option value="" disabled>{placeholder}</option>
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SelectItem({ value, children }: { value: string, children: React.ReactNode }) {
  return <option value={value}>{children}</option>
}
