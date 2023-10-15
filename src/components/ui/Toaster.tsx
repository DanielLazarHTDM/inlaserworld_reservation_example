import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./Toast"
import { useToast } from "./use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast className='toast-root' key={id} {...props}>
            <div className="gap-1">
              {title && <ToastTitle className='toast-title'>{title}</ToastTitle>}
              {description && (
                <ToastDescription className='toast-description'>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className='toast-close'/>
          </Toast>
        )
      })}
      <ToastViewport className='toast-viewport' />
    </ToastProvider>
  )
}