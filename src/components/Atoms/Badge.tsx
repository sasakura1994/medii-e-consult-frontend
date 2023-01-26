import React from 'react'

type PropsType = {
  text: string
  styles?: string
}

export const Badge: React.FC<PropsType> = (props) => {
  const { text, styles } = props

  return <span className={styles}>{text}</span>
}
