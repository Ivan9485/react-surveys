import { useStateContext } from "../contexts/ContextProvider"

export default function Toast() {
  const {toast} = useStateContext();
  return (
    <>
    {
    toast.show && (<div className="py-2 px-3 text-white rounded bg-emerald-500 fixed left-2 bottom-4 z-5 animate-fade-in-down">
      {toast.message}
    </div>
    )}
    </>
  )
}