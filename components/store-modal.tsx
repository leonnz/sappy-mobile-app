"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Lock } from "lucide-react"

interface StoreItem {
  id: string
  name: string
  cost: number
  icon: string
  bgColor: string
  unlocked: boolean
  description: string
}

interface StoreModalProps {
  isOpen: boolean
  onClose: () => void
  totalPoints: number
  onPurchase: (items: StoreItem[], totalCost: number) => void
}

export function StoreModal({ isOpen, onClose, totalPoints, onPurchase }: StoreModalProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  const storeItems: StoreItem[] = [
    {
      id: "water",
      name: "Water",
      cost: 5,
      icon: "💧",
      bgColor: "bg-[#A8D8EA]",
      unlocked: true,
      description: "Give Sappy some water",
    },
    {
      id: "sunlight",
      name: "Sunlight",
      cost: 10,
      icon: "☀️",
      bgColor: "bg-[#F9E79F]",
      unlocked: true,
      description: "Brighten Sappy's day",
    },
    {
      id: "fertilizer",
      name: "Fertilizer",
      cost: 15,
      icon: "🌱",
      bgColor: "bg-[#A9DFBF]",
      unlocked: false,
      description: "Help Sappy grow faster",
    },
    {
      id: "pot-upgrade",
      name: "Pot Upgrade",
      cost: 20,
      icon: "🪴",
      bgColor: "bg-[#D7BDE2]",
      unlocked: false,
      description: "A bigger home for Sappy",
    },
    {
      id: "decoration",
      name: "Decoration",
      cost: 25,
      icon: "✨",
      bgColor: "bg-[#FAD7A0]",
      unlocked: false,
      description: "Make Sappy's space pretty",
    },
    {
      id: "music",
      name: "Music",
      cost: 30,
      icon: "🎵",
      bgColor: "bg-[#AED6F1]",
      unlocked: false,
      description: "Play soothing tunes",
    },
    {
      id: "companion",
      name: "Companion",
      cost: 40,
      icon: "🦋",
      bgColor: "bg-[#F8B4D9]",
      unlocked: false,
      description: "A friend for Sappy",
    },
    {
      id: "rainbow",
      name: "Rainbow",
      cost: 50,
      icon: "🌈",
      bgColor: "bg-[#E8DAEF]",
      unlocked: false,
      description: "Magical rainbow boost",
    },
    {
      id: "vitamins",
      name: "Vitamins",
      cost: 35,
      icon: "💊",
      bgColor: "bg-[#FADBD8]",
      unlocked: false,
      description: "Extra nutrients for Sappy",
    },
    {
      id: "shield",
      name: "Shield",
      cost: 45,
      icon: "🛡️",
      bgColor: "bg-[#D5F4E6]",
      unlocked: false,
      description: "Protect Sappy from harm",
    },
    {
      id: "boost",
      name: "Growth Boost",
      cost: 60,
      icon: "⚡",
      bgColor: "bg-[#FCF3CF]",
      unlocked: false,
      description: "Rapid growth formula",
    },
    {
      id: "crown",
      name: "Crown",
      cost: 100,
      icon: "👑",
      bgColor: "bg-[#F9E79F]",
      unlocked: false,
      description: "Make Sappy royalty",
    },
  ]

  const toggleItemSelection = (itemId: string, item: StoreItem) => {
    if (!item.unlocked) return

    const newSelection = new Set(selectedItems)
    if (newSelection.has(itemId)) {
      newSelection.delete(itemId)
    } else {
      newSelection.add(itemId)
    }
    setSelectedItems(newSelection)
  }

  const getTotalCost = () => {
    return Array.from(selectedItems).reduce((total, itemId) => {
      const item = storeItems.find((i) => i.id === itemId)
      return total + (item?.cost || 0)
    }, 0)
  }

  const handlePurchase = () => {
    const totalCost = getTotalCost()
    if (totalCost > totalPoints) return

    const purchasedItems = storeItems.filter((item) => selectedItems.has(item.id))
    onPurchase(purchasedItems, totalCost)
    setSelectedItems(new Set())
  }

  const totalCost = getTotalCost()
  const canAfford = totalCost <= totalPoints && selectedItems.size > 0

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#C5E3F6] to-[#A8D8EA] p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/50 transition-colors hover:bg-white/70"
        >
          <X className="h-5 w-5 text-[#2C3E50]" />
        </button>

        {/* Store Grid */}
        <div className="mb-6 mt-8 grid grid-cols-3 gap-4">
          {storeItems.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleItemSelection(item.id, item)}
              disabled={!item.unlocked}
              className={`relative flex aspect-square flex-col items-center justify-center rounded-2xl transition-all ${
                item.unlocked
                  ? `${item.bgColor} hover:scale-105 ${selectedItems.has(item.id) ? "ring-4 ring-[#3498DB]" : ""}`
                  : "bg-[#95A5A6]/50 cursor-not-allowed"
              }`}
            >
              {item.unlocked ? (
                <>
                  <div className="mb-1 text-3xl">{item.icon}</div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-[#2C3E50]">{item.cost}</span>
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#9B59B6]">
                      <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                      </svg>
                    </div>
                  </div>
                </>
              ) : (
                <Lock className="h-8 w-8 text-[#7F8C8D]" />
              )}
            </button>
          ))}
        </div>

        {/* Purchase Info */}
        {selectedItems.size > 0 && (
          <div className="mb-4 rounded-2xl bg-white/30 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#2C3E50]">Total cost:</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#2C3E50]">{totalCost}</span>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#9B59B6]">
                  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-[#2C3E50]">Your points:</span>
              <span className="text-lg font-bold text-[#2C3E50]">{totalPoints}</span>
            </div>
          </div>
        )}

        {/* Buy Button */}
        <Button
          onClick={handlePurchase}
          disabled={!canAfford}
          className="h-14 w-full rounded-2xl bg-[#3498DB] text-lg font-semibold text-white transition-colors hover:bg-[#2980B9] disabled:bg-[#95A5A6] disabled:cursor-not-allowed"
        >
          {selectedItems.size === 0 ? "Select items to buy" : canAfford ? "Buy now" : "Not enough points"}
        </Button>
      </div>
    </div>
  )
}
