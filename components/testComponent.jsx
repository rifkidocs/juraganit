"use client";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";

export default function TestComponent() {
  const { toast } = useToast();
  return (
    <div>
      <Button
        onClick={() => {
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
        }}>
        Show Toast
      </Button>
    </div>
  );
}
