'use client'
import { useState } from "react";
import ToastContext from "./ToastService";
import { X } from "react-feather";

export default function ToastProvider({ children }:any) {
  const [toasts, setToasts] = useState<{ id: any; component: any; }[]>([]);

  const open = (component:any, timeout = 5000) => {
    const id = Date.now();
    setToasts(toasts => [...toasts, { id, component }]);
    setTimeout(() => close(id), timeout);
    return id
  }

  const close = (id:any) => {
    setToasts(toasts => toasts.filter(toast => toast.id !== id));
  }


  return (
    <ToastContext.Provider value={{open ,close}}>
        {children}
        <div className="space-y-2 absolute bottom-4 right-4 z-[10]">
          {toasts.map(({id, component}) => (
            <div key={id} className="relative">
              <button onClick={() => close(id)} className="absolute top-2 right-2 bg-transparent rounded-[5px] text-white cursor-pointer pt-[0.2rem]">
                <X size={16}/>
              </button>
              {component}
            </div>
          ))}
        </div>
    </ToastContext.Provider>
  );
}