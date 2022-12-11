const MyModal = ({ children, visible, setVisible }) => {
  const classes = `modal ${visible ? 'modal-active' : ''}`
  return (
    <div
      className={classes}
      onClick={(e) => {
        e.stopPropagation()
        setVisible()
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="modal__content"
      >
        {children}
      </div>
    </div>
  )
}

export default MyModal
