type ErrorMsgProps = {
    children: React.ReactNode
}

export default function ErrorMsg({ children }: ErrorMsgProps) {
  return (
    <div>{children}</div>
  )
}
