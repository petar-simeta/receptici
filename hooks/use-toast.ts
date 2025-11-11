// hooks/use-toast.ts

type ToastOptions = {
  title?: string;
  description?: string;
};

export function useToast() {
  function toast(options: ToastOptions) {
    const message = options?.description ?? options?.title ?? "Done";

    if (typeof window !== "undefined") {
      try {
        window.alert(message);
      } catch {
        console.log("Toast:", message);
      }
    } else {
      console.log("Toast:", message);
    }
  }

  return { toast };
}
