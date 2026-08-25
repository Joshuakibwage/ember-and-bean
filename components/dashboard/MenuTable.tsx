'use client';

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MenuItemFormDialog from "./MenuItemFormDialog";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { deleteMenuItem } from "@/actions/menuAdmin";
import type { MenuItem } from "@/types/menuItem";

const MenuTable = ({ items }: { items: MenuItem[] }) => {
    const [formOpen, setFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | undefined>(undefined);
    const [deleteTarget, setDeleteTarget] = useState<MenuItem | null>(null);

    const openCreate = () => {
        setEditingItem(undefined);
        setFormOpen(true);
    };

    const openEdit = (item: MenuItem) => {
        setEditingItem(item);
        setFormOpen(true);
    };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl text-foreground">Menu</h1>
        <Button onClick={openCreate} className="gap-2 rounded-full">
          <Plus size={16} />
          Add item
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wide">Item</th>
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wide">Category</th>
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wide">Price</th>
              <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-wide">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    </div>
                    <span className="text-card-foreground">{item.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 capitalize text-muted-foreground">{item.category}</td>
                <td className="px-5 py-3 font-mono text-card-foreground">KSh {item.price}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${
                      item.available ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.available ? "Available" : "Hidden"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => openEdit(item)}
                      aria-label={`Edit ${item.name}`}
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(item)}
                      aria-label={`Delete ${item.name}`}
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MenuItemFormDialog open={formOpen} onOpenChange={setFormOpen} item={editingItem} />

      {deleteTarget && (
        <DeleteConfirmDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          itemName={deleteTarget.name}
          onConfirm={() => deleteMenuItem(deleteTarget.id)}
        />
      )}
    </div>
  );
};

export default MenuTable;