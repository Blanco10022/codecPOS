'use client';

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/Shared/ui/button";
import { Input } from "@/components/Shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Shared/ui/select";
import { PlusCircle } from "lucide-react";
// import { useToast } from "@/components/Shared/ui/use-toast";
import { useRouter } from 'next/navigation';

interface Location {
  id?: string;
  country: string;
  state: string;
  city: string;
  address: string;
}

interface Shop {
  id?: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  contact_info: {
    phone: string;
    email: string;
  };
  operating_hours: {
    [key: string]: string;
  };
  location: Location;
}

interface ShopFormProps {
  shop?: Shop;
  onSave: (shop: Shop) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function ShopForm({ shop, onSave, onCancel, isEditing = false }: ShopFormProps) {
  const [formData, setFormData] = useState<Shop>(shop || {
    name: "",
    description: "",
    status: "active",
    contact_info: {
      phone: "",
      email: "",
    },
    operating_hours: {},
    location: {
      country: "",
      state: "",
      city: "",
      address: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      contact_info: {
        ...prev.contact_info,
        [name]: value,
      },
    }));
  };

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/shops', {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save shop');
      }

      const savedShop = await response.json();
      onSave(savedShop);
      toast({
        title: `Shop ${isEditing ? 'updated' : 'created'} successfully`,
        description: `${savedShop.name} has been ${isEditing ? 'updated' : 'added'} to your shops.`,
      });
      router.push('/shops');
    } catch (error) {
      console.error('Error saving shop:', error);
      toast({
        title: 'Error',
        description: 'Failed to save shop. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        placeholder="Shop Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Shop Description"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <Select
        name="status"
        value={formData.status}
        onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as 'active' | 'inactive' }))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
      <Input
        name="phone"
        placeholder="Contact Phone"
        value={formData.contact_info.phone}
        onChange={handleContactInfoChange}
        required
      />
      <Input
        name="email"
        placeholder="Contact Email"
        value={formData.contact_info.email}
        onChange={handleContactInfoChange}
        required
        type="email"
      />
      <Input
        name="address"
        placeholder="Address"
        value={formData.location.address}
        onChange={handleLocationChange}
        required
      />
      <Input
        name="city"
        placeholder="City"
        value={formData.location.city}
        onChange={handleLocationChange}
        required
      />
      <Input
        name="state"
        placeholder="State"
        value={formData.location.state}
        onChange={handleLocationChange}
        required
      />
      <Select
        name="country"
        value={formData.location.country}
        onValueChange={(value) => handleLocationChange({ target: { name: 'country', value } } as any)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cameroon">Cameroon</SelectItem>
          <SelectItem value="nigeria">Nigeria</SelectItem>
          <SelectItem value="ghana">Ghana</SelectItem>
          {/* Add more countries as needed */}
        </SelectContent>
      </Select>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : (isEditing ? 'Update' : 'Save')}
        </Button>
      </div>
    </form>
  );
}
