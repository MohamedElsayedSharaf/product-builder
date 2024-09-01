interface Iprops {
    msg: string
}
const ErroeMessage = ({msg}: Iprops) => {
  return msg ? <span className="block text-red-600 text-sm font-semibold">{msg}</span> : null
}

export default ErroeMessage
