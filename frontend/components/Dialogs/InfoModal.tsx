import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MenuItem, Addon } from "../../types/types";
import { formatCurrency } from "@/utils/format";

interface InfoModalProps {
  show: boolean;
  onHide: () => void;
  item: MenuItem | null;
  allAddons?: Addon[];
}

const InfoModal: React.FC<InfoModalProps> = ({
  show,
  onHide,
  item,
  allAddons,
}) => {
  if (!item) return null;

  // Filtra os addons disponíveis para este item
  const availableAddons =
    allAddons?.filter((addon) =>
      item.addons?.some((itemAddon: any) => itemAddon.id === addon.id)
    ) || [];

  return (
    <Dialog
      open={show}
      onOpenChange={(open) => {
        if (!open) onHide();
      }}
    >
      <DialogContent className="bg-amber-50 max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{item.categories.join(", ")}</DialogDescription>
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

          {/* Acompanhamentos disponíveis */}
          {availableAddons.length > 0 && (
            <div className="mt-3 border-t border-amber-200 pt-3">
              <h4 className="font-semibold text-amber-800 text-sm mb-2">
                Acompanhamentos Disponíveis:
              </h4>
              <div className="space-y-2">
                {availableAddons.map((addon) => (
                  <div
                    key={addon.id}
                    className="flex justify-between items-center bg-white rounded-lg p-2 border border-amber-100"
                  >
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-800">
                        {addon.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-amber-700 ml-2">
                      + {formatCurrency(addon.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

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
