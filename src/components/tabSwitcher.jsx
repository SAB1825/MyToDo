'use client'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import React from "react"


const TabSwitcher = ({ SignInTab, SignUpTab }) => {
    
    return (
        <Tabs className="max-w-[500px]" defaultValue="sign-in">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                    value='sign-in'
                    className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                    Sign In
                </TabsTrigger>
                <TabsTrigger 
                    value='sign-up'
                    className="data-[state=active]:bg-black data-[state=active]:text-white"
                >
                    Sign Up
                </TabsTrigger>
            </TabsList>
            <TabsContent value='sign-in'>
                {SignInTab}
            </TabsContent>
            <TabsContent value='sign-up'>
                {SignUpTab}
            </TabsContent>
        </Tabs>
    )
}

export default TabSwitcher;