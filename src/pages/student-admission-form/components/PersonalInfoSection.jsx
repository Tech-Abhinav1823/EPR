import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoSection = ({ formData, errors, onChange, onBlur }) => {
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];

  const categoryOptions = [
    { value: 'general', label: 'General' },
    { value: 'obc', label: 'OBC' },
    { value: 'sc', label: 'SC' },
    { value: 'st', label: 'ST' },
    { value: 'ews', label: 'EWS' }
  ];

  const stateOptions = [
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'arunachal-pradesh', label: 'Arunachal Pradesh' },
    { value: 'assam', label: 'Assam' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'chhattisgarh', label: 'Chhattisgarh' },
    { value: 'goa', label: 'Goa' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'himachal-pradesh', label: 'Himachal Pradesh' },
    { value: 'jharkhand', label: 'Jharkhand' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'manipur', label: 'Manipur' },
    { value: 'meghalaya', label: 'Meghalaya' },
    { value: 'mizoram', label: 'Mizoram' },
    { value: 'nagaland', label: 'Nagaland' },
    { value: 'odisha', label: 'Odisha' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'sikkim', label: 'Sikkim' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'tripura', label: 'Tripura' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'uttarakhand', label: 'Uttarakhand' },
    { value: 'west-bengal', label: 'West Bengal' }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
        <p className="text-sm text-muted-foreground mt-1">Please provide your basic personal details</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          value={formData?.firstName || ''}
          onChange={onChange}
          onBlur={onBlur}
          error={errors?.firstName}
          required
        />

        <Input
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          value={formData?.lastName || ''}
          onChange={onChange}
          onBlur={onBlur}
          error={errors?.lastName}
          required
        />

        <Input
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={formData?.dateOfBirth || ''}
          onChange={onChange}
          onBlur={onBlur}
          error={errors?.dateOfBirth}
          required
        />

        <Select
          label="Gender"
          name="gender"
          options={genderOptions}
          value={formData?.gender || ''}
          onChange={(value) => onChange({ target: { name: 'gender', value } })}
          placeholder="Select gender"
          error={errors?.gender}
          required
        />

        <Input
          label="Father's Name"
          type="text"
          name="fatherName"
          placeholder="Enter father's name"
          value={formData?.fatherName || ''}
          onChange={onChange}
          onBlur={onBlur}
          error={errors?.fatherName}
          required
        />

        <Input
          label="Mother's Name"
          type="text"
          name="motherName"
          placeholder="Enter mother's name"
          value={formData?.motherName || ''}
          onChange={onChange}
          onBlur={onBlur}
          error={errors?.motherName}
          required
        />

        <Select
          label="Blood Group"
          name="bloodGroup"
          options={bloodGroupOptions}
          value={formData?.bloodGroup || ''}
          onChange={(value) => onChange({ target: { name: 'bloodGroup', value } })}
          placeholder="Select blood group"
          error={errors?.bloodGroup}
        />

        <Select
          label="Category"
          name="category"
          options={categoryOptions}
          value={formData?.category || ''}
          onChange={(value) => onChange({ target: { name: 'category', value } })}
          placeholder="Select category"
          error={errors?.category}
          required
        />
      </div>
      <div className="space-y-6">
        <h4 className="text-md font-medium text-foreground">Contact Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Mobile Number"
            type="tel"
            name="mobile"
            placeholder="Enter 10-digit mobile number"
            value={formData?.mobile || ''}
            onChange={onChange}
            onBlur={onBlur}
            error={errors?.mobile}
            required
            pattern="[0-9]{10}"
            maxLength={10}
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData?.email || ''}
            onChange={onChange}
            onBlur={onBlur}
            error={errors?.email}
            required
          />

          <Input
            label="Alternate Mobile (Optional)"
            type="tel"
            name="alternateMobile"
            placeholder="Enter alternate mobile number"
            value={formData?.alternateMobile || ''}
            onChange={onChange}
            onBlur={onBlur}
            error={errors?.alternateMobile}
            pattern="[0-9]{10}"
            maxLength={10}
          />

          <Input
            label="Guardian's Mobile"
            type="tel"
            name="guardianMobile"
            placeholder="Enter guardian's mobile number"
            value={formData?.guardianMobile || ''}
            onChange={onChange}
            onBlur={onBlur}
            error={errors?.guardianMobile}
            required
            pattern="[0-9]{10}"
            maxLength={10}
          />
        </div>
      </div>
      <div className="space-y-6">
        <h4 className="text-md font-medium text-foreground">Address Details</h4>
        
        <div className="space-y-4">
          <Input
            label="Address Line 1"
            type="text"
            name="addressLine1"
            placeholder="House/Flat number, Street name"
            value={formData?.addressLine1 || ''}
            onChange={onChange}
            onBlur={onBlur}
            error={errors?.addressLine1}
            required
          />

          <Input
            label="Address Line 2 (Optional)"
            type="text"
            name="addressLine2"
            placeholder="Area, Landmark"
            value={formData?.addressLine2 || ''}
            onChange={onChange}
            onBlur={onBlur}
            error={errors?.addressLine2}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="City"
              type="text"
              name="city"
              placeholder="Enter city"
              value={formData?.city || ''}
              onChange={onChange}
              onBlur={onBlur}
              error={errors?.city}
              required
            />

            <Select
              label="State"
              name="state"
              options={stateOptions}
              value={formData?.state || ''}
              onChange={(value) => onChange({ target: { name: 'state', value } })}
              placeholder="Select state"
              error={errors?.state}
              required
              searchable
            />

            <Input
              label="PIN Code"
              type="text"
              name="pinCode"
              placeholder="Enter 6-digit PIN code"
              value={formData?.pinCode || ''}
              onChange={onChange}
              onBlur={onBlur}
              error={errors?.pinCode}
              required
              pattern="[0-9]{6}"
              maxLength={6}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;