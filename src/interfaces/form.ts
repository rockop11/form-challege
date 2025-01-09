export interface FormProps {
    firstName: string
    middleName?: string
    lastName: string
    address1: string
    address2?: string
    city: string
    state: string
    country: string
    zipCode: number
    birthdayDate: Date | null
    age: number
}