import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MenuItem } from "@/types/types";
import { formatCurrency } from "@/utils/format";

interface InfoModalProps {
  show: boolean;
  onHide: () => void;
  item: MenuItem | null;
}

const InfoModal: React.FC<InfoModalProps> = ({ show, onHide, item }) => {
  if (!item) return null;
  return (
    <Dialog
      open={show}
      onOpenChange={(open) => {
        if (!open) onHide();
      }}
    >
      <DialogContent className="bg-amber-50 max-w-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {item.categories.join(", ")}
        </DialogDescription>
        <div className="flex flex-col gap-3">
          <img
            src={
              item.image ||
              "https://placehold.co/600x400/FFF8E1/cc7000?text=Le+Gourmet"
            }
            alt={item.name}
            className="w-full h-48 object-cover rounded"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://placehold.co/600x400/FFF8E1/cc7000?text=Le+Gourmet";
            }}
          />
          <div className="text-gray-700 text-sm mb-2">{item.description}</div>
          <div className="flex items-center gap-2">
            {item.onSale && item.salePrice ? (
              <>
                <span className="line-through text-gray-400 text-xs">
                  {formatCurrency(item.price)}
                </span>
                <span className="font-bold text-amber-700">
                  {formatCurrency(item.salePrice)}
                </span>
              </>
            ) : (
              <span className="font-bold text-amber-700">
                {formatCurrency(item.price)}
              </span>
            )}
          </div>
          {item.allergens && item.allergens.length > 0 && (
            <div className="mt-2">
              <span className="font-semibold text-xs text-amber-800">
                Alérgenos:{" "}
              </span>
              <span className="inline-block bg-amber-50 text-amber-800 text-xs px-1 rounded">
                {item.allergens.join(", ")}
              </span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
