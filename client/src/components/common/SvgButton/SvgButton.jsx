import { Button } from '@mui/material'
import { Children, cloneElement } from 'react'
const SvgButton = ({ children, onClick, type, disabled, ...props }) => {
  const childrenWithProps = Children.map(children, (child) =>
    cloneElement(child, { ...child.props, ...props })
  )
  return (
    <Button type={type} disabled={disabled} onClick={onClick}>
      {childrenWithProps}
    </Button>
  )
}

export default SvgButton
