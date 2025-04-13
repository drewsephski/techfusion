// src/app/(checkout)/page.tsx
'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',  
    city: '',
    state: '',
    zip: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Add your checkout logic here
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error("Failed to complete checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            Shipping Information
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* ... rest of the form fields */}
            </div>
            <Button
              type="submit"
              className="w-full mt-6"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Complete Checkout'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}