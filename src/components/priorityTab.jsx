'use client'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import React from "react"

const PriorityTab = ({ onPriorityChange }) => {
    return (
        <Tabs defaultValue="all" className="w-full max-w-3xl mx-auto p-4" onValueChange={onPriorityChange}>
            <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-0 rounded-[500px]">
                <TabsTrigger 
                    value='all'
                    className="rounded-[500px] py-2 text-sm font-medium transition-all hover:bg-white/10 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-lg"
                >
                    All
                </TabsTrigger>
                <TabsTrigger 
                    value='low'
                    className="rounded-[500px] py-2 text-sm font-medium transition-all hover:bg-white/10 data-[state=active]:bg-green-400 data-[state=active]:text-green-900 data-[state=active]:shadow-lg"
                >
                    Low
                </TabsTrigger>
                <TabsTrigger 
                    value='medium'
                    className="rounded-[500px] py-2 text-sm font-medium transition-all hover:bg-white/10 data-[state=active]:bg-yellow-400 data-[state=active]:text-yellow-900 data-[state=active]:shadow-lg"
                >
                    Medium
                </TabsTrigger>
                <TabsTrigger 
                    value='high'
                    className="rounded-[500px] py-2 text-sm font-medium transition-all hover:bg-white/10 data-[state=active]:bg-red-400 data-[state=active]:text-red-900 data-[state=active]:shadow-lg"
                >
                    High
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default PriorityTab;