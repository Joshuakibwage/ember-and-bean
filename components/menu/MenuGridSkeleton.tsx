import MenuCardSkeleton from "@/components/menu/MenuCardSkeleton";


type MenuGridSkeletonProps = {
  count?: number;
  columnsClassName?: string;
};


import React from 'react'

const MenuGridSkeleton = ({
    count = 6,
    columnsClassName = "sm:grid-cols-2 lg:grid-cols-3",
}: MenuGridSkeletonProps ) => {
  return (
    <div
        role="status"
        aria-label="loading menu items"
        className={`grid grid-cols-1 gap-6 ${columnsClassName}`}
    >
      {
        Array.from({ length: count }).map((_, i) => (
            <MenuCardSkeleton key={i} />
        ))
      }
    </div>
  )
}

export default MenuGridSkeleton
