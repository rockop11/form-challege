import { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs'
import { grey } from '@mui/material/colors';
import { useGetCountriesQuery } from '../services/countries';


export const Form = () => {
    // Hooks & Consts
    const { data, error, isLoading } = useGetCountriesQuery();
    const sortedCountries = data ? [...data].sort((a, b) => a.name.common.localeCompare(b.name.common)) : [];

    //Local States
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [country, setCountry] = useState<string>('');

    //Handlers
    const handleChange = (event: SelectChangeEvent) => {
        setCountry(event.target.value as string);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching countries</div>;

    return (
        <form>
            <Box sx={{
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
            }}>

                <TextField id="outlined-basic" label="First Name" variant="outlined" sx={{ width: '200px' }} />

                <TextField id="outlined-basic" label="Middle Name" variant="outlined" sx={{ width: '200px' }} />

                <TextField id="outlined-basic" label="Last Name" variant="outlined" sx={{ width: '200px' }} />

                <TextField id="outlined-basic" label="Address 1" variant="outlined" sx={{ width: '200px' }} />

                <TextField id="outlined-basic" label="Address 2" variant="outlined" sx={{ width: '200px' }} />

                <TextField id="outlined-basic" label="City" variant="outlined" sx={{ width: '200px' }} />

                <TextField id="outlined-basic" label="State" variant="outlined" sx={{ width: '200px' }} />

                <FormControl>
                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{ width: '200px' }}
                        value={country}
                        label="Country"
                        onChange={handleChange}
                    >
                        {sortedCountries?.map((country) => (
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
                        ))}

                    </Select>
                </FormControl>

                <TextField id="outlined-basic" label="Zip Code" variant="outlined" sx={{ width: '200px' }} />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{ width: '200px' }}
                        label="Pick a Date"
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                    />
                </LocalizationProvider>

                <TextField id="outlined-basic" label="Age" variant="outlined" sx={{ width: '200px' }} />

                <Button variant='contained' type='submit' sx={{ width: '80%', alignSelf: 'center' }}>
                    Send
                </Button>
            </Box>

        </form>
    )
}
