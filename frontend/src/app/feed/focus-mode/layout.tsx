import React from 'react'


export const metadata = {
  title: "Focus Mode | News.AI",
  description: "Browse the latest curated news feed from My News App.",
};


const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>{children}</div>
  )
}

export default layout