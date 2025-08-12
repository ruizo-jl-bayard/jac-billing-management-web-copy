"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProvider as AmplifyThemeProvider, Theme } from "@aws-amplify/ui-react"

function getCSSVariable(variable: string): string {
  if (typeof window !== 'undefined') {
    return `hsl(${getComputedStyle(document.documentElement).getPropertyValue(variable).trim()})`
  }
  return '#0ea5e9'
}

const createJacAmplifyTheme = (): Theme => ({
  name: 'JAC Theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: getCSSVariable('--muted'),
          20: getCSSVariable('--accent'),
          40: getCSSVariable('--primary'),
          60: getCSSVariable('--primary'),
          80: getCSSVariable('--primary'),
          90: getCSSVariable('--primary'),
          100: getCSSVariable('--primary'),
        }
      },
      background: {
        primary: getCSSVariable('--background'),
        secondary: getCSSVariable('--muted'),
      },
      font: {
        primary: getCSSVariable('--foreground'),
        secondary: getCSSVariable('--muted-foreground'),
      },
      border: {
        primary: getCSSVariable('--border'),
      }
    },
    components: {
      authenticator: {
        router: {
          borderWidth: '0',
          backgroundColor: getCSSVariable('--card'),
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
        form: {
          padding: '2rem',
        },
      },
      button: {
        primary: {
          backgroundColor: getCSSVariable('--primary'),
          borderColor: getCSSVariable('--primary'),
          color: getCSSVariable('--primary-foreground'),
          _hover: {
            backgroundColor: getCSSVariable('--primary'),
            borderColor: getCSSVariable('--primary'),
          },
          _focus: {
            boxShadow: `0 0 0 2px hsl(${getCSSVariable('--ring')})`,
          }
        },
        link: {
          color: getCSSVariable('--primary'),
          _hover: {
            color: getCSSVariable('--primary'),
          }
        }
      },
      fieldcontrol: {
        borderColor: getCSSVariable('--border'),
        color: getCSSVariable('--foreground'),
        paddingInlineStart: '0.75rem',
        paddingInlineEnd: '0.75rem',
        paddingBlockStart: '0.75rem',
        paddingBlockEnd: '0.75rem',
        _focus: {
          borderColor: getCSSVariable('--ring'),
          boxShadow: `0 0 0 2px hsl(${getCSSVariable('--ring')} / 0.2)`,
        },
        _error: {
          borderColor: getCSSVariable('--destructive'),
          color: getCSSVariable('--destructive'),
        }
      },
      tabs: {
        item: {
          color: getCSSVariable('--muted-foreground'),
          _active: {
            borderColor: getCSSVariable('--primary'),
            color: getCSSVariable('--primary'),
          }
        }
      },
      text: {
        color: getCSSVariable('--foreground'),
      },
      heading: {
        color: getCSSVariable('--foreground'),
      }
    }
  }
})

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [amplifyTheme, setAmplifyTheme] = React.useState<Theme | null>(null)

  React.useEffect(() => {
    setAmplifyTheme(createJacAmplifyTheme())
    
    const observer = new MutationObserver(() => {
      setAmplifyTheme(createJacAmplifyTheme())
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    })

    return () => observer.disconnect()
  }, [])

  return (
    <NextThemesProvider {...props}>
      {amplifyTheme && (
        <AmplifyThemeProvider theme={amplifyTheme}>
          {children}
        </AmplifyThemeProvider>
      )}
      {!amplifyTheme && children}
    </NextThemesProvider>
  )
}
