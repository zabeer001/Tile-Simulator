import React, { useState } from 'react'
import { Button } from '../ui/button'

function GroutThicknessColor() {

    const [groutColor, setGroutColor] = useState<"red" | "gray" | "black">("red")
    const [groutThickness, setGroutThickness] = useState<"none" | "thin" | "thick">("thin")
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
                        {["red", "gray", "black"].map((color) => (
                            <button
                                key={color}
                                className={`w-8 h-8 border-2 rounded  ${groutColor === color ? "border-black/20" : "border-transparent"
                                    }`}
                                style={{ backgroundColor: color }}
                                onClick={() => setGroutColor(color as "red" | "gray" | "black")}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroutThicknessColor