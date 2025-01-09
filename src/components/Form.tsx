import type { FormProps } from "../interfaces";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { grey } from '@mui/material/colors';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useGetCountriesQuery } from '../services/countries';

export const Form = () => {
    // Hooks & Consts
    const { data, error, isLoading } = useGetCountriesQuery();
    const { register, control, handleSubmit, formState: { errors } } = useForm<FormProps>();

    const sortedCountries = data ? [...data].sort((a, b) => a.name.common.localeCompare(b.name.common)) : [];

    //Handlers
    const onSubmit: SubmitHandler<FormProps> = data => {
        const formattedDate = dayjs(data.birthdayDate).format('MM-DD-YYYY')

        const formDataToSend = {
            ...data,
            birthdayDate: formattedDate
        };
        
        console.log('Form Data', formDataToSend)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    gap: 2,
                    padding: 4,
                    width: '450px',
                    margin: "20px auto",
                    border: `1px solid ${grey[300]}`,
                    borderRadius: 2,
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                }}
            >

                <TextField
                    label="First Name"
                    variant="outlined"
                    sx={{ width: '200px' }}
                    {...register("firstName", { required: "First Name is required" })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />

                <TextField
                    label="Middle Name"
                    variant="outlined"
                    sx={{ width: '200px' }}
                    {...register("middleName")}
                />

                <TextField
                    label="Last Name"
                    variant="outlined"
                    sx={{ width: '200px' }}
                    {...register("lastName", { required: "Last name is required" })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                />

                <TextField
                    label="Address 1"
                    variant="outlined"
                    sx={{ width: '200px' }}
                    {...register("address1", { required: "Address 1 is required" })}
                    error={!!errors.address1}
                    helperText={errors.address1?.message}
                />

                <TextField
                    label="Address 2"
                    variant="outlined"
                    sx={{ width: '200px' }}
                    {...register("address2")}
                />

                <TextField
                    label="City"
                    variant="outlined"
                    sx={{ width: '200px' }}
                    {...register("city", { required: "City is required" })}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                />

                <TextField
                    label="State"
                    variant="outlined"
                    sx={{ width: '200px' }}
                    {...register("state", { required: "State is required" })}
                    error={!!errors.state}
                    helperText={errors.state?.message}
                />

                <FormControl>
                    <InputLabel id="country-label">Country</InputLabel>
                    <Controller
                        name="country"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Country is required" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="country-label"
                                sx={{ width: '200px' }}
                                error={!!errors.country}
                            >
                                {isLoading ? (
                                    <MenuItem disabled>
                                        <em>Loading...</em>
                                    </MenuItem>
                                ) : error ? (
                                    <MenuItem disabled>
                                        <em>Error</em>
                                    </MenuItem>
                                ) : (
                                    sortedCountries?.map((country) => (
                                        <MenuItem key={country.name.common} value={country.name.common}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <img
                                                    src={country.flags.png}
                                                    alt={`${country.name.common} flag`}
                                                    width="30"
                                                    height="20"
                                                    style={{ marginRight: 10 }}
                                                />
                                                {country.name.common}
                                            </Box>
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        )}
                    />
                    {errors.country && (
                        <Typography sx={{ fontSize: '0.75rem', color: "error.main", margin: "3px 14px 0px" }}>{errors.country.message}</Typography>
                    )}
                </FormControl>

                <TextField
                    label="Zip Code"
                    variant="outlined"
                    sx={{ width: '200px' }}
                    {...register("city", { required: "City is required", minLength: { value: 4, message: 'Zip Code must be at least 4 characters long' } })}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                />

                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                            name="birthdayDate"
                            control={control}
                            defaultValue={null}
                            rules={{
                                required: "Date is required",
                                validate: {
                                    pastDate: (value) => {
                                        if (dayjs(value).isAfter(dayjs())) {
                                            return "Date must be in the past";
                                        }
                                        return true;
                                    },
                                },
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <DatePicker
                                    {...field}
                                    label="Pick a Date"
                                    slotProps={{
                                        textField: {
                                            error: !!error,
                                            helperText: error?.message,
                                            sx: {
                                                width: '200px',
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: error ? 'red' : 'inherit',
                                                    },
                                                },
                                            },
                                        }
                                    }}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Box>


                <TextField
                    label="Age"
                    variant="outlined"
                    sx={{ width: '200px' }}
                    {...register("age", { required: "Age is required", })}
                    error={!!errors.age}
                    helperText={errors.age?.message}

                />

                <Button variant='contained' type='submit' sx={{ width: '80%', alignSelf: 'center' }}>
                    Send
                </Button>
            </Box>

        </form>
    )
}
