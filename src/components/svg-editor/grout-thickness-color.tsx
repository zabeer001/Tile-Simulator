import React, { useState } from 'react'
import { Button } from '../ui/button'

interface Props {
    groutThickness : string;
    setGroutThickness : (groutThickness : string) => void
  }

function GroutThicknessColor({groutThickness,
    setGroutThickness,}: Props) {

    const [groutColor, setGroutColor] = useState<"orange" | "gray" | "black" | "blue">("orange")
    // const [groutThickness, setGroutThickness] = useState<"none" | "thin" | "thick">("thin")


    const colorBorderMap: Record<string, string> = {
        orange: "border-orange-300",
        gray: "border-gray-500",
        black: "border-black",
        blue: "border-blue-500",
    };
    return (
        <div>
            <div className="flex justify-between ">


                <div className='space-y-4'>
                    <h3 className="text-sm font-medium">Grout Thickness:</h3>
                    <div className="flex gap-2">
                        {["none", "thin", "thick"].map((thickness) => (
                            <Button
                                key={thickness}
                                variant={groutThickness === thickness ? "default" : "outline"}
                                onClick={() => setGroutThickness(thickness as "none" | "thin" | "thick")}
                            >
                                {thickness.charAt(0).toUpperCase() + thickness.slice(1)}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className='space-y-4'>
                    <h3 className="text-sm font-medium">Grout Color:</h3>
                    <div className="flex gap-2">
                        {["orange", "gray", "black", "blue"].map((color) => (
                            <div
                                key={color}
                                className={`border-2 p-[2px] rounded flex items-center justify-center ${groutColor === color ? colorBorderMap[color] : "border-transparent"
                                    }`}
                            >
                                <button
                                    className="w-8 h-8 rounded"
                                    style={{ backgroundColor: color }}
                                    onClick={() => setGroutColor(color as "orange" | "gray" | "black" | "blue")}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroutThicknessColor