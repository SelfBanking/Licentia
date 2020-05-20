export default function ShortPublicKey ({ address }) {
  const first = address.substring(0, 5)
  const last = address.substr(address.length - 5)
  return first + ' ... ' + last
}
