"use client";

import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";


//eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuctionButton = ({ row } : any) => {
  const router = useRouter();

  const handleEditTiles = (id : number) => {
    router.push(`/admin-dashboard/edit-new-tile/${id}`);
  };

  return (
    <div>
      <div className="w-full flex justify-center items-center gap-[10px]">
        <button>
          <Eye className="w-5 h-5 cursor-pointer" />
        </button>
        <button onClick={() => handleEditTiles(row?.original?.id)}>
          <FiEdit className="w-5 h-5 cursor-pointer" />
        </button>
        <button>
          <Trash2 className="w-5 h-5 hover:text-primary cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default AuctionButton;
