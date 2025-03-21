import classNames from "classnames"
import { Children } from "react"
import { TouchableOpacity } from "react-native"

interface Props {
  children: React.ReactNode
  action: () => void
  typeMode: "default" | "mode"
}

export default function ButtonSocialLogin({ children, action, typeMode }: Props) {
  return (
    <TouchableOpacity style={{ backgroundColor: typeMode == 'default' ? "#ffffff2b" : "#50677339" }}
      className={classNames("rounded-lg items-center px-3 py-2 w-20 self-center mt-5 mb-3", {
        " border-2 border-[#EEEEEE]": typeMode == "default"
      }, {
        "border-[#528A8C] border-2 ": typeMode == "mode"
      })}
      onPress={action}
    >
      {children}
    </TouchableOpacity>

  )
}