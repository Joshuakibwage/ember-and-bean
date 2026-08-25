'use client';

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { createMenuItem, updateMenuItem, type MenuItemFormState } from "@/actions/menuAdmin";
import type { MenuItem } from "@/types/menu-item";

const CATEGORIES = ["coffee", "pastry", "cake"] as const;
const SERVED_AS = ["hot", "iced"] as const;
const DIETARY_TAGS = ["vegan", "gluten-free", "dairy-free", "nut-free"] as const;
const ALLERGENS = ["nuts", "dairy", "gluten", "soy", "eggs"] as const;

const initialState: MenuItemFormState = {};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: MenuItem;
};

const MenuItemFormDialog = ({ open, onOpenChange, item }: Props) => {
    const isEdit = !!item;
    const action = isEdit ? updateMenuItem.bind(null, item!.id) : createMenuItem;
    const [state, formAction] = useActionState(action, initialState);

    useEffect(() => {
        if (state.success) onOpenChange(false);
    }, [state.success, onOpenChange]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit item" : "New menu item"}</DialogTitle>
                    <DialogDescription>
                        {isEdit ? "Update the details for this item." : "Add a new item to the menu."}
                    </DialogDescription>
                </DialogHeader>

                <form action={formAction} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" defaultValue={item?.name} required />
                            {state.errors?.name && <p className="text-xs text-destructive">{state.errors.name}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" name="slug" defaultValue={item?.slug} required />
                            {state.errors?.slug && <p className="text-xs text-destructive">{state.errors.slug}</p>}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" defaultValue={item?.description} rows={2} required />
                        {state.errors?.description && (
                            <p className="text-xs text-destructive">{state.errors.description}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="price">Price (KSh)</Label>
                            <Input id="price" name="price" type="number" defaultValue={item?.price} required />
                            {state.errors?.price && <p className="text-xs text-destructive">{state.errors.price}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="compareAtPrice">Compare-at price</Label>
                            <Input id="compareAtPrice" name="compareAtPrice" type="number" defaultValue={item?.compareAtPrice} />
                            {state.errors?.compareAtPrice && (
                                <p className="text-xs text-destructive">{state.errors.compareAtPrice}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="category">Category</Label>
                        <select
                            id="category"
                            name="category"
                            defaultValue={item?.category}
                            required
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                        >
                            <option value="">Choose one</option>
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>
                                {c}
                                </option>
                            ))}
                        </select>
                        {state.errors?.category && <p className="text-xs text-destructive">{state.errors.category}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input id="imageUrl" name="imageUrl" defaultValue={item?.imageUrl} required />
                        {state.errors?.imageUrl && <p className="text-xs text-destructive">{state.errors.imageUrl}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="ingredients">Ingredients (comma-separated)</Label>
                        <Input id="ingredients" name="ingredients" defaultValue={item?.ingredients?.join(", ")} />
                    </div>

                    <CheckboxGroup label="Served as" name="servedAs" options={SERVED_AS} defaultValues={item?.servedAs} />
                    <CheckboxGroup label="Dietary tags" name="dietaryTags" options={DIETARY_TAGS} defaultValues={item?.dietaryTags} />
                    <CheckboxGroup label="Allergens" name="allergens" options={ALLERGENS} defaultValues={item?.allergens} />

                    <label className="flex items-center gap-2 text-sm text-foreground">
                        <input
                            type="checkbox"
                            name="available"
                            defaultChecked={item?.available ?? true}
                            className="h-4 w-4 rounded border-border"
                        />
                        Available on the menu
                    </label>

                    <SubmitButton isEdit={isEdit} />
                </form>
            </DialogContent>
        </Dialog>
    );
};

const CheckboxGroup = ({
    label,
    name,
    options,
    defaultValues = [],
}: {
    label: string;
    name: string;
    options: readonly string[];
    defaultValues?: string[];
}) => (
    <div className="space-y-1.5">
        <Label>{label}</Label>
        <div className="flex flex-wrap gap-3">
            {options.map((opt) => (
                <label key={opt} className="flex items-center gap-1.5 text-sm text-foreground">
                    <input
                        type="checkbox"
                        name={name}
                        value={opt}
                        defaultChecked={defaultValues.includes(opt)}
                        className="h-3.5 w-3.5 rounded border-border"
                    />
                    <span className="capitalize">{opt}</span>
                </label>
            ))}
        </div>
    </div>
);

const SubmitButton = ({ isEdit }: { isEdit: boolean }) => {

    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className="w-full gap-2 rounded-full">
            {pending ? <Loader2 className="animate-spin" size={16} /> : isEdit ? "Save changes" : "Create item"}
        </Button>
    );
};

export default MenuItemFormDialog;