// You're trying to export useToast twice in this file
// Let's fix it by keeping only one export
import { useToast as useToastOriginal } from "@/components/ui/toast";

// Re-export for compatibility
export { useToast } from "@/components/ui/toast";

// Remove this line since it's a duplicate export
// export const useToast = useToastOriginal;

