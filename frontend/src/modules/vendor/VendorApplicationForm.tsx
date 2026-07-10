import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { supabase } from '../../lib/supabase';
import axios from 'axios';

const vendorSchema = z.object({
  businessName: z.string().min(2, "Business name is too short"),
  category: z.enum(['food', 'pharmacy_otc', 'produce', 'beverages']),
  addressText: z.string().min(5, "Please provide a full address"),
});

type VendorFormValues = z.infer<typeof vendorSchema>;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const VendorApplicationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema),
  });

  const selectedCategory = watch('category');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [type]: e.target.files[0] });
    }
  };

  const onSubmit = async (data: VendorFormValues) => {
    setIsSubmitting(true);
    try {
      // 1. Upload documents to private bucket
      let docUrl = '';
      for (const [type, file] of Object.entries(files)) {
        if (file) {
          const path = `verification/${Date.now()}_${file.name}`;
          const { data: uploadData, error } = await supabase.storage.from('vendor-docs').upload(path, file);
          if (error) throw error;
          if (type === 'ghanaCard') docUrl = uploadData.path;
        }
      }

      // 2. Submit application to backend
      await axios.post(`${API_URL}/v1/vendors/apply`, {
        business_name: data.businessName,
        category: data.category,
        address_text: data.addressText,
        verification_doc_url: docUrl
      });

      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert('Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 max-w-2xl mx-auto my-12 text-center space-y-4">
        <h2 className="text-3xl font-display font-bold text-deepPalm">Application Received!</h2>
        <p className="text-charcoalInk/60">Our team will review your application and documents. You'll receive an SMS update once approved.</p>
        <Button onClick={() => window.location.href = '/'}>Back to Home</Button>
      </div>
    );
  }

  return (
    <Card className="p-8 max-w-2xl mx-auto my-12">
      <h2 className="text-3xl font-display font-bold text-deepPalm mb-6">Become a Ferako Vendor</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-charcoalInk">Business Name</label>
          <Input {...register('businessName')} error={errors.businessName?.message} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-charcoalInk">Category</label>
          <select
            {...register('category')}
            className="w-full h-12 rounded-warm border-2 border-harmattanSand bg-white px-3 focus:ring-2 focus:ring-marketClay outline-none"
          >
            <option value="food">Food</option>
            <option value="pharmacy_otc">Pharmacy (OTC Only)</option>
            <option value="produce">Fruits & Vegetables</option>
            <option value="beverages">Beverages</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-charcoalInk">Business Address</label>
          <Input {...register('addressText')} error={errors.addressText?.message} />
          <p className="text-xs text-charcoalInk/60">We'll use this to help buyers find you.</p>
        </div>

        <div className="space-y-4 border-t-2 border-harmattanSand pt-6">
          <h3 className="font-semibold text-deepPalm">Verification Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium uppercase tracking-wider text-charcoalInk/60">Ghana Card / Business Reg</label>
              <input type="file" onChange={(e) => handleFileChange(e, 'ghanaCard')} className="text-sm" />
            </div>
            {selectedCategory === 'pharmacy_otc' && (
              <div className="space-y-1">
                <label className="text-xs font-medium uppercase tracking-wider text-charcoalInk/60">Pharmacy License</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'pharmacyLicense')} className="text-sm" />
                <p className="text-[10px] text-ripePepper">Mandatory for pharmacy vendors. OTC sales only.</p>
              </div>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Submit Application
        </Button>
      </form>
    </Card>
  );
};
