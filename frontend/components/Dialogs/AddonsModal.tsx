import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MenuItem } from "../../types/types";
import { formatCurrency } from "@/utils/format";

interface AddonsModalProps {
    show: boolean;
    onHide: () => void;
    item: MenuItem | null;
}

