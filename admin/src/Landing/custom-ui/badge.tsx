export const Badge = ({ className = "", variant = "default", children, ...props }) => {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"

  const variants = {
    default: "bg-green-100 text-green-800",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-700",
  }

  const classes = `${baseStyles} ${variants[variant]} ${className}`

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Badge
