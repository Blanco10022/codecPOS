"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/Shared/ui/button"
import { Input } from "@/components/Shared/ui/input"
import { Label } from "@/components/Shared/ui/label"
import { Textarea } from "@/components/Shared/ui/textarea"
import { Card, CardContent } from "@/components/Shared/ui/card"
import { Checkbox } from "@/components/Shared/ui/checkbox"
import { Progress } from "@/components/Shared/ui/progress"
import { Switch } from "@/components/Shared/ui/switch"
import { useRouter } from "next/navigation"
import { useAuthLayout } from "../Shared/Layout/AuthLayout"
import axios from 'axios'

const AccountSetup = () => {
  const router = useRouter()
  const { isAuthenticated, user, business, token } = useAuthLayout()
  const [step, setStep] = useState(1)
  const [isManager, setIsManager] = useState(false)
  const [formData, setFormData] = useState({
    managerName: "",
    phoneNumber: "",
    shopName: "",
    shopLocation: "",
    password: "",
    reEnterPassword: "",
    fullBusinessName: "",
    businessType: "",
    address: "",
    numberOfEmployees: "",
    taxIdNumber: "",
    shopLogo: null,
    taxationDocuments: null,
    nationalIdCard: null,
  })
  
  useEffect(() => {
    if (!isAuthenticated || !user || !token) {
      router.push('/login')
    } else if (business) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, user, business, token, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    }
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handlePrev = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (!user || !token) {
        throw new Error("User not authenticated")
      }

      const dataToSend = {
        user_id: user.id,
        managerName: formData.managerName,
        phoneNumber: formData.phoneNumber,
        shopName: formData.shopName,
        shopLocation: formData.shopLocation,
        password: formData.password,
        fullBusinessName: formData.fullBusinessName,
        businessType: formData.businessType,
        address: formData.address,
        numberOfEmployees: formData.numberOfEmployees,
        taxIdNumber: formData.taxIdNumber,
      }

      const response = await axios.post('https://elegant-crow-curiously.ngrok-free.app/api/v1/account-setup/', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
      })

      console.log('Account setup successful:', response.data)
      router.push('/dashboard')
    } catch (error) {
      console.error('Error setting up account:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="mb-8">
            <Progress value={(step / 3) * 100} className="w-full" />
            <div className="flex justify-between mt-2">
              <span className={step >= 1 ? "text-blue-500" : ""}>Shop & Manager Details</span>
              <span className={step >= 2 ? "text-blue-500" : ""}>Documents</span>
              <span className={step === 3 ? "text-blue-500" : ""}>Submit</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Shop Account Details</h2>
                <div className="flex items-center space-x-2 mb-4">
                  <Switch
                    id="isManager"
                    checked={isManager}
                    onCheckedChange={setIsManager}
                  />
                  <Label htmlFor="isManager">I'm the manager</Label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="managerName">Manager Name</Label>
                    <Input
                      id="managerName"
                      name="managerName"
                      value={formData.managerName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shopName">Shop Name</Label>
                    <Input
                      id="shopName"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shopLocation">Shop Location</Label>
                    <Input
                      id="shopLocation"
                      name="shopLocation"
                      value={formData.shopLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {!isManager && (
                    <>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="reEnterPassword">Re-Enter Password</Label>
                        <Input
                          id="reEnterPassword"
                          name="reEnterPassword"
                          type="password"
                          value={formData.reEnterPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Shop Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullBusinessName">Full Business Name</Label>
                    <Input
                      id="fullBusinessName"
                      name="fullBusinessName"
                      value={formData.fullBusinessName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessType">Business Type/Category</Label>
                    <Input
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="numberOfEmployees">Number of Employees</Label>
                    <Input
                      id="numberOfEmployees"
                      name="numberOfEmployees"
                      type="number"
                      value={formData.numberOfEmployees}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxIdNumber">Tax ID Number</Label>
                    <Input
                      id="taxIdNumber"
                      name="taxIdNumber"
                      value={formData.taxIdNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shopLogo">Shop's logo</Label>
                    <Input
                      id="shopLogo"
                      name="shopLogo"
                      type="file"
                      onChange={handleFileUpload}
                      accept="image/*"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxationDocuments">Taxation Documents</Label>
                    <Input
                      id="taxationDocuments"
                      name="taxationDocuments"
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.docx"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationalIdCard">National ID Card (Front and Back)</Label>
                    <Input
                      id="nationalIdCard"
                      name="nationalIdCard"
                      type="file"
                      onChange={handleFileUpload}
                      accept="image/*"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Verify Information & Submit</h2>
                <p>Please review your information before submitting:</p>
                <div className="space-y-2">
                  <p><strong>Manager Name:</strong> {formData.managerName}</p>
                  <p><strong>Shop Name:</strong> {formData.shopName}</p>
                  <p><strong>Business Type:</strong> {formData.businessType}</p>
                  <p><strong>Address:</strong> {formData.address}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I am sure I have attached the right files and all images are clearly lit.
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <Button type="button" onClick={handlePrev}>
                  Previous
                </Button>
              )}
              {step < 3 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountSetup
