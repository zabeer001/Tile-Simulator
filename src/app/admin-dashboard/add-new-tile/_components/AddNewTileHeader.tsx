"use client";
import { RiArrowRightSLine } from "react-icons/ri";
import Link from "next/link";
import { Save } from "lucide-react";

const AddNewTileHeader = () => {
  return (
    <div>
      <div className="flex items-center justify-between pb-[20px]">
        <div>
          <h2 className="text-2xl font-semibold leading-[120%] text-black">
            Add New Tile
          </h2>
          <div className="flex items-center gap-2 pt-2">
            <Link
              href="/admin-dashboard"
              className="text-base font-medium leading-[120%] text-secondary-200"
            >
              Dashboard
            </Link>
            <span className="text-secondary-200 w-[18px] h-[18px]">
              {" "}
              <RiArrowRightSLine />{" "}
            </span>
            <Link
              href="/admin-dashboard"
              className="text-base font-medium leading-[120%] text-secondary-300"
            >
              All Tiles
            </Link>
            <span className="text-secondary-200 w-[18px] h-[18px]">
              {" "}
              <RiArrowRightSLine />{" "}
            </span>
            <Link
              href="/admin-dashboard/add-new-tile"
              className="text-base font-medium leading-[120%] text-secondary-300"
            >
              Add Tile
            </Link>
          </div>
        </div>
        <div>
          <Link href="/admin-dashboard/add-new-tile"><button className="flex items-center gap-2 text-white bg-primary py-4 px-8 text-base font-medium leading-[120%] rounded-[8px]">
            {" "}
            <Save /> Save tile
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default AddNewTileHeader;
