// Component using the hook
'use client'

import { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { useDebounce } from '@/hooks/useDebounce';
import { API_BASE_URL } from '../../../../constants/api';
import { StylesConfig } from 'react-select';


interface Restaurant {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
    address: string;
}

interface RestaurantOption {
    value: string;
    label: string;
    restaurant: Restaurant;
}

const customStyles: StylesConfig<RestaurantOption, false> = {
    control: (baseStyles) => ({
        ...baseStyles,
        color: '#d1d5db',
        backgroundColor: '#404040',
        borderRadius: '0.375rem',
        border: '0.9px solid #57534e',
        minWidth: '250px',
    }),
    placeholder: (baseStyles) => ({
        ...baseStyles,
        color: '#d1d5db',
    }),
}

export default function RestaurantSearch() {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<RestaurantOption[]>([]);
    const debouncedInput = useDebounce(inputValue, 1500);

    useEffect(() => {
        if (debouncedInput.length < 6) {
            setOptions([]);
            return;
        }

        async function fetchRestaurants() {
            try {
            const response = await fetch(API_BASE_URL + `/api/businesses/search?q=${debouncedInput}`);
                const data = await response.json();
                setOptions(data.results);
            } catch (error) {
                console.error('Search error:', error);
                setOptions([]);
            }
        }

        fetchRestaurants();
    }, [debouncedInput]);

    return (
        <div className="w-full bg-neutral-800">
                {/* <AsyncSelect
                className="m-auto w-48 md:w-64 py-6"
                styles={customStyles}
                    inputValue={inputValue}
                    onInputChange={setInputValue}
                    options={options}
                    placeholder="Search restaurants..."
                /> */}
        </div>
    );
}