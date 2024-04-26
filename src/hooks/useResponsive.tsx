import React, { createContext, ReactNode, useContext } from 'react'
import useWindowSize from './useWindowSize'

const getMobileDetect = (
  userAgent: NavigatorID['userAgent'],
  innerWidth: number
): {
  isIpad: boolean
  isDesktop: boolean
  isSSR: boolean
  isMobile: boolean
  isAndroid: boolean
  isIos: boolean
  isTablet: boolean
} => {
  const isAndroid = () => Boolean(userAgent.match(/Android/i))
  const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i))
  const isSSR = () => Boolean(userAgent.match(/SSR/i))
  const isTablet = () => Boolean(innerWidth > 768 && innerWidth <= 1024)
  const isMobile = () => Boolean(innerWidth <= 768)
  const isDesktop = () => Boolean(!isMobile() && !isTablet() && !isSSR())
  return {
    isIpad: false,
    isMobile: isMobile(),
    isDesktop: isDesktop(),
    isAndroid: isAndroid(),
    isIos: isIos(),
    isSSR: isSSR(),
    isTablet: isTablet(),
  }
}

type ResponsiveProviderProps = {
  userAgent: string
  children: ReactNode
}

const ResponsiveContext = createContext({
  isTablet: false,
  isMobile: false,
  isDesktop: false,
  isAndroid: false,
  isIos: false,
  isSSR: false,
})

export function ResponsiveProvider({
  userAgent,
  children,
}: ResponsiveProviderProps) {
  const [width] = useWindowSize()
  let value = {
    isTablet: false,
    isMobile: false,
    isDesktop: false,
    isAndroid: false,
    isIos: false,
    isSSR: false,
  }
  if (userAgent && width) {
    value = getMobileDetect(userAgent, width)
  }

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  )
}

export const useResponsive = () => {
  return useContext(ResponsiveContext)
}
