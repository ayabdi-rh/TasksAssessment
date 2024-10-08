import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignupMutation } from '../api/auth'

export const useSignUp = () => {
  const { mutate: signup, isPending } = useSignupMutation()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })
  const navigate = useNavigate()

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!formData.email) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
      isValid = false
    } else {
      newErrors.email = ''
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
      isValid = false
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#\-_])[A-Za-z\d@$!%*?&#\-_]{8,}$/
      if (!passwordRegex.test(formData.password)) {
        newErrors.password =
          'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&#-_)'
        isValid = false
      } else {
        newErrors.password = ''
      }
    }

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required'
      isValid = false
    } else {
      newErrors.firstName = ''
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required'
      isValid = false
    } else {
      newErrors.lastName = ''
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      signup(formData)
    }
  }

  const isFormValid = Object.values(formData).every(value => value.trim() !== '')

  return {
    handleChange,
    handleSubmit,
    isFormValid,
    navigate,
    errors,
    loading: isPending
  }
}
