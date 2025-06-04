"use client"

import { useState } from "react"
import CarComparisonCalculator from "../components/CarComparisonTable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ProtectedRoute } from "../components/ProctectedRoute"

export default function CarComparisonPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-green-800">Car Comparison Calculator</h1>
        
        <Tabs defaultValue="comparison" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-auto md:grid-cols-[1fr_1fr]">
            <TabsTrigger value="comparison">Car Comparison</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="comparison">
            <CarComparisonCalculator />
          </TabsContent>
          <TabsContent value="details">
            <Card className="w-full">
              <div className="flex justify-between items-center p-4">
                <CardHeader>
                  <CardTitle>Car Details</CardTitle>
                  <CardDescription>View and edit car details.</CardDescription>
                </CardHeader>
                <Button variant="outline">Edit</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}