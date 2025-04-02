"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Sample movie star data
const sampleMovieStars = [
  "Tom Hanks",
  "Meryl Streep",
  "Leonardo DiCaprio",
  "Jennifer Lawrence",
  "Denzel Washington",
  "Scarlett Johansson",
  "Brad Pitt",
  "Robert Downey Jr.",
  "Cate Blanchett",
  "Will Smith",
  "Emma Stone",
  "Nicole Kidman",
  "Ryan Gosling",
  "Joaquin Phoenix",
  "Tom Cruise",
];

export default function Home() {
  const [items, setItems] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  const loadSampleData = () => {
    setItems(sampleMovieStars.join("\n"));
    setSelectedItem(null);
  };
  
  const resetAll = () => {
    setItems("");
    setSelectedItem(null);
  };

  const handleRandomPick = () => {
    // Split the items by new line and filter out empty lines
    const itemList = items
      .split("\n")
      .map(item => item.trim())
      .filter(item => item.length > 0);

    if (itemList.length === 0) {
      setSelectedItem("Please enter some items first!");
      return;
    }

    // Start animation
    setIsAnimating(true);
    
    // Simulate animation by cycling through items quickly
    let counter = 0;
    const totalCycles = 20;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * itemList.length);
      setSelectedItem(itemList[randomIndex]);
      counter++;
      
      if (counter >= totalCycles) {
        clearInterval(interval);
        setIsAnimating(false);
        // Final selection
        const finalIndex = Math.floor(Math.random() * itemList.length);
        setSelectedItem(itemList[finalIndex]);
      }
    }, 100);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-background to-muted/50">
      <div className="w-full max-w-2xl">

        <Card className="w-full shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-center gap-3 mb-2">
              <Image 
                src="/randompick-logo.svg" 
                alt="Random Picker Logo" 
                width={40} 
                height={40} 
                className="dark:filter dark:invert-[0.8]"
              />
              <CardTitle className="text-2xl md:text-3xl">Random Picker</CardTitle>
            </div>
            <CardDescription className="text-center">Enter items (one per line) and click the button to randomly pick one</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter items here, one per line"
              className="min-h-[200px] font-mono"
              value={items}
              onChange={(e) => setItems(e.target.value)}
            />
            
            {selectedItem && (
              <Card className={`mt-4 overflow-hidden ${isAnimating ? 'animate-pulse' : ''}`}>
                <CardContent className="p-4">
                  <h3 className="text-center text-lg font-semibold mb-2">Selected Item:</h3>
                  <div className="bg-muted p-4 rounded-md text-center font-medium text-xl break-words shadow-inner">
                    {selectedItem}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col gap-3">
            <Button 
              onClick={handleRandomPick} 
              className="w-full transition-all" 
              size="lg"
              disabled={isAnimating}
            >
              {isAnimating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Picking...
                </span>
              ) : "Pick Random Item"}
            </Button>
            
            <div className="flex gap-3 w-full">
              <Button 
                onClick={loadSampleData} 
                className="flex-1" 
                variant="outline"
                disabled={isAnimating}
              >
                Load Samples
              </Button>
              
              <Button 
                onClick={resetAll} 
                className="flex-1" 
                variant="outline"
                disabled={isAnimating}
              >
                Reset All
              </Button>
            </div>
            

          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-6 mb-2 flex items-center gap-1">
        <a 
          href="https://github.com/harrywang/randompicker" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center p-1 rounded-full hover:bg-muted transition-colors"
          aria-label="View source on GitHub"
        >
          <Image src="/github.svg" alt="GitHub" width={24} height={24} className="dark:invert" />
        </a>
        <div className="text-sm text-muted-foreground">
          Made by <a 
            href="https://harrywang.me/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors underline underline-offset-2"
          >
            Harry Wang
          </a>
        </div>
      </div>
    </div>
  );
}
