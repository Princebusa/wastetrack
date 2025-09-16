import { forwardRef } from "react"

export const Button = forwardRef(
  ({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    const variants = {
      default: "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600",
      ghost: "hover:bg-gray-100 hover:text-gray-900",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-900",
    }

    const sizes = {
      sm: "h-9 px-3 text-sm",
      default: "h-10 px-4 py-2",
      lg: "h-11 px-8 text-base",
    }

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button
